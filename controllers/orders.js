import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

export const getOrders = async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
};

export const createOrder = async (req, res) => {
  const { userId, products } = req.body;
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Preise aus DB holen
  const dbProducts = await Product.findAll({
    where: { id: products.map(p => p.productId) }
  });

  // Total berechnen
  const total = products.reduce((sum, item) => {
    const product = dbProducts.find(p => p.id === item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    return sum + product.price * item.quantity;
  }, 0);

  const order = await Order.create({
    userId,
    products, // JSON Array
    total
  });

  res.json(order);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

export const updateOrder = async (req, res) => {
  const { userId, products } = req.body;
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (userId) {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    order.userId = userId;
  }

  // Preise neu berechnen
  const dbProducts = await Product.findAll({
    where: { id: products.map(p => p.productId) }
  });

  const total = products.reduce((sum, item) => {
    const product = dbProducts.find(p => p.id === item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    return sum + product.price * item.quantity;
  }, 0);

  order.products = products;
  order.total = total;
  await order.save();

  res.json(order);
};

export const deleteOrder = async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  await order.destroy();
  res.json({ message: 'Order deleted successfully' });
};
