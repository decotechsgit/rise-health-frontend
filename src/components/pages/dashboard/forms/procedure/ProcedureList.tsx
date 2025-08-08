import Image from "next/image";
import Link from "next/link";

import { PAGES_ROUTES } from "@/constants/routes.constants";
import TextElement from "@components/shared/typography/TextElement.typo";

interface ProcedureListProps {
  forms: TFormData[];
  queryString: string;
}

const ProcedureList = ({ forms, queryString }: ProcedureListProps) => {
  const params = new URLSearchParams(queryString);

  return (
    <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pb-10 sm:max-h-[80vh]">
      {forms.map((form) => {
        params.set("formId", form.id);
        const href = `${PAGES_ROUTES.form(form.id)}?${params.toString()}`;
        return (
          <Link
            key={form.id}
            href={href}
            className="flex items-center justify-between rounded-xl border border-[var(--card-border)] bg-white px-8 py-4 shadow-sm transition hover:shadow-md"
          >
            <TextElement className="lg:text-[18px] font-[400] text-[var(--color-compliance-text-secondary)] text-wrap break-words">
              {form.title}
            </TextElement>
            <Image
              src="/dashboard/ic_next.svg"
              alt="Expand"
              width={28}
              height={28}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ProcedureList;
