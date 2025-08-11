"use client";

import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";

import { altform } from "@/app/fonts/altform";
import { useOnboarding } from "@/contexts/onboarding-context";
import TextElement from "@components/shared/typography/TextElement.typo";

const Note = ({ closeNote }: { closeNote: () => void }) => {
  return (
    <div className="absolute top-0 right-0 flex h-[100vh] w-[100vw] items-center justify-center bg-[rgba(0,0,0,0.8)]">
      <div className="w-[90%] rounded bg-white p-6 md:w-[50%] lg:w-[35%] xl:w-[25%]">
        <div className="flex items-center justify-between pb-3">
          <TextElement as="h2" className={`${altform.className} font-semibold`}>
            Note
          </TextElement>
          <X onClick={closeNote} className="cursor-pointer" />
        </div>
        <TextElement as="p" className={`text-justify ${altform.className}`}>
          You’ve selected services that fall under both{" "}
          <span className="font-semibold !text-[#1C7C6A]">Verification</span>{" "}
          and{" "}
          <span className="font-semibold !text-[#F83B66]">Certification</span>{" "}
          audit pathways. Under NDIS rules, Certification requirements apply in
          this case and will cover both services. You won’t need to submit
          separate Verification documentation
        </TextElement>
      </div>
    </div>
  );
};

const RegistrationGroupsTable = ({
  data,
  itemsPerPage = 6,
}: {
  data: RegistrationGroup[];
  itemsPerPage?: number;
}) => {
  const {
    onboarding,
    setOnboarding,
    registrationGroupStepId,
    registrationGroupParentKey,
  } = useOnboarding();
  const [showNote, setShowNote] = useState<boolean>(false);
  const [isNoteShowedOnce, setIsNoteShowedOnce] = useState(false);

  const searchParams = useSearchParams();
  const stepId: string = searchParams.get("stepId") || registrationGroupStepId;
  const parentKey: string =
    searchParams.get("parentKey") || registrationGroupParentKey;

  const [selectedItems, setSelectedItems] = useState(new Set<string>());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const selectedGroups = new Set<string>();
    if (onboarding?.progress?.registrations?.prepare_registration_select) {
      const temp =
        onboarding.progress.registrations.prepare_registration_select;
      Object.keys(temp).forEach((key) => {
        if (temp[key]) selectedGroups.add(key);
      });
    }
    setSelectedItems(selectedGroups);
  }, [onboarding]);

  useEffect(() => {
    const initialSelectedIds = new Set<string>();
    const temp =
      onboarding?.progress?.registrations?.prepare_registration_select;
    if (temp) {
      Object.keys(temp).forEach((key) => {
        if (temp[key]) initialSelectedIds.add(key);
      });
    }

    if (initialSelectedIds.size > 0) {
      const initialSelectedTypes = new Set(
        data
          .filter((item) => initialSelectedIds.has(item.id))
          .map((item) => item.auditType)
      );

      if (
        initialSelectedTypes.has("Verification") &&
        initialSelectedTypes.has("Certification")
      ) {
        setIsNoteShowedOnce(true);
      }
    }
  }, [onboarding, data]);

  useEffect(() => {
    if (isNoteShowedOnce || selectedItems.size === 0) {
      return;
    }

    const currentSelectedTypes = new Set(
      data
        .filter((item) => selectedItems.has(item.id))
        .map((item) => item.auditType)
    );

    if (
      currentSelectedTypes.has("Verification") &&
      currentSelectedTypes.has("Certification")
    ) {
      setShowNote(true);
      setIsNoteShowedOnce(true);
    }
  }, [selectedItems, data, isNoteShowedOnce]);

  const auditTypes = useMemo(() => {
    const types = [
      ...new Set(data.map((item) => item.auditType).filter(Boolean)),
    ];
    return ["All", ...types];
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.registrationNo.toString().includes(searchTerm);

      const matchesFilter =
        filterType === "All" || item.auditType === filterType;

      return matchesSearch && matchesFilter;
    });
  }, [data, searchTerm, filterType]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  const handleSelectItem = (itemId: string) => {
    let completedSteps = onboarding?.progress?.completedSteps ?? [];

    const newSelected = new Set(selectedItems);
    if (completedSteps.includes(parentKey) && newSelected.size === 0) {
      completedSteps = completedSteps.filter((item) => item !== parentKey);
    }
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
      if (completedSteps.includes(parentKey) && newSelected.size === 0) {
        completedSteps = completedSteps.filter((item) => item !== parentKey);
      }
      setOnboarding({
        ...onboarding,
        progress: {
          ...onboarding?.progress,
          checkboxes: {
            ...(onboarding?.progress?.checkboxes || {}),
            [stepId]: !(newSelected.size === 0),
          },
          registrations: {
            ...onboarding?.progress?.registrations,
            prepare_registration_select: {
              ...(onboarding?.progress?.registrations
                ?.prepare_registration_select || {}),
              [itemId]: false,
            },
          },
          completedSteps: [...completedSteps],
        },
      });
    } else {
      newSelected.add(itemId);
      setOnboarding({
        ...onboarding,
        progress: {
          ...onboarding?.progress,
          checkboxes: {
            ...(onboarding?.progress?.checkboxes || {}),
            [stepId]: !(newSelected.size === 0),
          },
          registrations: {
            ...onboarding?.progress?.registrations,
            prepare_registration_select: {
              ...(onboarding?.progress?.registrations
                ?.prepare_registration_select || {}),
              [itemId]: true,
            },
          },
        },
      });
    }
    setSelectedItems(newSelected);
  };

  const getBadgeColor = (auditType: string) => {
    switch (auditType) {
      case "Verification":
        return "bg-[#DEF6F1] text-[#1C7C6A] border-none";
      case "Certification":
        return "bg-[#FFF0F3] text-[#F83B66]  border-none";
      default:
        return "bg-gray-100 text-gray-800 border-none";
    }
  };
  const getBadgeText = (auditType: string) => {
    switch (auditType) {
      case "Verification":
        return "!text-[#1C7C6A]";
      case "Certification":
        return "!text-[#F83B66]";
      default:
        return "!text-gray-800";
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto w-full max-w-7xl bg-white p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="Search for a registration group"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex w-48 items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none hover:bg-gray-50 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-gray-700">{filterType}</span>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-300 bg-white shadow-lg">
              {auditTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilterType(type);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                >
                  <TextElement className={altform.className}>
                    {type}
                  </TextElement>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <TextElement
                  className={`${altform.className} text-xs font-medium tracking-wider text-gray-500 uppercase`}
                >
                  Select
                </TextElement>
              </th>
              <th className="px-4 py-3 text-left">
                <TextElement
                  className={`${altform.className} text-xs font-medium tracking-wider text-gray-500 uppercase`}
                >
                  No.
                </TextElement>
              </th>
              <th className="px-4 py-3 text-left">
                <TextElement
                  className={`${altform.className} text-xs font-medium tracking-wider text-gray-500 uppercase`}
                >
                  Registration Group
                </TextElement>
              </th>
              <th className="px-4 py-3 text-left">
                <TextElement
                  className={`${altform.className} text-xs font-medium tracking-wider text-gray-500 uppercase`}
                >
                  Description
                </TextElement>
              </th>
              <th className="px-4 py-3 text-left">
                <TextElement
                  className={`${altform.className} text-xs font-medium tracking-wider text-gray-500 uppercase`}
                >
                  Audit Type
                </TextElement>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentPageData.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No registration groups found
                </td>
              </tr>
            ) : (
              currentPageData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="mx-auto h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <TextElement
                      className={`${altform.className} text-sm font-medium text-gray-900`}
                    >
                      {item.registrationNo}
                    </TextElement>
                  </td>
                  <td className="px-4 py-3">
                    <TextElement
                      className={`${altform.className} text-sm text-gray-900`}
                    >
                      {item.name}
                    </TextElement>
                  </td>
                  <td className="max-w-md px-4 py-3">
                    <TextElement
                      className={`${altform.className} line-clamp-2 text-sm text-gray-600 hover:line-clamp-none`}
                    >
                      {item.description}
                    </TextElement>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full border px-4 py-2 ${getBadgeColor(item.auditType)}`}
                    >
                      <span
                        className={`${altform.className} ${getBadgeText(item.auditType)} text-[16px]`}
                      >
                        {item.auditType}
                      </span>
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium`}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              <TextElement
                className={`${altform.className} ${
                  currentPage === 1
                    ? "!cursor-not-allowed !text-gray-400"
                    : "!text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                Previous
              </TextElement>
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) =>
                  page === currentPage && (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        page === currentPage
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <TextElement
                        className={`${altform.className} ${
                          page === currentPage
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {page}
                      </TextElement>
                    </button>
                  )
              )}
            </div>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? "cursor-not-allowed text-gray-400"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <TextElement
                className={`${altform.className} ${
                  currentPage === totalPages
                    ? "cursor-not-allowed text-gray-400"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                Next
              </TextElement>
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      {showNote && (
        <Note
          closeNote={() => {
            setShowNote(false);
          }}
        />
      )}
    </div>
  );
};

export default RegistrationGroupsTable;
