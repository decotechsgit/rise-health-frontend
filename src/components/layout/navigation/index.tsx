import Row from '@/components/shared/row';
import TextElement from '@/components/shared/typography/TextElement.typo';

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
      className={`fontPoppins cursor-pointer gap-3 p-4 items-center  w-full hover:bg-[#fda10c11] font-medium ${
        isSelected ? 'bg-[#fda10c11]  border-l-4 border-[#fda10c]' : '  '
      }`}
    >
      <Icon size={20} className={'w-[8%]'} />

      <TextElement as="p" className="text-[14px] w-[70%]">
        {title}
      </TextElement>
    </Row>
  );
};

export default AdminNavigation;
