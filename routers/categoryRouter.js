import { Router } from 'express';
import { getCategories, createCategory, getCategoryById, updateCategory, deleteCategory } from '../controllers/categories.js';
import validate from '../middlewares/validate.js';
import { categorySchema } from '../schemas/category.schema.js';

const categoryRouter = Router();

categoryRouter.route('/')
  .get(getCategories)
  .post(validate(categorySchema), createCategory);

categoryRouter.route('/:id')
  .get(getCategoryById)
  .put(validate(categorySchema), updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
