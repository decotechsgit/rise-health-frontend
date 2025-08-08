import { altform } from "@/app/fonts/altform";
import LinkTextElement from "@components/shared/typography/LinkTextElement.typo";
import TextElement from "@components/shared/typography/TextElement.typo";

type SuggestedPacksProps = {
  suggestedPackages: SuggestedPackage[];
}

const SuggestedPacks = ({ suggestedPackages }:SuggestedPacksProps) => {
  return (
    <div className="p-2">
      <TextElement
        as="h2"
        className={`${altform.className} mb-2 !text-[18px] md:!text-[20px] !font-normal flex gap-4 items-center justify-between`}
      >
        Suggested Package(s)
      </TextElement>
      <ul className="list-disc pl-6">
        {suggestedPackages.map((item) => (
          <li
            key={item.name}
            className="text-sm py-1 text-[#717171] md:text-lg lg:text-xl"
          >
            {item.name}
          </li>
        ))}
      </ul>

      <TextElement
        as="h2"
        className={`${altform.className} my-8 !text-[16px] md:!text-[18px] !font-normal`}
      >
        For any questions, contact us at <LinkTextElement link="mailto:riseosau@gmail.com">riseosau@gmail.com</LinkTextElement> — we&#39;re here to help.
      </TextElement>
    </div>
  );
};
export default SuggestedPacks;