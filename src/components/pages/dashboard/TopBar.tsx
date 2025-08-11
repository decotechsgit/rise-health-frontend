"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import { logoutAction } from "@/actions/auth.actions";
import { getUserName } from "@/actions/user.actions";
import Dropdown from "@components/shared/dropdown/Dropdown";
import NotificationsPopup from "@components/shared/notification/NotificationsPopup";
import TextElement from "@components/shared/typography/TextElement.typo";

const handleClick = async () => {
  await logoutAction();
};

const notifications = [
  {
    id: 1,
    title: "New Update: Policy Change - Incident Reporting",
    description: "A new policy version has been released.",
    date: "Apr 15, 2025",
  },
  {
    id: 2,
    title: "Updated Form: Staff Onboarding Checklist",
    description: "Form updated with new compliance checks.",
    date: "Apr 15, 2025",
  },
  {
    id: 3,
    title: "Legislation Update: NDIS Worker Screening",
    description:
      "Changes reflect updated requirements from the NDIS Commission.",
    date: "Apr 15, 2025",
  },
];

const dropDownOptions = [
  {
    itemName: "Profile Settings",
    itemLink: "#",
  },
  {
    itemName: "Logout",
    itemAction: handleClick,
  },
];

const TopBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [nameInitials, setNameInitials] = useState<string>("");

  useEffect(() => {
    const fetchSession = async () => {
      const username = await getUserName();

      if (username && username.trim()) {
        const words = username.trim().split(/\s+/);
        let initials = "";
        if (words.length > 1) {
          initials = `${words[0][0]}${words[1][0]}`;
        } else {
          initials = words[0].substring(0, 2);
        }
        setNameInitials(initials.toUpperCase());
      } else {
        setNameInitials("");
      }
    };

    fetchSession();
  }, []);

  const iconButtonStyle =
    "relative w-[60px] h-[60px] flex items-center justify-center";
  return (
    <header className="bg-[var(--color-background-page-bg)] shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Mobile Layout */}
        <div className="relative flex w-full items-center justify-between sm:hidden">
          <Image
            src="/Rise.svg"
            alt="Rise Logo"
            className="w-16"
            width={60}
            height={40}
          />
          <TextElement
            as="h2"
            className="absolute left-1/2 -translate-x-1/2 font-medium text-[var(--color-text-primary)]"
          >
            Policy & Compliance Auditor
          </TextElement>
          <button
            className="p-2"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="absolute top-10 right-0">
            {showDropdown && <Dropdown options={dropDownOptions} />}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden items-center gap-10 sm:flex">
          <Image
            src="/Rise.svg"
            alt="Rise Logo"
            className="w-20"
            width={80}
            height={60}
          />
          <TextElement
            as="h2"
            className="text-[30px] font-medium text-[var(--color-text-primary)]"
          >
            Policy & Compliance Auditor
          </TextElement>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center space-x-4 sm:flex">
          {/* Messages */}
          <button className={iconButtonStyle}>
            <Image
              src="/ic_message.svg"
              alt="Messages"
              className="w-12"
              width={60}
              height={60}
            />
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-message-notification-text)] text-xs text-white">
              <TextElement className="text-xs text-white">2</TextElement>
            </span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              className={iconButtonStyle}
              onClick={() => {
                setShowNotifications((prev) => !prev);
                if (showDropdown) setShowDropdown((prev) => !prev);
              }}
            >
              <Image
                src="/ic_notification.svg"
                alt="Notifications"
                className="w-12"
                width={60}
                height={60}
              />
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-notification-bg)] text-xs text-white">
                <TextElement className="text-xs text-white">
                  {notifications.length}
                </TextElement>
              </span>
            </button>
            <NotificationsPopup
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
              notifications={notifications}
            />
          </div>

          {/* User Initials */}
          <div>
            <div
              className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-[var(--color-compliance-green)]"
              onClick={() => {
                setShowDropdown((prev) => !prev);
                if (showNotifications) setShowNotifications((prev) => !prev);
              }}
            >
              <TextElement className="text-lg font-medium text-white">
                {nameInitials}
              </TextElement>
              <div
                className={`absolute mt-14 -ml-12 ${showDropdown ? "rotate-180" : ""}`}
              >
                <IoMdArrowDropdown />
              </div>
            </div>

            {/* dropdown */}
            {showDropdown && <Dropdown options={dropDownOptions} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
