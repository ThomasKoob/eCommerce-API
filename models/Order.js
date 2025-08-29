import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const products = {producId, quantity}

const Order = sequelize.define('Order', {
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  
  },
});

export default Product;