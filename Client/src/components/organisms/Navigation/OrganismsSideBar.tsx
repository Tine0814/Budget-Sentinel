import Link from "next/link";
import React, { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdClose, MdHome, MdSettings } from "react-icons/md";
import { SidebarProps } from "@/core/types";
import { useAuth } from "@/core/context";
import { GiPayMoney } from "react-icons/gi";
import { MoleculeThemeToggleButton } from "@/components";
import { CiLogout } from "react-icons/ci";
import { LogoTwo } from "@/assets";
import Image from "next/image";

const OrganismsSideBar = (props: SidebarProps) => {
  const currentYear = new Date().getFullYear();
  const [activeNavItem, setActiveNavItem] = useState("");
  const router = useRouter();

  const { logoutUser } = useAuth();

  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <MdHome />,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: <GiPayMoney />,
    },
  ];

  const bottomNavItems = [
    {
      title: "Settings",
      icon: <MdSettings />,
      onClick: () => handleClick("Settings"),
    },
    {
      title: "Log out",
      icon: <CiLogout />,
      onClick: logoutUser,
    },
  ];

  useEffect(() => {
    const { pathname } = router;
    const activeItem = navItems.find((item) => item.url === pathname);
    if (activeItem) {
      setActiveNavItem(activeItem.title);
    }
  }, [router.pathname, navItems]);

  const handleClick = (title: SetStateAction<string>) => {
    setActiveNavItem(title);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside
      className={`fixed overflow-hidden w-56 pt-5 text-primary-text-light dark:text-primary-text-dark inset-y-0 left-0 z-50 bg-main-background-light dark:bg-main-background-dark shadow-md transform flex flex-col justify-between ${
        props.isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-300 ease-in-out lg:translate-x-0 lg:inset-0 lg:static `}
    >
      <div className="flex justify-end p-1 mb-5">
        <MoleculeThemeToggleButton />
      </div>
      <div className="flex items-center justify-center h-16 px-6 p-5">
        <Image src={LogoTwo} className="w-[80px]" alt="logo" />
        <button onClick={props.toggleSidebar} className="lg:hidden">
          <MdClose className="h-6 w-6 transition-colors duration-300" />
        </button>
      </div>

      <nav className="mt-6 flex-1">
        <ul className="space-y-2 ">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center w-full px-2 ${
                item.title === activeNavItem &&
                "border-r-4 border-primary-color-light dark:border-primary-color-dark"
              } `}
            >
              <Link
                href={item.url}
                className={`${
                  item.title === activeNavItem &&
                  " bg-hovered-text-light dark:bg-hovered-text-dark font-bold shadow-sm"
                } w-full flex items-center gap-3 py-2 px-4 rounded-full hover:bg-hovered-text-light hover:dark:bg-hovered-text-dark transition-colors duration-300`}
                onClick={() => handleClick(item.title)}
              >
                <span
                  className={`text-[25px] ${
                    item.title === activeNavItem && "text-primary-color-light"
                  }`}
                >
                  {item.icon}
                </span>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="">
        <ul className="space-y-2 ">
          {bottomNavItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center w-full px-2 ${
                item.title === activeNavItem &&
                "border-r-4 border-primary-color-light dark:border-primary-color-dark "
              } `}
            >
              <div
                className={`${
                  item.title === activeNavItem &&
                  " bg-hovered-text-light dark:bg-hovered-text-dark font-bold shadow-sm"
                } w-full flex items-center gap-3 py-2 px-4 rounded-full hover:bg-hovered-text-light hover:dark:bg-hovered-text-dark transition-colors duration-300 cursor-pointer`}
                onClick={item.onClick}
              >
                <span
                  className={`text-[25px] ${
                    item.title === activeNavItem && "text-primary-color-light"
                  }`}
                >
                  {item.icon}
                </span>
                {item.title}
              </div>
            </li>
          ))}
        </ul>
        <div className="px-4 py-2 mt-5">
          <a
            href="#"
            className="block text-center text-sm transition-colors duration-300"
          >
            © {currentYear} Dastine Bernardo
          </a>
        </div>
      </div>
    </aside>
  );
};

export default OrganismsSideBar;
