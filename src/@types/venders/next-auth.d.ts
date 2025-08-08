import "next-auth";

declare module "next-auth" {
  interface User {
    token?: string;
    role?: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    token?: string;
    role?: string;
  }
}
