import VerifyEmailWrapper from "@/components/pages/verify-email/wrapper";

type SearchParams = Promise<{
  email: string;
  otpCode: string;
}>;

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { email, otpCode } = await searchParams;

  return <VerifyEmailWrapper otpCode={otpCode} userEmail={email} />;
};

export default Page;
