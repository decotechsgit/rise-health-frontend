import { Pencil } from "lucide-react";

import { altform } from "@/app/fonts/altform";
import { PAGES_ROUTES } from "@/constants/routes.constants";
import LinkTextElement from "@components/shared/typography/LinkTextElement.typo";
import TextElement from "@components/shared/typography/TextElement.typo";

type RegistrationGroupProps = {
  selectedGroups: RegistrationGroup[];
};

const SelectedRegistrationGroups = ({
  selectedGroups,
}: RegistrationGroupProps) => {
  return (
    <div className="p-2">
      <TextElement
        as="h2"
        className={`${altform.className} mb-2 flex items-center justify-between gap-4 !text-[18px] !font-normal md:!text-[20px]`}
      >
        Registration Group(s)
        {selectedGroups.length > 0 && (
          <LinkTextElement
            link={`${PAGES_ROUTES.onboardingRegistration}?callbackUrl=summary`}
          >
            <Pencil size={20} />
          </LinkTextElement>
        )}
      </TextElement>
      {selectedGroups.length > 0 ? (
        <ul className="list-disc pl-6">
          {selectedGroups.map((item) => (
            <li
              key={item.id}
              className="py-1 text-sm text-[#717171] md:text-lg lg:text-xl"
            >
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <TextElement
          className={`${altform.className} !text-[14px] !text-[#717171] md:!text-[16px] lg:!text-[18px]`}
        >
          Please select atleast one registration group.
          <br />
          <LinkTextElement
            link={`${PAGES_ROUTES.onboardingRegistration}?callbackUrl=summary`}
          >
            Select Group
          </LinkTextElement>
        </TextElement>
      )}
    </div>
  );
};
export default SelectedRegistrationGroups;
