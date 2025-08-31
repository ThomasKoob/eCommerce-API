import User from '../models/User.js';
import Order from '../models/Order.js';

export const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(400).json({ message: 'User with that email already exists' });

  const user = await User.create({ name, email, password });
  res.json(user);
};

export const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: Order });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.update({ name, email, password });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  await user.destroy();
  res.json({ message: 'User deleted successfully' });
};
