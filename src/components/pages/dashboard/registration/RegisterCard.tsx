import TextElement from "@components/shared/typography/TextElement.typo";

export interface RegisterItem {
  title: string;
  dueDate: string;
  status: "incomplete" | "pending" | "complete";
}

interface RegisterCardProps {
  register: RegisterItem;
  onClick?: () => void;
}

const RegisterCard = ({ register, onClick }: RegisterCardProps) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "incomplete":
        return "bg-pink-100 text-pink-800 font-semibold";
      case "pending":
        return "bg-orange-100 text-orange-800 font-semibold";
      case "complete":
        return "bg-emerald-100 text-emerald-800 font-semibold";
      default:
        return "";
    }
  };

  return (
    <div
      className="cursor-pointer space-y-12 rounded-2xl bg-white p-4 transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <TextElement className="font-medium">{register.title}</TextElement>
      <div className="flex items-center justify-between text-sm">
        <TextElement className="text-gray-500">{register.dueDate}</TextElement>
        <TextElement
          className={`rounded-full px-3 py-1 capitalize ${getStatusStyle(register.status)}`}
        >
          {register.status}
        </TextElement>
      </div>
    </div>
  );
};

export default RegisterCard;
