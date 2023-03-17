import { z } from "zod";

const UserSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(45),
  email: z.string().max(45).email(),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

const createUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const updateUserSchema = UserSchema.partial().omit({
  id: true,
  createdAt: true,
  deletedAt: true,
  admin: true,
});

const userSchema = UserSchema.omit({ password: true });

const allUsersSchema = UserSchema.omit({ password: true }).array();

export {
  UserSchema,
  createUserSchema,
  updateUserSchema,
  userSchema,
  allUsersSchema,
};
