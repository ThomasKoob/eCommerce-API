import chalk from 'chalk';
import express from 'express';
import './db/associations.js';
import errorHandler from './middlewares/errorHandler.js';

import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import orderRouter from './routers/orderRouter.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/orders', orderRouter);

app.all('/{*splat}', () => {
  throw new Error('Page not found', { cause: 404 });
});

app.use(errorHandler);

app.listen(port, () => console.log(chalk.bgGreen(`Server is running on port ${port}`)));

//console.log("PG_URI:", process.env.PG_URI);