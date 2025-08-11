import TextElement from "@components/shared/typography/TextElement.typo";

interface StatCardProps {
  title: string;
  percentage: number;
  className?: string;
}

const StatCard = ({ title, percentage, className = "" }: StatCardProps) => {
  return (
    <div
      className={`rounded-2xl border-2 bg-white p-4 ${className} flex flex-row items-center justify-between`}
    >
      <TextElement className="text-[#1E1F21]">{title}</TextElement>
      <TextElement as="h5" className="text-[#1E1F21]">
        {percentage}%
      </TextElement>
    </div>
  );
};

export default StatCard;
