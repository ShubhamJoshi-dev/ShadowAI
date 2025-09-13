import zod from "zod";

const userProfileSchema = zod.object({
  userProfileName: zod.string().optional(),

  primaryEmail: zod.string().optional(),

  secondaryEmail: zod.string().optional(),

  phoneNumber: zod.string().optional(),
});

export default userProfileSchema;
