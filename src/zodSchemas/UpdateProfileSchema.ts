import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, { message: 'Required' }),
  lastName: z.string().min(1, { message: 'Required' }),
  image: z.string().optional(),
  color: z.number().max(3).optional().default(0)
});
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
