import Row from '../row';
import TextElement from '../typography/TextElement.typo';

interface ICategoryCardProps {
  title: string;
  description?: string;
  tags?: string[];
  containerClassName: string;
  handleDetailClick?: () => void;
  onClick?: () => void;
}

const CategoryCard: React.FC<ICategoryCardProps> = ({
  title,
  description,
  tags,
  containerClassName,
  handleDetailClick,
  onClick,
}) => {
  return (
    <Row
      onClick={onClick}
      className={`bg-orange-100 rounded-lg p-3 flex-col items-start gap-3 ${containerClassName}`}
    >
      <TextElement as="h3">{title}</TextElement>

      <TextElement as="p">{description}</TextElement>

      {tags && tags.length > 0 && (
        <Row className="flex-col gap-2">
          {tags?.map((tag, index) => (
            <TextElement
              as="p"
              className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full"
              key={index}
            >
              {tag}
            </TextElement>
          ))}
        </Row>
      )}

      {handleDetailClick && (
        <TextElement
          as="p"
          className="cursor-pointer underline"
          onClick={handleDetailClick}
        >
          Details
        </TextElement>
      )}
    </Row>
  );
};

export default CategoryCard;
