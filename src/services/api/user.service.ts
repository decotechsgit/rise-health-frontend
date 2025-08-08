import { ApiClient } from "./client.service";

class UserService extends ApiClient {
  constructor() {
    super("/user");
  }

  async getUserByEmail(email: string) {
    return await this.post<boolean>("/by-email", { email });
  }

  async getUserById(id: string) {
    return await this.get<User>(`/${id}`);
  }
}

export const userService = new UserService();
