import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import ReactIcon from "../react-icon";
import Row from "../row";
import TextElement from "../typography/TextElement.typo";

interface IEmailTemplateCardProp {
  subject: string;
  group: string;
  archived: boolean;
  isSystemDefault: boolean;
  handleViewClick: () => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
  constainerClassName?: string;
}
const EmailTemplateCard: React.FC<IEmailTemplateCardProp> = ({
  subject,
  archived,
  group,
  isSystemDefault,
  constainerClassName,
  handleDeleteClick,
  handleEditClick,
  handleViewClick,
}) => (
  <Row
    className={`w-full items-center justify-between rounded-sm p-2 text-center ${constainerClassName}`}
  >
    <TextElement as="p" className="w-[50%] text-start lg:w-[60%]">
      {subject}
    </TextElement>

    <TextElement as="p" className="w-[16%] border-x">
      {group}
    </TextElement>

    <TextElement
      as="p"
      className={`w-[12%] border-r lg:w-[10%] ${archived ? "text-red-600" : "text-green-600"}`}
    >{`${archived ? "Y" : "N"}`}</TextElement>

    <Row className="w-[10%] cursor-pointer items-center justify-center gap-2 lg:w-[8%]">
      {[
        {
          Icon: BsFillEyeFill,
          className: "text-green-600",
          onClick: handleViewClick,
          show: true,
        },
        {
          Icon: BiSolidMessageSquareEdit,
          className: "text-indigo-600",
          onClick: handleEditClick,
          show: !isSystemDefault,
        },
        {
          Icon: MdDelete,
          className: "text-red-600",
          onClick: handleDeleteClick,
          show: !isSystemDefault,
        },
      ]
        .filter((item) => item.show)
        .map((item, index) => (
          <ReactIcon
            key={index}
            Icon={item.Icon}
            className={`size-[20px] ${item.className}`}
            onClick={item.onClick}
          />
        ))}
    </Row>
  </Row>
);
export default EmailTemplateCard;
