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
  }
};

module.exports = root;
