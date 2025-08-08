import { loginByGoogleAction } from "@/actions/auth.actions";

const GoogleLoginButton = ({ containerClassName = "" }) => {
  const handleGoogleLogin = async () => {
    try {
      await loginByGoogleAction();
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div
      onClick={handleGoogleLogin}
      className={`flex justify-center items-center w-full min-h-[45px] lg:min-h-[54px] xl:min-h-[54px] xxl:min-h-[54px] overflow-hidden border-[1px] border-[#2D2F32] rounded-[8px] py-[12px] px-[24px] cursor-pointer hover:bg-gray-50 ${containerClassName}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.8055 10.2275C19.8055 9.51249 19.7516 8.79999 19.6367 8.09998H10.2002V11.8775H15.6094C15.3867 13.095 14.6711 14.1425 13.5992 14.8325V17.2925H16.8078C18.6992 15.5725 19.8055 13.1275 19.8055 10.2275Z"
          fill="#4285F4"
        />
        <path
          d="M10.2002 20C12.897 20 15.1736 19.1 16.8079 17.2925L13.5993 14.8325C12.6914 15.435 11.5311 15.7825 10.2002 15.7825C7.5842 15.7825 5.38359 14.0575 4.58906 11.7H1.27344V14.2325C2.9002 17.6925 6.29063 20 10.2002 20Z"
          fill="#34A853"
        />
        <path
          d="M4.58906 11.7C4.39375 11.1 4.28906 10.46 4.28906 9.8C4.28906 9.14001 4.39375 8.50001 4.58906 7.90001V5.36751H1.27344C0.619687 6.67251 0.25 8.19251 0.25 9.8C0.25 11.4075 0.619687 12.9275 1.27344 14.2325L4.58906 11.7Z"
          fill="#FBBC05"
        />
        <path
          d="M10.2002 3.8175C11.6836 3.8175 13.0039 4.335 14.0508 5.335L16.9148 2.5425C15.1664 0.9175 12.8898 0 10.2002 0C6.29063 0 2.9002 2.3075 1.27344 5.7675L4.58906 8.3C5.38359 5.9425 7.5842 3.8175 10.2002 3.8175Z"
          fill="#EA4335"
        />
      </svg>
      <span className="ml-3 font-[400]">Continue with Google</span>
    </div>
  );
};

export default GoogleLoginButton;
