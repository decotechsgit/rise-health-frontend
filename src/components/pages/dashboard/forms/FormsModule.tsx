"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { altform } from "@/app/fonts/altform";
import { PAGES_ROUTES } from "@/constants/routes.constants";
import ExpandableList from "@components/shared/form/expandable.list";
import SearchableHeader from "@components/shared/form/Searched.header.input";
import LinkTextElement from "@components/shared/typography/LinkTextElement.typo";
import TextElement from "@components/shared/typography/TextElement.typo";

import SubmittedFormsList from "./submitted-form/SubmittedFormsList";

interface FormsModuleProps {
  initialData: TPackage[] | null;
  formCopies: TFormCopyResponse[] | null;
}

const FormsModule = ({ initialData, formCopies }: FormsModuleProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleFormsClick = (
    itemName: string,
    pack: TSubCategory,
    isParent?: boolean
  ) => {
    const searchParams = new URLSearchParams();
    searchParams.set("referenceId", pack.id || "");
    searchParams.set("referenceType", isParent ? "category" : "subCategory");
    searchParams.set("category", pack.name || "");
    searchParams.set("selected", itemName);
    searchParams.set("subcategoryId", pack.id || "");
    searchParams.set("categoryId", pack.categoryId || "");
    searchParams.set("policyId", pack.policies?.id || "");
    searchParams.set("legislationId", pack.legislationLinks?.id || "");
    searchParams.set("formId", pack.forms?.id as string);
    let route = `${PAGES_ROUTES.procedure}`;

    if (itemName === "Legislation") {
      route = `${PAGES_ROUTES.legislation}${pack.id}`;
    } else if (itemName === "Policies & Procedures") {
      route = `${PAGES_ROUTES.policy}`;
    }
    return router.push(`${route}?${searchParams.toString()}`);
  };

  return (
    <div>
      <SearchableHeader
        title="Compliance Packs"
        showSearch={true}
        searchValue={search}
        actions={{
          sort: {
            show: true,
          },
          filter: {
            show: true,
          },
        }}
        onSearchChange={(val) => {
          setSearch(val);
        }}
        searchPlaceholder="Search"
      />

      {initialData && initialData?.length > 0 ? (
        <ExpandableList
          packs={initialData ? initialData : []}
          onClick={handleFormsClick}
        />
      ) : (
        <div className={`mx-auto my-3 w-[90%]`}>
          <TextElement as="p" className={altform.className}>
            You haven&#39;t selected any Registration Groups yet during
            onboarding. Please go back and select at least one service to view
            the relevant policy packs.
            <LinkTextElement
              link={`${PAGES_ROUTES.onboardingRegistration}`}
              className="mx-2"
            >
              Go Back to Select Registration Groups
            </LinkTextElement>
          </TextElement>
        </div>
      )}

      <SubmittedFormsList formCopies={formCopies || []} />
    </div>
  );
};

export default FormsModule;
