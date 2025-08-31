import { z } from 'zod';

const productSchema = z.object({
  name: z
    .string('Name must be a string')
    .min(1, 'Name must be at least 1 character'),
  description: z
    .string('Description must be a string')
    .min(1, 'Description must be at least 1 character'),
  price: z
    .number('Price must be a nummer')
    .positive(),
  categoryId: z
    .number()
    .int()
    .positive()
});

export { productSchema };
