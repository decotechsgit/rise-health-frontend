import Row from "@/components/shared/row";
import TextElement from "@/components/shared/typography/TextElement.typo";

interface IProfileStatItemProps {
  title: string;
  percentage: string;
  Icon:
    | React.ElementType
    | React.ComponentType<{ size?: number; className?: string }>;
  containerClassName?: string;
}

const ProfileStatItem: React.FC<IProfileStatItemProps> = ({
  title,
  containerClassName,
  percentage,
  Icon,
}) => {
  return (
    <Row
      className={`relative items-center justify-between rounded-lg p-4 ${containerClassName}`}
    >
      <Row className="items-center gap-2">
        <Icon size={40} />

        <TextElement as="h3">{title}</TextElement>
      </Row>

      <TextElement as="h1">{percentage}</TextElement>

      <TextElement as="p" className="absolute top-2 right-2">
        %
      </TextElement>
    </Row>
  );
};

export default ProfileStatItem;
