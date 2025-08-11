import Row from "@/components/shared/row";
import TextElement from "@/components/shared/typography/TextElement.typo";

interface IAdminNavigation {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  Icon:
    | React.ElementType
    | React.ComponentType<{ size?: number; className?: string }>;
}

const AdminNavigation: React.FC<IAdminNavigation> = ({
  title,
  isSelected,
  onClick,
  Icon,
}) => {
  return (
    <Row
      onClick={onClick}
      className={`fontPoppins w-full cursor-pointer items-center gap-3 p-4 font-medium hover:bg-[#fda10c11] ${
        isSelected ? "border-l-4 border-[#fda10c] bg-[#fda10c11]" : " "
      }`}
    >
      <Icon size={20} className={"w-[8%]"} />

      <TextElement as="p" className="w-[70%] text-[14px]">
        {title}
      </TextElement>
    </Row>
  );
};

export default AdminNavigation;
