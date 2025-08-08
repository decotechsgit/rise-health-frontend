import { IoIosClose } from "react-icons/io";

import Row from "../row";
import TextElement from "../typography/TextElement.typo";

interface PolicyModalProps {
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6">
        <Row className="items-center justify-between">
          <TextElement as="h2">Privacy Policy</TextElement>

          <IoIosClose
            onClick={onClose}
            className="size-[30px] text-gray-500 hover:text-black"
          />
        </Row>

        <TextElement as="p" className="mt-4 text-justify">
          Your privacy is very important to us. This policy explains how we
          handle and protect your health-related data.
        </TextElement>
      </div>
    </div>
  );
};

export default PolicyModal;
