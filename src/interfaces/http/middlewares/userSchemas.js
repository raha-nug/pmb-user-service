import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    nama: z.string({ required_error: "Nama tidak boleh kosong" }).min(3),
    email: z
      .string({ required_error: "Email tidak boleh kosong" })
      .email("Format email tidak valid"),
    password: z
      .string({ required_error: "Password tidak boleh kosong" })
      .min(8, "Password minimal 8 karakter"),
  }),
});
export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email tidak boleh kosong" })
      .email("Format email tidak valid"),
    password: z
      .string({ required_error: "Password tidak boleh kosong" })
      .min(8, "Password minimal 8 karakter"),
  }),
});