declare global {
  type SignupCredentials = {
    email: string;
    fullName: string;
    password: string;
    token: string;
  }
  type LoginCredentials = {
    email: string;
    password: string;
  };

  type LoginResponse = {
    id: string,
    fullName: string,
    email: string,
    accessToken: string,
    emailVerified: boolean,
    role: string,
  };

  type SignupResponse = {
    email: string,
  } & LoginResponse;
}

// This export is needed to make the file a module
export { };
