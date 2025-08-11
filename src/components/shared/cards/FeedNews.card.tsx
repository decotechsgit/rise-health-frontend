import Image from "next/image";

import Row from "../row";
import TextElement from "../typography/TextElement.typo";

interface ICardData {
  title: string;
  description: string;
  newsDate: string;
  newsDay: string;
  newsTime: string;
  headerImage: string;
}
interface IFeedNewsCardProps {
  data: ICardData;
}

const FeedNewsCard: React.FC<IFeedNewsCardProps> = ({ data }) => {
  const { title, description, newsDate, newsDay, newsTime, headerImage } = data;

  return (
    <Row className="w-full items-start rounded-3xl border border-slate-200 bg-orange-100 px-6">
      <Row className="mt-3 w-[30%] items-center gap-2">
        <TextElement as="p">{newsDate}</TextElement>
        <TextElement as="p" className="ml-4">
          {newsDay}
        </TextElement>
        <TextElement as="p">-----</TextElement>
        <TextElement as="p">{newsTime}</TextElement>
      </Row>

      <Row className="w-[65%]">
        <Image
          alt="Header Image"
          src={headerImage}
          width={200}
          height={150}
          className="rounded-lg object-cover"
          loading="eager"
        />

        <Row className="mt-3 ml-3 flex-col gap-3">
          <TextElement as="h3">{title}</TextElement>
          <TextElement as="p">{description}</TextElement>

          <TextElement
            as="p"
            className="cursor-pointer text-indigo-600 underline"
            onClick={() => alert("Read more page is not available yet.")}
          >
            Read More
          </TextElement>
        </Row>
      </Row>
    </Row>
  );
};

export default FeedNewsCard;
