import { z } from 'zod';

const orderSchema = z.object({
  userId: z.number().int().positive(),
  products: z.array(
    z.object({
      productId: z.number().int().positive(),
      quantity: z.number().int().positive()
    })
  )
});

export { orderSchema };
