/* eslint-disable @typescript-eslint/no-explicit-any */
import { RxCross2 } from "react-icons/rx";

import Row from "../row";
import TextElement from "../typography/TextElement.typo";

interface IEmailTemplateModalProps {
  onCancel: () => void;
  templateData: any;
}

const EmailTemplateModal: React.FC<IEmailTemplateModalProps> = ({
  onCancel,
  templateData,
}) => {
  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-40 flex h-screen w-screen items-center justify-center bg-[#00000078]"
    >
      <Row
        onClick={(e) => e.stopPropagation()}
        className="noScrollbar min-h-[450px] w-[45%] flex-col items-center justify-between overflow-x-hidden overflow-y-scroll rounded-lg bg-white"
      >
        <Row className="w-full flex-col items-center justify-between gap-4">
          <Row className="w-full items-center justify-between bg-orange-50 p-4">
            <Row className="flex-col items-start gap-1">
              <TextElement as="h3" className="text-center">
                {templateData.subject}
              </TextElement>

              <Row className="items-center gap-2">
                <TextElement
                  as="p"
                  className="rounded-md bg-indigo-200 px-2 py-1"
                >
                  {templateData.group}
                </TextElement>

                {templateData.isSystemDefault && (
                  <TextElement
                    as="p"
                    className="rounded-md bg-indigo-200 px-2 py-1"
                  >
                    System Generated
                  </TextElement>
                )}

                {templateData.archived && (
                  <TextElement
                    as="p"
                    className="rounded-md bg-red-200 px-2 py-1"
                  >
                    Not In Used
                  </TextElement>
                )}
              </Row>
            </Row>

            <RxCross2 size={20} onClick={onCancel} className="cursor-pointer" />
          </Row>

          <Row className="w-[95%] flex-col gap-4 rounded-2xl border-[1px] border-slate-200 bg-orange-50 p-3">
            {[
              {
                tiltle: templateData.htmlContent,
                className: "bg-orange-100 ",
              },
              { tiltle: templateData.metaData, className: "bg-orange-200 " },
            ].map((item, index) => (
              <TextElement
                as="p"
                key={index}
                className={`rounded-md p-2 ${item.className}`}
              >
                {item.tiltle}
              </TextElement>
            ))}
          </Row>
        </Row>
      </Row>
    </div>
  );
};

export default EmailTemplateModal;
