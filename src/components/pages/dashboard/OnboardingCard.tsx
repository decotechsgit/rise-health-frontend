import { altform } from "@/app/fonts/altform";
import TextElement from "@components/shared/typography/TextElement.typo";

const OnboardingCard = ({
  number,
  title,
}: {
  number: string;
  title: string;
}) => {
  return (
    <div className="flex items-center rounded-3xl border-2 border-[#2D2F32] bg-white p-4 px-6 lg:h-[94px] lg:w-[395px] lg:p-6">
      <div className="flex w-[250px] items-center gap-4 lg:w-[339px]">
        <TextElement
          className={`font-semibold lg:!text-[18px] ${altform.className} w-[60px] rounded-full bg-[#2D2F32] pt-0.5 text-center text-white lg:h-[27px]`}
        >
          {number}
        </TextElement>
        <TextElement
          as="span"
          className={`lg:!text-[20px] ${altform.className}`}
        >
          {title}
        </TextElement>
      </div>
    </div>
  );
};
export default OnboardingCard;
