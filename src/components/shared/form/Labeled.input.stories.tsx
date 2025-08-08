import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import LabeledInput, { ILabeledInputProps } from "./Labeled.input";


const meta: Meta<typeof LabeledInput> = {
  title: "Components/Shared/Form/LabeledInput",
  component: LabeledInput,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "text" },
    label: { control: "text" },
    name: { control: "text" },
    placeHolder: { control: "text" },
    defaultValue: { control: "text" },
    className: { control: "text" },
    labelClassName: { control: "text" },
    containerClassName: { control: "text" },
    showErrors: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: ILabeledInputProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <LabeledInput {...args} register={methods.register} errors={{}} />
    </FormProvider>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeHolder: "Enter your full name",
    defaultValue: "",
    showErrors: true,
  },
};

export const Password: Story = {
  render: Template,
  args: {
    name: "password",
    label: "Password",
    type: "password",
    placeHolder: "Enter your password",
    defaultValue: "",
    showErrors: true,
  },
};
