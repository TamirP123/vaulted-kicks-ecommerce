const { User, Sneaker } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
// Having issues with my API key via .env This is a free provided key from Stripe, typically would NOT put a secret key explicity like below.
const stripe = require('stripe')('sk_test_51Pss2CC5VCV0wby5a0zQ6Apnw4Iy8Mx8kfkDD0iPgZ9YK99zBVg47LDqLqjvbbaSKwYVCOXMzxg5gbfXyz73bGiI00N0awVH2o');



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
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Not authenticated');
    },
    recommendedSneakers: async () => {
      try {
        const sneakers = await Sneaker.find({ recommended: true }).limit(8);
        console.log('Fetched sneakers:', sneakers);  // Add this line
        return sneakers;
      } catch (error) {
        console.error('Error fetching recommended sneakers:', error);
        throw new Error('Error fetching recommended sneakers: ' + error.message);
      }
    },
    autumnSneakers: async () => {
      try {
        const sneakers = await Sneaker.find({ autumn: true }).limit(8);
        console.log('Fetched autumn sneakers:', sneakers);
        return sneakers;
      } catch (error) {
        console.error('Error fetching autumn sneakers:', error);
        throw new Error('Error fetching autumn sneakers: ' + error.message);
      }
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
        throw new AuthenticationError('Incorrect email');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    },
    createPaymentIntent: async (_, { amount }) => {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'usd',
        });

        return {
          clientSecret: paymentIntent.client_secret,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
