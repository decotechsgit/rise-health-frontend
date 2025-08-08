import type { Meta, StoryObj } from "@storybook/nextjs";

import CustomFileDropdown from "./Custom.dropdown";

const meta: Meta<typeof CustomFileDropdown> = {
  title: "Components/Shared/Form/CustomFileDropdown",
  component: CustomFileDropdown,
  tags: ["autodocs"],
  argTypes: {
    files: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const files = [
  "https://images.unsplash.com/photo-1602679042292-0679c2663d07?q=80&w=1935&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1681506669115-cb6b2d30dbc7?q=80&w=2070&auto=format&fit=crop",
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  "https://www.africau.edu/images/default/sample.pdf",
];

export const Default: Story = {
  args: {
    files,
  },
};
