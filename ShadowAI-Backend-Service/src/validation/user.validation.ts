import zod from "zod";

const userProfileSchema = zod.object({
  userProfileName: zod
    .string()
    .min(3, {
      message: `The User Profile Name Must be At Least 3 Character Long`,
    })
    .max(100, {
      message: `The User Profile Name must be Maximum 100 Character`,
    })
    .optional(),

  primaryEmail: zod
    .string()
    .min(3, {
      message: `The Primary Email Must be At Least 3 Character Long`,
    })
    .max(100, {
      message: `The Primary Email must be Maximum 100 Character`,
    })
    .email({
      message: "The Email Format is invalid for the Primary Email",
    })
    .optional(),

  secondaryEmail: zod
    .string()
    .min(3, {
      message: `The Secondary Email Must be At Least 3 Character Long`,
    })
    .max(100, {
      message: `The Secondary Email must be Maximum 100 Character`,
    })
    .email({
      message: "The Email format is invalid for the secondary Email",
    })
    .optional(),

  phoneNumber: zod
    .string()
    .min(3, {
      message: `The Phone Number Must be At Least 3 Character Long`,
    })
    .max(100, {
      message: `The Phone Number must be Maximum 100 Character`,
    })
    .optional(),
});

export default userProfileSchema;
