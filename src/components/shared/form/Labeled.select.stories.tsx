import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import CustomSelect, { CustomSelectProps } from "./Labeled.select";

const meta: Meta<typeof CustomSelect> = {
  title: "Components/Shared/Form/CustomSelect",
  component: CustomSelect,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    id: { control: "text" },
    placeholder: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: CustomSelectProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <CustomSelect {...args} register={methods.register} errors={{}} />
    </FormProvider>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    name: "gender",
    id: "gender",
    label: "Select Gender",
    placeholder: "Select an option",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
};
