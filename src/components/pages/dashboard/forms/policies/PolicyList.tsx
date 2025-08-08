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
    <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pb-10 sm:max-h-[80vh]  w-[100%]">
      {policies.map((policy: TPolicy) => {
        params.set("policyId", policy.id);
        const href = `${PAGES_ROUTES.policyDetail(policy.id)}?${params.toString()}`;
        return (
          <Link
            key={policy.id}
            href={href}
            className="flex items-center justify-between gap-2 rounded-xl border border-[var(--card-border)] bg-white px-8 py-4 shadow-sm transition hover:shadow-md overflow-hidden"
          >
            <TextElement
              as="p"
              className="lg:text-[18px] font-[400] text-[var(--color-compliance-text-secondary)] w-[80%]  h-auto text-wrap break-words"
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
