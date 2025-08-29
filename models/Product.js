import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Product = sequelize.define('Product', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
    categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

export default Product;