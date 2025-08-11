import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import CustomRadioGroup, { CustomRadioGroupProps } from "./Labeled.radio";

const meta: Meta<typeof CustomRadioGroup> = {
  title: "Components/Shared/Form/CustomRadioGroup",
  component: CustomRadioGroup,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: CustomRadioGroupProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <CustomRadioGroup {...args} register={methods.register} errors={{}} />
    </FormProvider>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    name: "gender",
    label: "Select Gender",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
};
