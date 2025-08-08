import AuthLayout from "@/components/shared/layouts/auth.layout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};
export default layout;
