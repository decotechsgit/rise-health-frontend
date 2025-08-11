import Row from "../row";
import TextElement from "../typography/TextElement.typo";

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
      className={`h-[300px] items-end overflow-hidden rounded-2xl bg-yellow-200 ${containerClassName}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Row
        className={`h-[50px] w-full items-center justify-center gap-4 px-4 py-2 ${subContainerClass}`}
      >
        <div className="flex size-[25px] items-center justify-center rounded-full bg-white">
          {stepNumber}
        </div>

        <TextElement as="h3">{title}</TextElement>
      </Row>
    </Row>
  );
};

export default RegistrationStepCard;
