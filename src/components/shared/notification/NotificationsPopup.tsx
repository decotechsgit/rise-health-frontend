import Image from "next/image";

import TextElement from "../typography/TextElement.typo";

interface Notification {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface NotificationsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const NotificationsPopup = ({
  isOpen,
  onClose,
  notifications,
}: NotificationsPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg bg-white shadow-lg">
      <div className="flex items-center justify-between p-4">
        <TextElement className="font-medium">Notifications</TextElement>
        <button
          className="text-sm text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-sm text-gray-500">Last 7 days</span>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Mark all as read
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto border-b">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                <Image
                  src="/Rise.svg"
                  alt="Notification Icon"
                  width={20}
                  height={20}
                />
              </div>
              <div>
                <h4 className="text-sm font-medium">{notification.title}</h4>
                <p className="mt-1 text-sm text-gray-600">
                  {notification.description}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  {notification.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 text-center">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsPopup;
