/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { toast } from "react-toastify";

import EmailTemplateCard from "@/components/shared/cards/EmailTemplate.card";
import ConfirmationModal from "@/components/shared/modals/Confirmation.modal";
import EmailTemplateModal from "@/components/shared/modals/EmailTemplate.modal";
import ReactIcon from "@/components/shared/react-icon";
import Row from "@/components/shared/row";
import TextElement from "@/components/shared/typography/TextElement.typo";

import { PAGES_ROUTES } from "@/constants/routes.constants";

interface IEmailTemplateListingProps {
  data: {
    items: any[] | [];
    pageInfo: {
      currentPage: number;
      itemCount: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  };
}

const EmailTemplateListing: React.FC<IEmailTemplateListingProps> = ({
  data,
}) => {
  const router = useRouter();
  const currentPage = data.pageInfo.currentPage;
  const [showViewModal, setShowViewModal] = useState<boolean>(false);

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);

  const toggleConfirmationModal = () =>
    setShowConfirmationModal(!showConfirmationModal);

  const toggleViewModal = (data: any) => {
    setShowViewModal(!showViewModal);
    setSelectedTemplate(data);
  };

  const onDeleteClick = (data: any) => {
    setSelectedTemplate(data);
    toggleConfirmationModal();
  };

  const handleDeleteTemplate = async () => {
    if (selectedTemplate) {
      const response = {} as any;

      if (response.data.data) {
        toast.success(response.data.message);
        toggleConfirmationModal();
        router.refresh(); // 🔄 Refresh the current page to show updated data
      }

      toggleConfirmationModal();
    }
  };

  const handlePageChange = (newPage: number) => {
    router.push(`${PAGES_ROUTES.emailTemplate}?page=${newPage}`);
  };

  return (
    <Row className="flex-col items-end p-6">
      <TextElement as="h1">Email Templates</TextElement>

      <Row className="my-2 w-full items-center justify-between rounded-md border bg-slate-50 p-2">
        {[
          { title: "Subject", className: "w-[50%] lg:w-[60%] text-start" },
          { title: "Group", className: "w-[16%] border-x" },
          { title: "Archived", className: "w-[12%] lg:w-[10%] border-r" },
          { title: "Actions", className: "w-[10%] lg:w-[8%]" },
        ].map((item) => (
          <TextElement
            as="h3"
            className={`text-center ${item.className}`}
            key={item.title}
          >
            {item.title}
          </TextElement>
        ))}
      </Row>

      <Row className="w-full flex-col items-center justify-between gap-2">
        {data?.items?.map((item, index) => (
          <EmailTemplateCard
            key={item.id}
            subject={item.subject}
            group={item.group}
            archived={item.archived}
            isSystemDefault={item.isSystemDefault}
            constainerClassName={`${
              index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"
            }`}
            handleViewClick={() => toggleViewModal(item)}
            handleEditClick={() =>
              router.push(`${PAGES_ROUTES.emailTemplate}/${item.id}`)
            }
            handleDeleteClick={() => onDeleteClick(item)}
          />
        ))}
      </Row>

      <Row className="mt-4 w-full items-center justify-between gap-2">
        <Row className="items-center gap-2">
          {[
            { title: "Total Records : " },
            { title: data.pageInfo.totalItems },
          ].map((item, index) => (
            <TextElement as="h3" key={index}>
              {item.title}
            </TextElement>
          ))}
        </Row>

        {/* page navigation */}
        <Row className="items-center gap-2">
          <ReactIcon
            Icon={GrFormPrevious}
            className={` ${
              currentPage <= 1
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer"
            }`}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          />

          <TextElement
            as="p"
            className="cursor-none rounded-sm border-[1px] border-gray-400 bg-slate-100 px-4 py-2"
          >{`${currentPage}/${data.pageInfo.totalPages}`}</TextElement>

          <ReactIcon
            Icon={MdOutlineNavigateNext}
            className={` ${
              currentPage >= data.pageInfo.totalPages
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer"
            }`}
            onClick={() =>
              currentPage < data.pageInfo.totalPages &&
              handlePageChange(currentPage + 1)
            }
          />
        </Row>
      </Row>

      {showConfirmationModal && (
        <ConfirmationModal
          onConfirm={handleDeleteTemplate}
          onCancel={toggleConfirmationModal}
        />
      )}

      {showViewModal && selectedTemplate && (
        <EmailTemplateModal
          onCancel={() => setShowViewModal(!showViewModal)}
          templateData={selectedTemplate}
        />
      )}
    </Row>
  );
};

export default EmailTemplateListing;
