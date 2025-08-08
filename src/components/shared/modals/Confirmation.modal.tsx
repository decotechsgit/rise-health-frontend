import IconButton from "../button";
import Row from "../row";
import TextElement from "../typography/TextElement.typo";

interface IConfirmationModalProps {
  modalHeading?: string;
  cancelBtnTitle?: string;
  confirmBtnTitle?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
  modalHeading = "Are you sure?",
  cancelBtnTitle = "No",
  confirmBtnTitle = "Yes",
  onCancel,
  onConfirm,
}) => {
  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-40 flex h-screen w-screen items-center justify-center bg-[#00000078]"
    >
      <Row
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        className="h-[150px] w-[30%] flex-col items-center justify-center rounded-lg bg-white"
      >
        <Row className="w-full flex-col items-center justify-center gap-4">
          <TextElement as="h3" className="text-center">
            {modalHeading}
          </TextElement>

          <Row className="gap-4 border-slate-200">
            {[
              {
                title: cancelBtnTitle,
                handleOnClick: onCancel,
                className: "border-2 border-orange-200",
              },
              {
                title: confirmBtnTitle,
                handleOnClick: onConfirm,
                className: "bg-orange-200",
              },
            ].map((item, index) => (
              <IconButton
                key={index}
                title={item.title}
                handleOnClick={item.handleOnClick}
                className={`px-4 py-1 ${item.className}`}
              />
            ))}
          </Row>
        </Row>
      </Row>
    </div>
  );
};

export default ConfirmationModal;
