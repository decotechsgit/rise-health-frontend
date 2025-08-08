import React from "react";
import { IoIosClose } from "react-icons/io";

import Row from "../row";
import TextElement from "../typography/TextElement.typo";

interface ITermsModalProps {
  onClose: () => void;
}

const TermsModal: React.FC<ITermsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        <Row className="items-center justify-between">
          <TextElement as="h2">Terms and Conditions</TextElement>

          <IoIosClose
            onClick={onClose}
            className="size-[30px] text-gray-500 hover:text-black"
          />
        </Row>

        <TextElement as="p" className="mt-4">
          Welcome to our healthcare platform. By creating an account and using
          our services, you agree to the following terms and conditions:
        </TextElement>
      </div>
    </div>
  );
};

export default TermsModal;
