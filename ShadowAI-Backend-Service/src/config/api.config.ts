export const baseApiConfig = {
  base: "/api/v1",
};

export const healthApiConfig = {
  getHealth: "/health",
};

export const authRouteConfig = {
  signup: "/signup",
  login: "/login",
  logout: "/logout",
  updatePassword: "/updatepassword",
};

export const userRouteConfig = {
  getUserProfile: "/user/profile",
  editUserProfile: "/user/profile/edit",
  uploadImage: "/user/profile/upload",
  removeImage: "/user/profile/remove-image",
  deactivatedUser: "/user/profile/status",
};
