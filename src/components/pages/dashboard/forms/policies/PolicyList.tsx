import Image from "next/image";
import Link from "next/link";

import { PAGES_ROUTES } from "@/constants/routes.constants";
import TextElement from "@components/shared/typography/TextElement.typo";

interface PolicyListProps {
  policies: TPolicy[];
  queryString: string;
}

const PolicyList = ({ policies, queryString }: PolicyListProps) => {
  const params = new URLSearchParams(queryString);

  return (
    <div className="flex max-h-[70vh] w-[100%] flex-col gap-4 overflow-y-auto pb-10 sm:max-h-[80vh]">
      {policies.map((policy: TPolicy) => {
        params.set("policyId", policy.id);
        const href = `${PAGES_ROUTES.policyDetail(policy.id)}?${params.toString()}`;
        return (
          <Link
            key={policy.id}
            href={href}
            className="flex items-center justify-between gap-2 overflow-hidden rounded-xl border border-[var(--card-border)] bg-white px-8 py-4 shadow-sm transition hover:shadow-md"
          >
            <TextElement
              as="p"
              className="h-auto w-[80%] font-[400] text-wrap break-words text-[var(--color-compliance-text-secondary)] lg:text-[18px]"
            >
              {policy.title}
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

export default PolicyList;
