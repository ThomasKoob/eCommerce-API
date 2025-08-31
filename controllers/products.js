import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const getProducts = async (req, res) => {
  const { categoryId } = req.query;
  const where = categoryId ? { categoryId } : {};
  const products = await Product.findAll({ where, include: Category });
  res.json(products);
};

export const createProduct = async (req, res) => {
  const { categoryId } = req.body;
  const category = await Category.findByPk(categoryId);
  if (!category) return res.status(404).json({ message: 'Category not found' });

  const product = await Product.create(req.body);
  res.json(product);
};

export const getProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.id, { include: Category });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (req.body.categoryId) {
    const category = await Category.findByPk(req.body.categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });
  }

  await product.update(req.body);
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  await product.destroy();
  res.json({ message: 'Product deleted successfully' });
};
