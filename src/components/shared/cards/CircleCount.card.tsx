import TextElement from "../typography/TextElement.typo";

interface ICircleCardProps {
  count: number | string;
  className?: string;
}

const CircleCard: React.FC<ICircleCardProps> = ({ count, className }) => {
  return (
    <div
      className={`flex size-[28px] items-center justify-center rounded-full bg-[#00CDA6] lg:size-[34px] ${className}`}
    >
      <TextElement className="text-[12px] lg:text-[18px]" as="h4">
        {count}
      </TextElement>
    </div>
  );
};

export default CircleCard;
