import Image from 'next/image';

import Row from '../row';
import TextElement from '../typography/TextElement.typo';

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
    <Row className="w-full bg-orange-100 border border-slate-200 rounded-3xl px-6 items-start">
      <Row className="mt-3 gap-2 w-[30%] items-center">
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
          className="object-cover rounded-lg"
          loading="eager"
        />

        <Row className="flex-col gap-3 mt-3 ml-3">
          <TextElement as="h3">{title}</TextElement>
          <TextElement as="p">{description}</TextElement>

          <TextElement
            as="p"
            className="text-indigo-600 cursor-pointer underline"
            onClick={() => alert('Read more page is not available yet.')}
          >
            Read More
          </TextElement>
        </Row>
      </Row>
    </Row>
  );
};

export default FeedNewsCard;
