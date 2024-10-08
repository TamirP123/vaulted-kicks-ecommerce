const db = require("../config/connection");
const { User, Sneaker } = require("../models");

db.once("open", async () => {
  await Sneaker.deleteMany();

  const sneakers = await Sneaker.insertMany([
    {
      brand: "Nike",
      model: "Air Max 90",
      name: "Air Max 90 OG Infrared",
      gender: "Unisex",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 120,
      description: "The iconic Air Max 90 in its original Infrared colorway.",
      imageUrl: "/assets/AirMax-90-OG-Infrared/airmaxInfrared.png",
      category: "Lifestyle",
      releaseDate: new Date("2020-12-01"),
      recommended: true,
      onSale: false,
    },
    {
      brand: "Nike",
      model: "Air Max 1",
      name: "Air Max 1 Anniversary Red",
      gender: "Men",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 140,
      description: "Celebrating the original colorway of the Air Max 1.",
      imageUrl:
        "/assets/Nike-Air-Max-1-Anniversary-Red/nikeAirMaxAnniversaryRed.png",
      category: "Lifestyle",
      releaseDate: new Date("2021-03-26"),
      recommended: false,
      onSale: true,
      salePrice: 119.99,
    },
    {
      brand: "Nike",
      model: "Dunk Low",
      name: "SB Dunk Low Marty McFly",
      gender: "Unisex",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 100,
      description: "A classic two-tone Dunk Low.",
      imageUrl:
        "/assets/Nike-SB-Dunk-Low-Marty-McFly/nikeSBDunkLowMartyMcFly.png",
      category: "Skateboarding",
      releaseDate: new Date("2021-01-14"),
    },
    {
      brand: "Air Jordan",
      model: "Jordan 4 Retro",
      name: "Jordan 4 Retro Fire Red",
      gender: "Men",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 200,
      description:
        "The Jordan 4 Retro returns in its classic Fire Red colorway.",
      imageUrl: "/assets/Jordan-4-Retro-Fire-Red/jordanRetroFire.png",
      category: "Basketball",
      releaseDate: new Date("2020-11-28"),
      recommended: true,
      onSale: false,
    },
    {
      brand: "Air Jordan",
      model: "Jordan 4 Retro",
      name: "Jordan 4 Retro University Blue",
      gender: "Men",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 200,
      description: "Inspired by Michael Jordans alma mater, UNC.",
      imageUrl:
        "/assets/Jordan-4-Retro-University-Blue/jordanRetroUniversityBlue.png",
      category: "Basketball",
      releaseDate: new Date("2021-04-28"),
      recommended: true,
      onSale: false,
    },
    {
      brand: "Nike",
      model: "Air Force 1",
      name: "Air Force 1 Low White",
      gender: "Unisex",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 10 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 15 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 20 },
        { size: 8.5, quantity: 25 },
        { size: 9, quantity: 20 },
        { size: 9.5, quantity: 15 },
        { size: 10, quantity: 20 },
        { size: 10.5, quantity: 15 },
        { size: 11, quantity: 10 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 10 },
      ],
      price: 90,
      description: "The classic all-white Air Force 1 Low.",
      imageUrl: "/assets/Nike-Air-Force-1-Low-White/nikeAirForce1LowWhite.png",
      category: "Lifestyle",
      releaseDate: new Date("2020-01-01"),
    },
    {
      brand: "Air Jordan",
      model: "Jordan 1 Retro High",
      name: "Jordan 1 Retro High OG Chicago",
      gender: "Men",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 170,
      description: "The iconic Jordan 1 in the classic Chicago colorway.",
      imageUrl:
        "/assets/Jordan-1-Retro-High-OG-Chicago/jordan1RetroHighOGChicago.png",
      category: "Basketball",
      releaseDate: new Date("2022-11-19"),
    },
    {
      brand: "Nike",
      model: "Air Max 97",
      name: "Air Max 97 Silver Bullet",
      gender: "Unisex",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 180,
      description:
        "The futuristic Air Max 97 in its original Silver Bullet colorway.",
      imageUrl:
        "/assets/Nike-Air-Max-97-Silver-Bullet/nikeAirMax97SilverBullet.png",
      category: "Lifestyle",
      releaseDate: new Date("2022-12-14"),
    },
    {
      brand: "Air Jordan",
      model: "Jordan 11 Retro",
      name: "Jordan 11 Retro Concord",
      gender: "Men",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 220,
      description: "The beloved Jordan 11 in the classic Concord colorway.",
      imageUrl: "/assets/Jordan-11-Retro-Concord/jordan11RetroConcord.png",
      category: "Basketball",
      releaseDate: new Date("2018-12-08"),
    },
    {
      brand: "Nike",
      model: "React Element 87",
      name: "React Element 87 Light Bone",
      gender: "Unisex",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 160,
      description:
        "A modern classic featuring React foam and a translucent upper.",
      imageUrl: "/assets/React-Element-87-Sail/reactElementSail.png",
      category: "Lifestyle",
      releaseDate: new Date("2018-10-11"),
      recommended: true,
      onSale: true,
      salePrice: 129.99,
    },
    // Additional Nike Dunks
    {
      brand: "Nike",
      model: "Dunk Low",
      name: "Dunk Low Panda",
      gender: "Unisex",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 100,
      description: "The popular black and white colorway of the Nike Dunk Low.",
      imageUrl: "/assets/Dunk-Low-Panda/dunkLowPanda.png",
      category: "Lifestyle",
      releaseDate: new Date("2021-03-10"),
      recommended: true,
      onSale: false,
    },
    {
      brand: "Nike",
      model: "Dunk Low",
      name: "Dunk Low Syracuse",
      gender: "Unisex",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 100,
      description: "A vibrant orange and white colorway of the Nike Dunk Low.",
      imageUrl: "/assets/Nike-Dunk-Low-Syracuse/nikeDunkLowSyracuse.png",
      category: "Lifestyle",
      releaseDate: new Date("2020-03-14"),
      recommended: false,
      onSale: false,
    },

    {
      brand: "Air Jordan",
      model: "Jordan 4 Retro",
      name: "Jordan 4 Retro Off-White Sail",
      gender: "Women",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 1050,
      description:
        "A collaboration between Off-White and Air Jordan on the iconic Jordan 4.",
      imageUrl:
        "/assets/Jordan-4-Retro-Off-White-Sail/jordan4RetroOffWhiteSail.png",
      category: "Lifestyle",
      releaseDate: new Date("2020-07-25"),
      recommended: false,
      onSale: false,
    },
    {
      brand: "Air Jordan",
      model: "Jordan 4 Retro",
      name: "Jordan 4 Retro SE GS Wet Cement",
      gender: "Men",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 225,
      description:
        "A collaboration between Paris Saint-Germain and Air Jordan on the Jordan 4.",
      imageUrl: "/assets/Jordan-4-Retro-Wet-Cement/jordanWetCement.png",
      category: "Lifestyle",
      releaseDate: new Date("2020-10-10"),
      recommended: true,
      onSale: false,
    },

    // Yeezy Slides and Shoes
    {
      brand: "Adidas",
      model: "Yeezy Slide",
      name: "Yeezy Slide Pure",
      gender: "Unisex",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 60,
      description: "Comfortable Yeezy slides in a neutral Pure colorway.",
      imageUrl: "/assets/Yeezy-Slides-Pure/yeezySlidesPure.png",
      category: "Slides",
      releaseDate: new Date("2021-04-26"),
      recommended: true,
      onSale: false,
    },
    {
      brand: "Adidas",
      model: "Yeezy Boost 350 V2",
      name: "Yeezy Boost 350 V2 Zebra",
      gender: "Unisex",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 220,
      description: "The popular Zebra colorway of the Yeezy Boost 350 V2.",
      imageUrl: "/assets/Yeezy-Boost-350-Zebra/yeezyBoostZebra.png",
      category: "Lifestyle",
      releaseDate: new Date("2017-02-25"),
      recommended: true,
      onSale: false,
    },
    {
      brand: "Adidas",
      model: "Yeezy Foam Runner",
      name: "Yeezy Foam Runner Sand",
      gender: "Unisex",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 80,
      description: "The unique Yeezy Foam Runner in a neutral Sand colorway.",
      imageUrl: "/assets/Yeezy-Foam-Runner-Sand/yeezyFoamRunnerSand.png",
      category: "Lifestyle",
      releaseDate: new Date("2021-03-26"),
      recommended: true,
      onSale: false,
    },
    // Autumn Sneakers
    {
      brand: "Nike",
      model: "Air Force 1",
      name: "Air Force Supreme 1 Low Wheat",
      gender: "Unisex",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 190,
      description: "A classic Air Force 1 in a fall-ready wheat colorway.",
      imageUrl: "/assets/Nike-Air-Force-Wheats/nikeAirForceWheats.png",
      category: "Lifestyle",
      releaseDate: new Date("2022-09-01"),
      recommended: false,
      onSale: false,
      autumn: true,
    },
    {
      brand: "Air Jordan",
      model: "Jordan 1 Retro High",
      name: "Jordan 1 Retro High Shattered Backboard",
      gender: "Men",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
        { size: 11.5, quantity: 5 },
        { size: 12, quantity: 5 },
      ],
      price: 256,
      description: "A classic Air Force 1 in a fall-ready wheat colorway.",
      imageUrl: "/assets/Jordan-1-Retro-Shattered/jordanRetroShattered.png",
      category: "Lifestyle",
      releaseDate: new Date("2022-09-01"),
      recommended: false,
      onSale: false,
      autumn: true,
    },
    {
      brand: "New Balance",
      model: "New Balance 574",
      name: "New Balance Stone Island X 574 Legacy Steel Blue",
      gender: "Men",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 10 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
      ],
      price: 237,
      description: "A clean New Balance 574 in a fall-ready colorway.",
      imageUrl: "/assets/New-Balance-Stone-Island/newBalanceStoneIsland.png",
      category: "Lifestyle",
      releaseDate: new Date("2022-09-01"),
      recommended: false,
      onSale: true,
      salePrice: 199.99,
      autumn: true,
    },
    {
      brand: "Timberland",
      model: "Timberland 6-Inch",
      name: "Timberland 6-Inch Premium Waterproof Boot",
      gender: "Men",
      sizes: [
        { size: 5, quantity: 5 },
        { size: 5.5, quantity: 5 },
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 8 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 8.5, quantity: 5 },
        { size: 9, quantity: 10 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
      ],
      price: 100,
      description: "A premium waterproof boot for the fall season.",
      imageUrl: "/assets/Timberland-6-Inch/timberland6Inch.png",
      category: "Lifestyle",
      releaseDate: new Date("2021-03-26"),
      recommended: false,
      onSale: false,
      autumn: true,
    },
    {
      brand: "Air Jordan",
      model: "Jordan 3 Retro",
      name: "A Ma Maniére x Wmns Jordan 3 Retro",
      gender: "Women",
      sizes: [
        { size: 6, quantity: 5 },
        { size: 6.5, quantity: 5 },
        { size: 7, quantity: 8 },
        { size: 7.5, quantity: 5 },
        { size: 8, quantity: 10 },
        { size: 9, quantity: 8 },
        { size: 9.5, quantity: 5 },
        { size: 10, quantity: 10 },
        { size: 10.5, quantity: 5 },
        { size: 11, quantity: 5 },
      ],
      price: 118,
      description: "A collaboration between A Ma Maniére and Wmns Jordan 3.",
      imageUrl: "/assets/Jordan-3-Retro-A-Ma-Maniere/jordanRetroAMaManiere.png",
      category: "Lifestyle",
      releaseDate: new Date("2020-07-25"),
      recommended: false,
      onSale: false,
      autumn: true,
    },
    {
      brand: "Air Jordan",
      model: "Air Jordan 1",
      name: "Travis Scott x Wmns Jordan 1 Retro Low OG SP Olive",
      gender: "Women",
      sizes: [
        { size: 5, quantity: 10 },
        { size: 6, quantity: 10 },
        { size: 7, quantity: 15 },
        { size: 8, quantity: 10 },
        { size: 9, quantity: 15 },
        { size: 10, quantity: 10 },
        { size: 11, quantity: 15 },
      ],
      price: 448,
      description: "A collaboration between Travis Scott and Wmns Jordan 1.",
      imageUrl: "/assets/Jordan-1-Retro-OG-SP-Olive/jordan1RetroOGSPOlive.png",
      category: "Lifestyle",
      releaseDate: new Date("2020-12-01"),
      recommended: false,
      onSale: false,
      autumn: true,
    },
    {
      brand: "Adidas",
      model: "Yeezy Desert Boot",
      name: "Yeezy Wmns Season 7 Desert Boot Taupe",
      gender: "Women",
      sizes: [
        { size: 6, quantity: 10 },
        { size: 6.5, quantity: 10 },
        { size: 7, quantity: 15 },
        { size: 7.5, quantity: 10 },
        { size: 8, quantity: 20 },
        { size: 8.5, quantity: 10 },
        { size: 9, quantity: 15 },
        { size: 10, quantity: 10 },
      ],
      price: 231,
      description: "A fall-ready taupe colorway of the Yeezy Desert Boot.",
      imageUrl:
        "/assets/Yeezy-Wmns-Season-7-Desert-Boot/yeezyWmnsSeason7DesertBoot.png",
      category: "Lifestyle",
      releaseDate: new Date("2021-04-26"),
      recommended: false,
      onSale: true,
      salePrice: 199.99,
      autumn: true,
    },
    {
      brand: "Nike",
      model: "Nike Vomero 5",
      name: "Wmns Air Zoom Vomero 5",
      gender: "Women",
      sizes: [
        { size: 5, quantity: 10 },
        { size: 5.5, quantity: 10 },
        { size: 6, quantity: 10 },
        { size: 6.5, quantity: 10 },
        { size: 7, quantity: 15 },
        { size: 7.5, quantity: 10 },
        { size: 9, quantity: 20 },
        { size: 9.5, quantity: 10 },
        { size: 10, quantity: 15 },
        { size: 10.5, quantity: 10 },
        { size: 11, quantity: 15 },
      ],
      price: 107,
      description: "A fall-ready colorway of the Nike Vomero 5.",
      imageUrl: "/assets/Nike-Vomero-Air-Zoom-5/nikeVomeroAirZoom5.png",
      category: "Lifestyle",
      releaseDate: new Date("2022-09-01"),
      recommended: false,
      onSale: false,
      autumn: true,
    },
    {
      brand: "Air Jordan",
      model: "Air Jordan 4",
      name: "Jordan 4 Retro 'Black Cat'",
      gender: "Men",
      sizes: [
        { size: 7, quantity: 15 },
        { size: 7.5, quantity: 10 },
        { size: 8, quantity: 20 },
        { size: 8.5, quantity: 10 },
        { size: 9, quantity: 15 },
        { size: 9.5, quantity: 10 },
        { size: 10, quantity: 15 },
        { size: 10.5, quantity: 10 },
        { size: 11, quantity: 15 },
        { size: 11.5, quantity: 10 },
        { size: 12, quantity: 15 },
      ],
      price: 930,
      description: "A black cat colorway of the Air Jordan 4.",
      imageUrl: "/assets/Jordan-4-Retro-Black-Cat/jordan4RetroBlackCat.png",
      category: "Lifestyle",
      releaseDate: new Date("2022-09-01"),
      recommended: false,
      onSale: false,
      autumn: false,
    },
  ]);

  await User.create({
    username: "admintest",
    email: "admin@example.com",
    password: "adminpassword123",
    isAdmin: true
  });

  await User.create({
    username: "user",
    email: "user@gmail.com",
    password: "password",
    isAdmin: false
  });

  console.log("Admin user seeded");

  
  console.log("Sneakers seeded");

  process.exit();
});
