import Row from '@/components/shared/row';
import TextElement from '@/components/shared/typography/TextElement.typo';

const RegistrationNavigation: React.FC<{
  title: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ title, isSelected, onClick }) => {
  return (
    <Row
      onClick={onClick}
      className={`cursor-pointer gap-3 px-4 py-2 items-center justify-center w-full hover:bg-white hover:rounded-lg font-medium ${
        isSelected ? 'bg-white rounded-lg ' : '  '
      }`}
    >
      <TextElement as="p">{title}</TextElement>
    </Row>
  );
};

export default RegistrationNavigation;
