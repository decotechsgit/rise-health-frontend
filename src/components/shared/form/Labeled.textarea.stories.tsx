import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import LabeledTextarea, { CustomTextareaProps } from "./Labeled.textarea";


const meta: Meta<typeof LabeledTextarea> = {
  title: "Components/Shared/Form/LabeledTextarea",
  component: LabeledTextarea,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    placeholder: { control: "text" },
    defaultValue: { control: "text" },
    className: { control: "text" },
    rows: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: CustomTextareaProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <LabeledTextarea {...args} register={methods.register} errors={{}} />
    </FormProvider>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    name: "description",
    label: "Description",
    placeholder: "Enter a description...",
    defaultValue: "",
    rows: 4,
  },
};
