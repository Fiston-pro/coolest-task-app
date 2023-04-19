import * as z from 'zod';

export const userSchema = z.object({
  id: z.number(),
  uid: z.string(),
  email: z.string().email(),
});

export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  user_id: z.number(),
});
