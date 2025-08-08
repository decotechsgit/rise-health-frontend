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
    <div
      className="flex lg:h-[94px] lg:w-[395px] items-center rounded-3xl border-2 border-[#2D2F32] bg-white lg:p-6 p-4 px-6">
      <div className="flex lg:w-[339px] w-[250px] items-center gap-4">
        <TextElement
          className={`lg:!text-[18px] font-semibold ${altform.className} lg:h-[27px] w-[60px] rounded-full bg-[#2D2F32] pt-0.5 text-center text-white`}
        >
          {number}
        </TextElement>
        <TextElement as="span" className={`lg:!text-[20px] ${altform.className}`}>
          {title}
        </TextElement>
      </div>
    </div>
  );
};
export default OnboardingCard;
