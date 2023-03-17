import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().min(10).max(45),
  password: z.string().max(120),
});

export { loginSchema };
