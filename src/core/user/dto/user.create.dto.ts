import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const userCreateDtoSchema = z.object({
  firstName: z.string().nonempty('First name is required.'),
  lastName: z.string().nonempty('Last name is required.'),
  email: z.string().email('Invalid email format.'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone number must be a valid 10-digit number.'),
});

export class UserCreateDto extends createZodDto(userCreateDtoSchema) {}
