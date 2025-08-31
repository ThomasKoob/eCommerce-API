import { z } from 'zod';

const userSchema = z.object({
  name: z
    .string('Name must be a string')
    .min(1, 'Name must be at least 1 character')  
    .max(50, 'Name must be at most 50 character'),
  email: z
    .string()
    .trim()
    .email('Must be a valid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 character')
});

export { userSchema };

