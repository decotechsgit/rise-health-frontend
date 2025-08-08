import { NextRequest, NextResponse } from "next/server";

import { auth } from "./auth";
import { PAGES_ROUTES } from "./constants/routes.constants";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

const publicRoutes = [
  PAGES_ROUTES.login,
  PAGES_ROUTES.signup,
  PAGES_ROUTES.verifyEmail,
  PAGES_ROUTES.createPassword,
  PAGES_ROUTES.setPassword,
];

export const middleware = async (request: NextRequest) => {
  const session = await auth();
  const accessToken = session?.user?.token || null;
  const { pathname } = request.nextUrl;

  const dashboardUrl = new URL(PAGES_ROUTES.dashboardRegistration, request.url);
  const loginPageUrl = new URL(PAGES_ROUTES.login, request.url);

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // redirect to dashboard
  if ((session && accessToken) &&  (pathname === "/" || isPublicRoute)) {
    return NextResponse.redirect(dashboardUrl);
  }

  // redirect to login page
  if (!(session && accessToken) && !isPublicRoute) {
    return NextResponse.redirect(loginPageUrl);
  }

  return NextResponse.next();
};
