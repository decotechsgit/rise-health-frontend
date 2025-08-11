"use server";

import { auth } from "@/auth";
import { userService } from "@api/user.service";

export async function getUserName() {
  const session = await auth();
  let username: string = "";
  if (session) {
    if (session.user?.role) {
      const user = await userService.getUserById(session.user.role);
      if (user) {
        username = user.fullName;
      }
    }
  }
  return username;
}
