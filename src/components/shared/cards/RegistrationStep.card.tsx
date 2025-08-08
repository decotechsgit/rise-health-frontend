import Row from '../row';
import TextElement from '../typography/TextElement.typo';

interface IRegistrationStepCardProps {
  title: string;
  imageUrl: string;
  containerClassName?: string;
  stepNumber: string | number;
  subContainerClass?: string;
}

const RegistrationStepCard: React.FC<IRegistrationStepCardProps> = ({
  title,
  imageUrl,
  containerClassName,
  stepNumber,
  subContainerClass,
}) => {
  return (
    <Row
      className={`h-[300px] overflow-hidden items-end rounded-2xl bg-yellow-200 ${containerClassName}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Row
        className={`w-full items-center justify-center gap-4 px-4 py-2 h-[50px] ${subContainerClass}`}
      >
        <div className="size-[25px] bg-white rounded-full flex justify-center items-center ">
          {stepNumber}
        </div>

        <TextElement as="h3">{title}</TextElement>
      </Row>
    </Row>
  );
};

export default RegistrationStepCard;
