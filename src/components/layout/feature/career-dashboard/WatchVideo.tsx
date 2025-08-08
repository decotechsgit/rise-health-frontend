import Image from 'next/image';
import React from 'react';

import Row from '@/components/shared/row';
import TextElement from '@/components/shared/typography/TextElement.typo';

interface IWatchVideoProps {
  handleOnClick: () => void;
  imgURL: string;
  title: string;
  className?: string;
}

const WatchVideo: React.FC<IWatchVideoProps> = ({
  handleOnClick,
  imgURL,
  title,
  className,
}) => {
  return (
    <Row className={`items-center gap-4 ${className}`}>
      <Image
        alt="Video Guide"
        height={40}
        width={60}
        src={imgURL}
        className="rounded-lg cursor-pointer"
        onClick={handleOnClick}
      />

      <TextElement
        as="h3"
        onClick={handleOnClick}
        className="cursor-pointer underline text-indigo-300"
      >
        {title}
      </TextElement>
    </Row>
  );
};

/**
 * We are wrapping WatchVideo in React.memo to prevent unnecessary re-renders.
 * It will now only re-render if its props (handleOnClick or imgURL) change.
 * Since handleOnClick is memoized using useCallback in the parent,
 * this ensures WatchVideo stays pure and efficient.
 */
export default React.memo(WatchVideo);
