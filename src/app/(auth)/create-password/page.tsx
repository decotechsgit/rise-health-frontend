import CreatePasswordWrapper from "../../../components/pages/create-password/create-password.wrapper";

type SearchParams = Promise<{
  otp: string;
  email: string;
}>;

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { otp, email } = await searchParams;

  return <CreatePasswordWrapper email={email} otp={otp} />;
};

export default Page;
