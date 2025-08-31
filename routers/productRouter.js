import { Router } from 'express';
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from '../controllers/products.js';
import validate from '../middlewares/validate.js';
import { productSchema } from '../schemas/product.schema.js';

const productRouter = Router();

productRouter.route('/')
  .get(getProducts)
  .post(validate(productSchema), createProduct);

productRouter.route('/:id')
  .get(getProductById)
  .put(validate(productSchema), updateProduct)
  .delete(deleteProduct);

export default productRouter;
