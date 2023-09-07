'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(sequelize.models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });
      this.belongsTo(sequelize.models.Image, {
        foreignKey: 'image_id',
        as: 'image',
      });
      this.belongsTo(sequelize.models.User, {
        foreignKey: 'product_owner_id',
        as: 'product_owner',
      });
    }
  }
  Product.init(
    {
      category_id: DataTypes.INTEGER,
      sku: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      weight: DataTypes.INTEGER,
      width: DataTypes.INTEGER,
      length: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      image_id: DataTypes.INTEGER,
      price: DataTypes.BIGINT,
      product_owner_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
