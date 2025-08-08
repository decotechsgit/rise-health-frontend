import { redirect } from "next/navigation";

import { PAGES_ROUTES } from "@/constants/routes.constants";
import { authService } from "@api/auth.service";
import SetPasswordClientWrapper from "@components/pages/set-password/set-password.wrapper";

type SearchParams = Promise<{
  otpCode?: string;
  email?: string;
}>;

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { otpCode, email } = await searchParams;

  if (!otpCode || !email) {
    redirect(PAGES_ROUTES.login);
  }

  const response: boolean | string =
    otpCode && (await authService.validateResetPasswordToken(otpCode));

  return (
    <SetPasswordClientWrapper
      isExpired={!response}
      token={otpCode}
      email={email}
    />
  );
};

export default Page;
