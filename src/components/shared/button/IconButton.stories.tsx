import type { Meta, StoryObj } from "@storybook/nextjs";
import { BsFillEyeFill } from "react-icons/bs";
import {
  FaDownload,
  FaEdit,
  FaHeart,
  FaHome,
  FaPlus,
  FaSave,
  FaSearch,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { MdNotifications, MdOutlineInfo } from "react-icons/md";

import IconButton from "./index";

const meta: Meta<typeof IconButton> = {
  title: "Components/Shared/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component that supports icons, loading states, and various styling options. Built with Tailwind CSS and supports React Icons.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The text displayed on the button",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the button container",
    },
    btnClassName: {
      control: "text",
      description: "Additional CSS classes for the button text",
    },
    iconColor: {
      control: "text",
      description: "CSS class for icon color (defaults to text-[#F9C85F])",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    isLoading: {
      control: "boolean",
      description: "Whether to show loading spinner",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "HTML button type",
    },
    Icon: {
      control: false,
      description: "React Icon component to display",
    },
    handleOnClick: {
      action: "clicked",
      description: "Function called when button is clicked",
    },
  },
  args: {
    title: "Button Text",
    disabled: false,
    isLoading: false,
    type: "button",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    title: "Default Button",
  },
};

// With Icon
export const WithIcon: Story = {
  args: {
    title: "Save Changes",
    Icon: FaSave,
    iconColor: "text-white",
  },
};

// Different Icons
export const WithUserIcon: Story = {
  args: {
    title: "User Profile",
    Icon: FaUser,
    iconColor: "text-blue-600",
  },
};

export const WithDownloadIcon: Story = {
  args: {
    title: "Download File",
    Icon: FaDownload,
    iconColor: "text-green-600",
  },
};

export const WithUploadIcon: Story = {
  args: {
    title: "Upload Document",
    Icon: IoMdCloudUpload,
    iconColor: "text-purple-600",
  },
};

// Loading State
export const Loading: Story = {
  args: {
    title: "Processing...",
    isLoading: true,
    Icon: FaSave,
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    title: "Disabled Button",
    disabled: true,
    Icon: FaEdit,
  },
};

// Different Button Types
export const SubmitButton: Story = {
  args: {
    title: "Submit Form",
    type: "submit",
    Icon: FaPlus,
    iconColor: "text-white",
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    title: "Custom Style",
    Icon: FaHeart,
    iconColor: "text-red-500",
    className: "bg-red-100 border-red-300 hover:bg-red-200",
    btnClassName: "text-red-700 font-bold",
  },
};

// Danger Button
export const DangerButton: Story = {
  args: {
    title: "Delete Item",
    Icon: FaTrash,
    iconColor: "text-white",
    className: "bg-red-500 border-red-500 hover:bg-red-600",
    btnClassName: "text-white",
  },
};

// Success Button
export const SuccessButton: Story = {
  args: {
    title: "Confirm Action",
    Icon: BsFillEyeFill,
    iconColor: "text-white",
    className: "bg-green-500 border-green-500 hover:bg-green-600",
    btnClassName: "text-white",
  },
};

// Info Button
export const InfoButton: Story = {
  args: {
    title: "More Information",
    Icon: MdOutlineInfo,
    iconColor: "text-white",
    className: "bg-blue-500 border-blue-500 hover:bg-blue-600",
    btnClassName: "text-white",
  },
};

// Small Button
export const SmallButton: Story = {
  args: {
    title: "Small",
    Icon: FaSearch,
    iconColor: "text-gray-600",
    className: "h-[35px] text-sm",
    btnClassName: "text-sm",
  },
};

// Large Button
export const LargeButton: Story = {
  args: {
    title: "Large Button",
    Icon: FaEdit,
    iconColor: "text-white",
    className: "h-[60px] text-lg px-8",
    btnClassName: "text-lg font-semibold",
  },
};

// Without Icon
export const WithoutIcon: Story = {
  args: {
    title: "Text Only Button",
  },
};

// Multiple Buttons Layout
export const MultipleButtons: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <IconButton
        title="Primary Action"
        Icon={FaPlus}
        iconColor="text-white"
        handleOnClick={() => console.log("Primary clicked")}
      />
      <IconButton
        title="Secondary Action"
        Icon={FaEdit}
        iconColor="text-blue-600"
        className="border-blue-300 bg-blue-100"
        btnClassName="text-blue-700"
        handleOnClick={() => console.log("Secondary clicked")}
      />
      <IconButton
        title="Danger Action"
        Icon={FaTrash}
        iconColor="text-white"
        className="border-red-500 bg-red-500"
        btnClassName="text-white"
        handleOnClick={() => console.log("Danger clicked")}
      />
      <IconButton
        title="Loading Action"
        Icon={FaSave}
        isLoading={true}
        handleOnClick={() => console.log("Loading clicked")}
      />
      <IconButton
        title="Disabled Action"
        Icon={FaHome}
        disabled={true}
        handleOnClick={() => console.log("Disabled clicked")}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example showing multiple button variations in a layout",
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  args: {
    title: "Click Me!",
    Icon: MdNotifications,
    iconColor: "text-orange-600",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive button that responds to clicks. Check the Actions panel to see click events.",
      },
    },
  },
};
