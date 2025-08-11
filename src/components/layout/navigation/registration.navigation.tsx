import Row from "@/components/shared/row";
import TextElement from "@/components/shared/typography/TextElement.typo";

const RegistrationNavigation: React.FC<{
  title: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ title, isSelected, onClick }) => {
  return (
    <Row
      onClick={onClick}
      className={`w-full cursor-pointer items-center justify-center gap-3 px-4 py-2 font-medium hover:rounded-lg hover:bg-white ${
        isSelected ? "rounded-lg bg-white" : " "
      }`}
    >
      <TextElement as="p">{title}</TextElement>
    </Row>
  );
};

export default RegistrationNavigation;
