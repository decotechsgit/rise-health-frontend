import { altform } from "@/app/fonts/altform";
import LinkTextElement from "@components/shared/typography/LinkTextElement.typo";
import TextElement from "@components/shared/typography/TextElement.typo";

type SuggestedPacksProps = {
  suggestedPackages: SuggestedPackage[];
};

const SuggestedPacks = ({ suggestedPackages }: SuggestedPacksProps) => {
  return (
    <div className="p-2">
      <TextElement
        as="h2"
        className={`${altform.className} mb-2 flex items-center justify-between gap-4 !text-[18px] !font-normal md:!text-[20px]`}
      >
        Suggested Package(s)
      </TextElement>
      <ul className="list-disc pl-6">
        {suggestedPackages.map((item) => (
          <li
            key={item.name}
            className="py-1 text-sm text-[#717171] md:text-lg lg:text-xl"
          >
            {item.name}
          </li>
        ))}
      </ul>

      <TextElement
        as="h2"
        className={`${altform.className} my-8 !text-[16px] !font-normal md:!text-[18px]`}
      >
        For any questions, contact us at{" "}
        <LinkTextElement link="mailto:riseosau@gmail.com">
          riseosau@gmail.com
        </LinkTextElement>{" "}
        — we&#39;re here to help.
      </TextElement>
    </div>
  );
};
export default SuggestedPacks;
