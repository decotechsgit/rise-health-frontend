import LoginPasswordWrapper from "@/components/pages/password/login-password.wrapper";

type SearchParams = Promise<{
  email: string;
}>;

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { email } = await searchParams;

  return <LoginPasswordWrapper email={email} />;
};

export default Page;
