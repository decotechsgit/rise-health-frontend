import { altform } from "@/app/fonts/altform";
import { PAGES_ROUTES } from "@/constants/routes.constants";
import LinkTextElement from "@components/shared/typography/LinkTextElement.typo";
import TextElement from "@components/shared/typography/TextElement.typo";

type media = {
  id: string;
  title: string;
} | undefined;

type MediaSectionProps = {
  medias: media[];
}

const MediaSection = ({medias}:MediaSectionProps) => {
  return (
    medias.map((item) => (
      <div key={item?.id}>
        <div className="p-2">
          <TextElement
            as="h2"
            className={`${altform.className} pb-2 !text-[20px]`}
          >
            {item?.title}
          </TextElement>
          <div>
            <LinkTextElement
              link={`${PAGES_ROUTES.onboardingMediaViewer}/?id=${item?.id}&title=${item?.title}`}
            >
              view docs
            </LinkTextElement>
          </div>
        </div>
      </div>
    ))
  )
}
export default  MediaSection;