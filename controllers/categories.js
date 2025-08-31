import Category from '../models/Category.js';
import Product from '../models/Product.js';

export const getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

export const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
};

export const getCategoryById = async (req, res) => {
  const category = await Category.findByPk(req.params.id, { include: Product });
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
};

export const updateCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  await category.update(req.body);
  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  await category.destroy();
  res.json({ message: 'Category deleted successfully' });
};
