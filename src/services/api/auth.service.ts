import { ApiClient } from "./client.service";

class AuthService extends ApiClient {
  constructor() {
    super("/auth");
  }

  signup(params: SignupCredentials) {
    return this.post<SignupResponse>("/signup", { ...params });
  }

  login(params: LoginCredentials) {
    return this.post<LoginResponse>("/login", { ...params });
  }

  loginGoogle(token: string) {
    return this.post<LoginResponse>("/google", { token });
  }

  validateEmail(email: string) {
    return this.post<boolean>("/validate-email", { email });
  }

  verifyEmail(userEmail: string, otpCode: string) {
    return this.patch<boolean>("/verify-email", {
      userEmail,
      otpCode,
    });
  }

  resendOtp(email: string) {
    return this.post("/resend-otp", { email });
  }

  async sendPasswordLink(email: string) {
    return await this.post("/send-password-link", { email });
  }

  async validateResetPasswordToken(token: string) {
    return await this.post<boolean>("/verify-token", { token });
  }

  updatePassword(token: string, password: string) {
    return this.patch(`/update-password/${token}`, { password });
  }
}

export const authService = new AuthService();
