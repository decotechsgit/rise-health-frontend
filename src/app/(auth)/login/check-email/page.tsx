import CheckEmailWrapper from "../../../../components/pages/check-email/check-email.wrapper";

type SearchParams = Promise<{
  email: string;
}>;

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { email } = await searchParams;

  return <CheckEmailWrapper email={email} />;
};

export default Page;
