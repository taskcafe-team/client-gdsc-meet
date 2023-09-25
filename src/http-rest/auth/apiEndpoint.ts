export class apiEndpoint {

  public static readonly loginWithEmail = '/auth/email/login';
  public static readonly reAccessToken = '/auth/access-token';
  public static readonly register = '/auth/email/register';
  public static readonly confirmEmail = '/auth/email/confirm-email';
  public static readonly forgotPassword = '/auth/email/forgot-password';
  public static readonly resetPassword = '/auth/email/reset-password';
  public static readonly verifyGoogle = '/auth/google/verify';
  public static readonly resendVerification = 'auth/email/resend-verification'
}