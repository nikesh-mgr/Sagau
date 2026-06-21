import { z } from "zod";

/**
 * LOGIN VALIDATION
 */
export const loginSchema = z.object({
  email: z.string().email("Valid email required"),

  password: z.string().min(1, "Password is required"),
});

/**
 * REGISTER VALIDATION (matches backend)
 * fullName, email, password, role
 */
export const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),

  email: z.string().email("Valid email required"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  role: z.enum(["client", "worker", "admin"]),
});
