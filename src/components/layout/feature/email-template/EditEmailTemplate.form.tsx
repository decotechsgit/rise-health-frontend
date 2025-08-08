/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import IconButton from "@/components/shared/button";
import LabeledInput from "@/components/shared/form/Labeled.input";
import LabeledTextarea from "@/components/shared/form/Labeled.textarea";
// import LabeledTextarea from '@/components/shared/form/Labeled.textarea';
import Row from "@/components/shared/row";
import TextElement from "@/components/shared/typography/TextElement.typo";

interface IEditEmailTemplateFormProps {
  templateData: any;
}

const EditEmailTemplateForm = ({
  templateData,
}: IEditEmailTemplateFormProps) => {
  // const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    setIsProcessing(true);
    console.log(data);

    // const { htmlContent, metaData, subject } = data;

    // const response = await updateTemplateByIdService(templateData.id, {
    //   htmlContent,
    //   metaData,
    //   subject,
    // });

    // if (response.data.statusCode === 200) {
    //   toast.success(response.data.message);
    //   setIsProcessing(false);
    //   router.refresh(); // 🔄 Refresh the current page to show updated data
    // }
    setIsProcessing(false);
  };

  return (
    <Row className="w-full flex-col gap-4 p-8 items-end">
      <TextElement as="h1">Edit Email template</TextElement>
      <Row className="w-full flex-col gap-2">
        {[
          {
            name: "subject",
            label: "Subject of the email",
            placeHolder: "Subject",
            defaultValue: templateData.subject || "",
          },
          {
            name: "metaData",
            label: "Reason for sending (metadata)",
            placeHolder: "Metadata",
            defaultValue: templateData.metaData || "",
          },
        ].map((item, index) => (
          <LabeledInput
            key={index}
            name={item.name}
            type="text"
            className=""
            label={item.label}
            defaultValue={item.defaultValue}
            placeHolder={item.placeHolder}
            register={register}
            errors={errors}
          />
        ))}

        <LabeledTextarea
          name={"htmlContent"}
          label={"HTML Content"}
          placeholder={"HTML content of the email"}
          rows={6}
          defaultValue={templateData.htmlContent}
          register={register}
          errors={errors}
        />
      </Row>

      <Row className="w-full items-center gap-2 cursor-default">
        <TextElement as="p">{templateData.group}</TextElement>

        {templateData.isSystemDefault && (
          <TextElement as="p" className="bg-indigo-200  rounded-md  px-2 py-1">
            System Generated
          </TextElement>
        )}

        {templateData.archived && (
          <TextElement as="p" className="bg-red-200  rounded-md  px-2 py-1">
            Not In Used
          </TextElement>
        )}
      </Row>

      <IconButton
        title={`${isProcessing ? "Processing..." : "Edit"}`}
        className={`bg-orange-400 px-4 py-1`}
        btnClassName="text-center"
        handleOnClick={handleSubmit(onSubmit)}
      />
    </Row>
  );
};

export default EditEmailTemplateForm;
