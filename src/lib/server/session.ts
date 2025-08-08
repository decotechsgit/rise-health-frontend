import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import { isClient } from "@/lib/utils";

export const getUniversalSession = async (): Promise<Session | null> => {
  if (isClient) {
    const session = getSession();
    return session;
  } else {
    const { auth } = await import("@/auth");
    const session = await auth();
    return session;
  }
};
