interface ISignup {
  username: String;
  email: String;
  password: String;
}

interface ILogin {
  username: String;
  password: string;
}
interface IUpdatePassword {
  currentpassword: String;
  newpassword: string;
}

interface IForgetPassword {
  email: string;
}

interface IResetPassword {
  newPassword: string;
}
export { ISignup, ILogin, IUpdatePassword, IResetPassword, IForgetPassword };
