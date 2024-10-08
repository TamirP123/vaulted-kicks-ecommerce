const { User, Sneaker, Order } = require("../models");
console.log("Sneaker model:", Sneaker); // Add this line
const { signToken, AuthenticationError } = require("../utils/auth");
// Having issues with my API key via .env This is a free provided key from Stripe, typically would NOT put a secret key explicity like below.
const stripe = require("stripe")(
  "sk_test_51Pss2CC5VCV0wby5a0zQ6Apnw4Iy8Mx8kfkDD0iPgZ9YK99zBVg47LDqLqjvbbaSKwYVCOXMzxg5gbfXyz73bGiI00N0awVH2o"
);

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate('favorites');
        console.log("User from database:", user);
        console.log("Number of favorites:", user.favorites.length);
        return user;
      }
      throw new AuthenticationError("Not authenticated");
    },
    recommendedSneakers: async () => {
      try {
        const sneakers = await Sneaker.find({ recommended: true }).limit(8);
        console.log("Fetched sneakers:", sneakers); // Add this line
        return sneakers;
      } catch (error) {
        console.error("Error fetching recommended sneakers:", error);
        throw new Error(
          "Error fetching recommended sneakers: " + error.message
        );
      }
    },
    autumnSneakers: async () => {
      try {
        const sneakers = await Sneaker.find({ autumn: true }).limit(8);
        console.log("Fetched autumn sneakers:", sneakers);
        return sneakers;
      } catch (error) {
        console.error("Error fetching autumn sneakers:", error);
        throw new Error("Error fetching autumn sneakers: " + error.message);
      }
    },
    popularSneakers: async () => {
      try {
        const sneakers = await Sneaker.aggregate([{ $sample: { size: 8 } }]);
        return sneakers;
      } catch (error) {
        console.error("Error fetching popular sneakers:", error);
        throw new Error("Error fetching popular sneakers: " + error.message);
      }
    },
    categories: async () => {
      try {
        const categories = await Category.find();
        return categories;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Error fetching categories: " + error.message);
      }
    },
    latestPicks: async () => {
      try {
        const sneakers = await Sneaker.find()
          .sort({ releaseDate: -1 })
          .limit(10);
        return sneakers;
      } catch (error) {
        console.error("Error fetching latest picks:", error);
        throw new Error("Error fetching latest picks: " + error.message);
      }
    },
    allSneakers: async () => {
      try {
        console.log("Attempting to fetch all sneakers");
        const sneakers = await Sneaker.find();
        console.log("Fetched sneakers:", sneakers);
        return sneakers;
      } catch (error) {
        console.error("Error fetching all sneakers:", error);
        throw new Error("Error fetching all sneakers: " + error.message);
      }
    },
    sneaker: async (_, { id }) => {
      try {
        const sneaker = await Sneaker.findById(id);
        return sneaker;
      } catch (error) {
        console.error("Error fetching single sneaker:", error);
        throw new Error("Error fetching single sneaker: " + error.message);
      }
    },
    orders: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("orders");
        return user.orders;
      }
      throw new AuthenticationError("Not logged in");
    },
    userOrders: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders",
          populate: {
            path: "items.sneaker",
            model: "Sneaker",
          },
        });

        // Ensure orderDate is a valid string
        const orders = user.orders.map((order) => ({
          ...order.toObject(),
          orderDate: order.orderDate.toISOString(),
        }));

        return orders;
      }
      throw new AuthenticationError("Not logged in");
    },
    sneakerCount: async () => {
      try {
        const count = await Sneaker.countDocuments();
        console.log("Sneaker count:", count);
        return count;
      } catch (error) {
        console.error("Error counting sneakers:", error);
        throw new Error("Error counting sneakers: " + error.message);
      }
    },
    totalSales: async () => {
      const orders = await Order.find();
      return orders.reduce((total, order) => total + order.total, 0);
    },
    allOrders: async (parent, args, context) => {
      if (context.user && context.user.isAdmin) {
        const orders = await Order.find().populate('items.sneaker').sort({ orderDate: -1 });
        const processingOrdersCount = await Order.countDocuments({ status: 'Processing' });
        return {
          orders,
          processingOrdersCount
        };
      }
      throw new AuthenticationError("Not authorized to view all orders");
    },
    getAnalytics: async (parent, args, context) => {
      if (context.user && context.user.isAdmin) {
        // This is where you'd implement the logic to fetch real analytics data
        // For now, we'll return mock data
        return {
          activeUsers: 120,
          pageViews: 1500,
          averageSessionDuration: 180.5,
          topProducts: await Sneaker.find().sort('-sales').limit(5)
        };
      }
      throw new AuthenticationError("Not authorized to view analytics");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },
    createPaymentIntent: async (_, { amount }) => {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
        });

        return {
          clientSecret: paymentIntent.client_secret,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addOrder: async (parent, { input }, context) => {
      if (context.user) {
        try {
          // Map the input items to replace sneakerId with the actual sneaker object
          const items = await Promise.all(
            input.items.map(async (item) => {
              const sneaker = await Sneaker.findById(item.sneakerId);
              if (!sneaker) {
                throw new Error(`Sneaker with id ${item.sneakerId} not found`);
              }
              return {
                ...item,
                sneaker: sneaker._id, // Use the sneaker's _id
              };
            })
          );

          const order = new Order({
            ...input,
            items,
            user: context.user._id,
          });

          const savedOrder = await order.save();

          // Populate the sneaker data in the saved order
          const populatedOrder = await Order.findById(savedOrder._id).populate(
            "items.sneaker"
          );

          await User.findByIdAndUpdate(
            context.user._id,
            { $push: { orders: savedOrder._id } },
            { new: true }
          );

          return populatedOrder;
        } catch (error) {
          console.error("Error adding order:", error);
          throw new Error(error.message);
        }
      }

      throw new AuthenticationError("Not logged in");
    },
    addToFavorites: async (parent, { sneakerId }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $addToSet: { favorites: sneakerId } },
            { new: true }
          ).populate("favorites");
          console.log("Updated user favorites:", updatedUser.favorites);
          return updatedUser;
        } catch (error) {
          console.error("Error adding to favorites:", error);
          throw new Error("Failed to add to favorites");
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeFromFavorites: async (parent, { sneakerId }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $pull: { favorites: sneakerId } },
            { new: true }
          ).populate("favorites");
          return updatedUser;
        } catch (error) {
          console.error("Error removing from favorites:", error);
          throw new Error("Failed to remove from favorites");
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateSneaker: async (_, { id, input }, context) => {
      if (context.user && context.user.isAdmin) {
        return await Sneaker.findByIdAndUpdate(id, input, { new: true });
      }
      throw new AuthenticationError("Not authorized");
    },
    createSneaker: async (_, { input }, context) => {
      if (context.user && context.user.isAdmin) {
        return await Sneaker.create(input);
      }
      throw new AuthenticationError("Not authorized");
    },
    deleteSneaker: async (parent, { id }, context) => {
      if (context.user && context.user.isAdmin) {
        const deletedSneaker = await Sneaker.findByIdAndDelete(id);
        return deletedSneaker;
      }
      throw new AuthenticationError("Not authorized to delete sneakers");
    },
  },
};

module.exports = resolvers;
