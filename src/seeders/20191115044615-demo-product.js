"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Yogurt Laive",
          price: 23.6,
          image:
            "https://res.cloudinary.com/dkfobbwsu/image/upload/v1573786912/Yogurt-Bio-Laive-Natural-Botella-946-ml-48256005.webp",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Yogurt GLORIA Batty mix",
          price: 2.8,
          image:
            "https://res.cloudinary.com/dkfobbwsu/image/upload/v1573928877/1479004003.webp",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Yogurt GLORIA Vital Vainilla",
          price: 9.8,
          image:
            "https://res.cloudinary.com/dkfobbwsu/image/upload/v1573928928/20085793.webp",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Queso Laive",
          price: 5.6,
          image:
            "https://res.cloudinary.com/dkfobbwsu/image/upload/v1573928660/20076352.webp",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Pan de Molde Integral BELL’S",
          price: 4.3,
          image:
            "https://res.cloudinary.com/dkfobbwsu/image/upload/v1573928762/20043780.webp",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Gaseosa INCA KOLA",
          price: 5.6,
          image:
            "https://res.cloudinary.com/dkfobbwsu/image/upload/v1573928660/20076352.webp",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Aceite Vegetal IDEAL",
          price: 5.9,
          image:
            "https://res.cloudinary.com/dkfobbwsu/image/upload/v1573928813/37221.webp",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  }
};
