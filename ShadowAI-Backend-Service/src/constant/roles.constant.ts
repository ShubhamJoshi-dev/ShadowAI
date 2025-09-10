export const USER = "USER";
export const ADMIN = "ADMIN";
export const GUEST = "GUEST";
export const SUPERADMIN = "SUPER ADMIN";
export const NOROLE = "NO ROLE";

export const ROLES = {
  user: USER,
  admin: ADMIN,
  guest: GUEST,
  superAdmin: SUPERADMIN,
  defaultRole: NOROLE,
} as Record<string, string>;

export const getUserRoleHashMap = (roleKey: string) => {
  return Object.prototype.hasOwnProperty.call(ROLES, roleKey)
    ? ROLES[roleKey]
    : ROLES?.defaultRole;
};
