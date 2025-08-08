import TextElement from '../typography/TextElement.typo';

interface ICircleCardProps {
  count: number | string;
  className?: string;
}

const CircleCard: React.FC<ICircleCardProps> = ({ count, className }) => {
  return (
    <div
      className={`bg-[#00CDA6] size-[28px] lg:size-[34px] rounded-full flex justify-center items-center ${className}`}
    >
      <TextElement className="text-[12px] lg:text-[18px]" as="h4">
        {count}
      </TextElement>
    </div>
  );
};

export default CircleCard;
