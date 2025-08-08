"use client";

import { logoutAction } from "@/actions/auth.actions";
import TextElement from "@components/shared/typography/TextElement.typo";

const Error = () => {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--page-bg)] px-4">
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl bg-[var(--background)] p-8 shadow-lg">
        <svg
          width="64"
          height="64"
          fill="none"
          viewBox="0 0 24 24"
          className="mb-4 text-[var(--danger)]"
        >
          <circle cx="12" cy="12" r="10" fill="var(--danger-bg)" />
          <path
            d="M15 9l-6 6M9 9l6 6"
            stroke="var(--error-icon)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <TextElement className="mb-2 text-2xl font-bold text-[var(--error-text)]">
          Oops! Something went wrong.
        </TextElement>
        <TextElement className="mb-6 text-center text-gray-600">
          An unexpected error has occurred. Please try refreshing the page, or
          contact support if the problem persists.
        </TextElement>
        <div className="mt-2 flex flex-row gap-3">
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-[var(--button-cancel-bg)] px-6 py-2 font-semibold shadow transition hover:bg-gray-300"
          >
            <TextElement as="span">Refresh Page</TextElement>
          </button>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-[var(--color-notification-bg)] px-6 py-2 font-semibold text-white shadow transition hover:bg-[var(--danger)]"
          >
            <TextElement as="span" className="text-white">
              Logout
            </TextElement>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
