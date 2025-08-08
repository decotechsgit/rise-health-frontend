import type { Meta, StoryObj } from "@storybook/nextjs";
import { FormProvider, useForm } from "react-hook-form";

import RoundedInput, { IRoundedInputProps } from "./Rounded.input";

const meta: Meta<typeof RoundedInput> = {
  title: "Components/Shared/Form/RoundedInput",
  component: RoundedInput,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    placeHolder: { control: "text" },
    className: { control: "text" },
    maxLength: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: IRoundedInputProps) => {
  const methods = useForm({ defaultValues: { digitOne: "" } });
  return (
    <FormProvider {...methods}>
      {/* @ts-expect-error - TODO: fix this */}
      <RoundedInput {...args} control={methods.control} errors={{}} />
    </FormProvider>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    name: "digitOne",
    placeHolder: "0",
    maxLength: 1,
  },
};
