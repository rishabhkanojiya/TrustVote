import environment from '../../environment'

export const URLS = {
  registerUser: `${environment.API_URL}/auth/v1.0/user/register`,
  loginUser: `${environment.API_URL}/auth/v1.0/user/login`,
  logoutUser: `${environment.API_URL}/auth/v1.0/user/logout`,
  forgotPassword: `${environment.API_URL}/auth/v1.0/user/forgot-password`,
  resetPassword: `${environment.API_URL}/auth/v1.0/user/reset-password`,
  me: `${environment.API_URL}/auth/v1.0/user/me`,
}
