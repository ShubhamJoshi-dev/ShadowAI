import zod from "zod"

const signupSchema = zod.object({
    username: zod
    .string()
    .min(3, {
      message: `The Username Must be At Least 3 Character Long`,
    })
    .max(100, {
      message: `The Username must be Maximum 100 Character`,
    }),

  email: zod.string().email({
    message: `Please Enter the Correct Format Email`,
  }),

  password: zod.string().min(8, {
    message: `The Username Must be At Least 8 Character Long`,
  }),

})
const loginSchema = zod.object({
  name: zod.string().optional(),

  password: zod.string().min(8, {
    message: `The Username Must be At Least 8 Character Long`,
  }),
});

export {
    signupSchema,loginSchema
}
