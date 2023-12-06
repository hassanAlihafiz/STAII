import { z } from "zod"

export const passwordSchema = {
  password: z
    .string()
    .min(10, {
      message: "• Atleast 10 characters",
    })
    .refine(
      (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value),
      {
        message:
          "• 1 special characters         • 1 capital letter          • 1 Number",
      }
    ),
  confirmpassword: z.string().min(10, {
    message: "• Atleast 10 characters",
  }),
}
