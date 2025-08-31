import sequelize from './index.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../models/Order.js';

// User - Order
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Category - Product
Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Order - Product (Many-to-Many)
/*
import { DataTypes } from 'sequelize';
const OrderProduct = sequelize.define('OrderProduct', {
  quantity: { type: DataTypes.INTEGER, allowNull: false }
});
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });
*/

//sequelize.sync();
//sequelize.sync( {force: true});
//sequelize.sync( {alter:true} );
