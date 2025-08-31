import { z } from 'zod';

const categorySchema = z.object({
  name: z
  .string('Name must be a string')
  .min(1, 'Name must be at least 1 character')
  .max(50, 'Name must be at most 50 character'),
});

export { categorySchema };
