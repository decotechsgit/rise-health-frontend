import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import LabeledCheckbox, { IProps } from "./LabeledCheckBox.input";


const meta: Meta<typeof LabeledCheckbox> = {
  title: "Components/Shared/Form/LabeledCheckbox",
  component: LabeledCheckbox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: IProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <LabeledCheckbox {...args} register={methods.register} errors={{}} />
    </FormProvider>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    name: "agree",
    label: "I agree to the terms and conditions",
  },
};
