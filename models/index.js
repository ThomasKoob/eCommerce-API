import sequelize from '../db/index.js';
import User from './User.js';
import Product from './Product.js';
import Order from './Order.js';
import Category from './Category.js';


User.hasMany(Order, {
  foreignKey: {
    allowNull: false,
    name: 'userId',
  },
});
Order.belongsTo(User, { foreignKey: { allowNull: false, name: 'userId' }, onDelete: 'CASCADE' });

Category.hasMany(Product, { 
    foreignKey: {
    allowNull: false, 
    name: 'categoryId'
},
});

Product.belongsTo(Category, {
    foreignKey: {
        allowNull: false,
        name: categoryId,
        onDelete: 'RESTRICT',

    }
});

Order.hasMany(OrderItem, {
    foreignKey: {
        allowNull: false,
        name: orderId,
        otherKey: 'productId',
    },
});



sequelize.sync();

export { User, Order, Category, Product };
