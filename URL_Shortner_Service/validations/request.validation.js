import { z } from "zod";

export const signupPostRequestBodySchema = z.object({
  firstname: z.string().trim().min(1, "First name is required").max(50),
  lastname: z.string().trim().max(50).optional(),
  email: z.string().trim().toLowerCase().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64)
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
}).strict();
