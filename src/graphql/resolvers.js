const Sequelize = require("sequelize");
const Op = Sequelize.Op;

var root = {
  searchProducts: ({ name }, { db }) => {
    return db.Product.findAll({
      where: { name: { [Op.like]: name + "%" } }
    });
  },
  products: ({ name }, { db }) => {
    return db.Product.findAll();
  },
  insertOrder: (args, { db }) => {
    let newOrderNumber = "P0001";
    return db.Order.max("id").then(latestId => {
      if (latestId) {
        newOrderNumber = `P${(latestId + 1).toString().padStart(4, "0")}`;
      }
      return db.Order.create({ orderNumber: newOrderNumber });
    });
  }
};

module.exports = root;
