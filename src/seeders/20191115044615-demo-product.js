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
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Product", null, {});
  }
};
