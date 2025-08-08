import { IoEyeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import { IPolicy } from "@/components/layout/feature/career-dashboard/form-and-modules-steps/AvailablePolicies";

import Row from "../row";
import TextElement from "../typography/TextElement.typo";

interface IAvailablePolicyModalProps {
  onCancel: (item?: IPolicy | null) => void;
  currentPolicy: IPolicy | null;
}

const AvailablePolicyModal: React.FC<IAvailablePolicyModalProps> = ({
  onCancel,
  currentPolicy,
}) => {
  if (!currentPolicy) {
    return null;
  }

  return (
    <div
      onClick={() => onCancel(null)}
      className="fixed inset-0 z-40 flex h-screen w-screen items-end justify-end bg-[#00000078]"
    >
      <Row
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        className="h-full w-[45%] flex-col items-center justify-between rounded-lg bg-white"
      >
        <Row className="w-full flex-col items-center justify-between gap-4">
          <Row className="w-full items-center justify-between bg-orange-50 p-4">
            <Row className="items-center gap-2">
              <TextElement className="text-center" as="h3">
                {currentPolicy.name}
              </TextElement>
            </Row>

            <RxCross2
              size={20}
              onClick={() => onCancel(null)}
              className="cursor-pointer"
            />
          </Row>

          <Row className="w-full flex-col rounded-2xl border-[1px] border-slate-200 bg-orange-50 p-3">
            <Row className="w-full flex-col gap-2">
              <Row className="w-full items-center justify-between rounded-md bg-orange-200 px-2 py-1">
                <TextElement as="p">
                  NDIC POLICY AND PROCEDURE MANUAL
                </TextElement>
                <TextElement as="p">QUICK ACTIONS</TextElement>
              </Row>

              {[
                { name: "2.1 Consent Form" },
                { name: "2.2 Consent Form" },
                { name: "2.3 Consent Form" },
                { name: "2.4 Consent Form" },
              ].map((item, index) => (
                <Row
                  key={index}
                  className={`items-center justify-between px-2 py-1 ${index % 2 === 0 ? "" : "rounded-md bg-orange-200"}`}
                >
                  <TextElement as="h3">{item.name}</TextElement>

                  <IoEyeOutline
                    size={20}
                    onClick={() => alert("View in progress...")}
                    className="cursor-pointer"
                  />
                </Row>
              ))}
            </Row>
          </Row>
        </Row>
      </Row>
    </div>
  );
};

export default AvailablePolicyModal;
