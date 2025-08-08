import { RxCross2 } from "react-icons/rx";

import { IPolicy } from "@/components/layout/feature/career-dashboard/form-and-modules-steps/AvailablePolicies";

import IconButton from "../button";
import Row from "../row";
import TextElement from "../typography/TextElement.typo";

interface IPolicyAvailableFormProps {
  onCancel: (item: IPolicy | null) => void;
  currentPolicy: IPolicy | null;
}

const PolicyAvailableFormModal: React.FC<IPolicyAvailableFormProps> = ({
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
              <TextElement as="h3" className="text-center">
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
                <TextElement as="p">FFORMS</TextElement>
                <TextElement as="p">QUICK ACTIONS</TextElement>
              </Row>

              {[
                { name: "Consent Form" },
                { name: "Consent Form" },
                { name: "Consent Form" },
                { name: "Consent Form" },
              ].map((item, index) => (
                <Row
                  key={index}
                  className={`items-center justify-between px-2 py-1 ${index % 2 === 0 ? "" : "rounded-md bg-orange-200"}`}
                >
                  <TextElement as="h3">{item.name}</TextElement>

                  <IconButton
                    title="Begin"
                    handleOnClick={() =>
                      alert("Apply form process in progress...")
                    }
                    btnClassName="bg-yellow-400"
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

export default PolicyAvailableFormModal;
