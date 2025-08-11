"use client";
import Link from "next/link";
import React, { useState } from "react";

import TextElement from "@/components/shared/typography/TextElement.typo";

import { PAGES_ROUTES } from "@/constants/routes.constants";
import SearchableHeader from "@components/shared/form/Searched.header.input";
import StatusChip from "@components/shared/form/StatusChip";

interface SubmittedFormsListProps {
  formCopies: TFormCopyResponse[];
}

const TABLE_HEADERS = [
  { key: "title", label: "FORM NAME" },
  { key: "submittedBy", label: "SUBMITTED BY" },
  { key: "submissionDate", label: "SUBMISSION DATE" },
  { key: "status", label: "STATUS" },
  { key: "actions", label: "ACTIONS" },
] as const;

const TableHeader = () => (
  <tr className="bg-[var(--button-cancel-bg)]">
    {TABLE_HEADERS.map(({ label }) => (
      <th key={label} className="px-6 py-3">
        <TextElement className="text-[12px] font-[400] text-[var(--table-body-text)] md:text-[16px] lg:text-[18px]">
          {label}
        </TextElement>
      </th>
    ))}
  </tr>
);

const TableRow = ({
  copy,
  index,
}: {
  copy: TFormCopyResponse;
  index: number;
}) => (
  <tr
    key={copy.id}
    className={`${index % 2 !== 0 ? "bg-[var(--button-cancel-bg)]" : "bg-white"} h-[60px]`}
  >
    <td className="px-6">
      <TextElement className="w-[50vw] font-[400] md:line-clamp-3 md:w-full lg:text-[18px]">
        {copy.title}
      </TextElement>
    </td>
    <td className="px-6">
      <TextElement className="font-[400] lg:text-[18px]">--</TextElement>
    </td>
    <td className="px-6">
      <TextElement className="font-[400] lg:text-[18px]">--</TextElement>
    </td>
    <td className="px-6">
      <StatusChip text={copy.status} />
    </td>
    <td className="px-6">
      <Link
        href={`${PAGES_ROUTES.form(copy.id)}?referenceId=${copy.referenceId}&referenceType=${copy.type}&copyId=${copy.id}&category=${copy.title}&status=${copy.status}&isCopy=${true}&navDisabled=true`}
        className="underline"
      >
        <TextElement className="font-[400] lg:text-[18px]">View</TextElement>
      </Link>
    </td>
  </tr>
);

const SubmittedFormsList: React.FC<SubmittedFormsListProps> = ({
  formCopies,
}) => {
  const [search, setSearch] = useState("");
  return (
    <div className="mt-8 w-full">
      <SearchableHeader
        title="Submitted Forms"
        showSearch={true}
        searchValue={search}
        actions={{ sort: { show: true }, filter: { show: true } }}
        onSearchChange={(val) => {
          setSearch(val);
        }}
        searchPlaceholder="Search"
      />
      <div className="mt-6 overflow-x-auto rounded-2xl bg-[var(--table-bg,white)]">
        <table className="min-w-full text-left">
          <thead>
            <TableHeader />
          </thead>
          <tbody>
            {formCopies.map((copy, index) => (
              <TableRow key={copy.id} copy={copy} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedFormsList;
