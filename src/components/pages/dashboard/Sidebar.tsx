import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const menuItems = [
    { href: "/dashboard", icon: "/dashboard/ic_home.svg", alt: "Home" },
    {
      href: "/dashboard/users",
      icon: "/dashboard/ic_user.svg",
      alt: "Users",
      disabled: true,
    },
    {
      href: "/dashboard/shield",
      icon: "/dashboard/ic_sheild.svg",
      alt: "Shield",
      disabled: true,
    },
    {
      href: "/dashboard/write",
      icon: "/dashboard/ic_write.svg",
      alt: "Write",
      disabled: true,
    },
    {
      href: "/dashboard/calendar",
      icon: "/dashboard/ic_calendar.svg",
      alt: "Calendar",
      disabled: true,
    },
    {
      href: "/dashboard/settings",
      icon: "/dashboard/ic_setting.svg",
      alt: "Settings",
      disabled: true,
    },
  ];

  return (
    <aside className="flex h-full w-30 flex-col items-center justify-center bg-[#F1F4F8] px-4 shadow-sm">
      <nav className="space-y-8">
        {menuItems.slice(0, 5).map((item, index) => {
          if (item?.disabled) {
            return (
              <div
                key={item.href}
                className="flex h-10 w-10 cursor-not-allowed flex-col items-center justify-center opacity-50"
              >
                <Image src={item.icon} alt={item.alt} width={24} height={24} />
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-10 w-10 flex-col items-center justify-center ${
                index === 0 ? "rounded-full bg-[#2D2F32]" : ""
              }`}
            >
              <Image
                src={item.icon}
                alt={item.alt}
                width={24}
                height={24}
                className={index === 0 ? "brightness-0 invert" : ""}
              />
            </Link>
          );
        })}
      </nav>

      {/* <Link
        href="/dashboard/settings"
        className="mt-8 flex items-center justify-center"
      >
        <Image
          src="/dashboard/ic_setting.svg"
          alt="Settings"
          width={24}
          height={24}
        />
      </Link> */}

      <div className="mt-8 flex h-10 w-10 cursor-not-allowed flex-col items-center justify-center opacity-50">
        <Image
          src="/dashboard/ic_setting.svg"
          alt="Settings"
          width={24}
          height={24}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
