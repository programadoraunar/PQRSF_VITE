import { z } from "zod";
export const userSchema = z.object({
  email: z.string().email({
    message: "Por favor ingrese un correo válido",
  }),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});
