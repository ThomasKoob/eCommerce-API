import { Router } from 'express';
import { getOrders, createOrder, getOrderById, updateOrder, deleteOrder } from '../controllers/orders.js';
import validate from '../middlewares/validate.js';
import { orderSchema } from '../schemas/order.schema.js';

const orderRouter = Router();

orderRouter.route('/')
  .get(getOrders)
  .post(validate(orderSchema), createOrder);

orderRouter.route('/:id')
  .get(getOrderById)
  .put(validate(orderSchema), updateOrder)
  .delete(deleteOrder);

export default orderRouter;
