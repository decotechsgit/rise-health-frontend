"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn, signOut } from "@/auth";
import { PAGES_ROUTES } from "@/constants/routes.constants";
import { authService } from "@api/auth.service";
import { ApplicationHTTPError } from "@api/client.error";

type ActionState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  fieldValues?: Record<string, string>;
};

const LoginSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  email: z.string().email("Invalid email address"),
});

export async function loginAction(
  previous: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    LoginSchema.parse({
      password,
      email,
    });

    const result = await signIn("credentials", {
      username: email.trim(),
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    let errorMessage = "Unknown error occurred";
    if (error instanceof AuthError) {
      errorMessage = error.cause?.err?.message || "Unknown error occurred";
    } else if (error instanceof z.ZodError) {
      errorMessage = error.issues.map((e) => e.message).join(", ");
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
  redirect(PAGES_ROUTES.careerDashboard);
}

export async function loginByGoogleAction() {
  await signIn("google", {
    redirectTo: PAGES_ROUTES.careerDashboard,
  });
}

const SignupSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine((data) => /[A-Z]/.test(data), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((data) => /[a-z]/.test(data), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((data) => /[^a-zA-Z0-9]/.test(data), {
      message: "Password must contain at least one symbol.",
    }),
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(6, "Please provide both first name and last name"),
  token: z.string().length(6, "Token must be exactly 6 characters long"),
});

export async function signupAction(
  previous: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const token = formData.get("otp") as string;
  const dataToSend = {
    email,
    password,
    fullName,
    token,
  };

  try {
    SignupSchema.parse(dataToSend);

    const payload: SignupCredentials = dataToSend;
    const user = await authService.signup(payload);

    if (typeof user === "object" && user !== null && "email" in user) {
      const result = await signIn("credentials", {
        username: user.email,
        password: payload.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Invalid email or password");
      }
    }
  } catch (error) {
    let errorMessage = "Unknown error occurred";
    let fieldErrors = {};
    if (error instanceof AuthError) {
      errorMessage = error.cause?.err?.message || "Unknown error occurred";
    } else if (error instanceof z.ZodError) {
      errorMessage = error.issues.map((e) => e.message).join(", ");
      error.issues.forEach((e) => {
        fieldErrors = {
          ...fieldErrors,
          [e.path[0]]: e.message,
        };
      });
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    if (error instanceof ApplicationHTTPError) {
      errorMessage = error.getUserMessage();
    }

    return {
      success: false,
      error: errorMessage,
      fieldErrors: fieldErrors,
      fieldValues: dataToSend,
    };
  }
  redirect(PAGES_ROUTES.accountCompletion);
}

export async function logoutAction() {
  await signOut({ redirectTo: PAGES_ROUTES.login });
}
