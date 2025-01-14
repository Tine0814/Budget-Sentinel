import { useLoading } from "@/core/hooks";
import { NavBarProps } from "@/core/types";
import React, { useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { Skeleton } from "@mui/material"; // Assuming you're using Material-UI

const OrganismsNavBar = (props: NavBarProps) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <nav className="w-full h-16 p-3 pt-5">
        <div className="flex justify-between">
          <Skeleton variant="rectangular" width={150} height={30} />
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full min-h-16 p-3 pt-5 text-primary-text-light dark:text-primary-text-dark transition-all duration-300 ease-in-out">
      <div className="flex justify-between">
        <div className="flex items-center">
          <button onClick={props.toggleSidebar}>
            <MdMenu className="text-primary-text-light dark:text-primary-text-dark text-[25px] flex lg:hidden" />
          </button>
          {props.pageTitle ? (
            <h1 className="font-bold text-2xl">
              My{" "}
              <span className="text-primary-color-light dark:text-primary-color-dark">
                {props.pageTitle}
              </span>
            </h1>
          ) : (
            <h1 className="font-bold text-2xl flex flex-col">
              Hello Dastine !!
              <span className="text-sm text-secondary-text-light dark:text-secondary-text-dark">
                Welcome Back
              </span>
            </h1>
          )}
        </div>
        <button onClick={props.toggleCard}>
          <MdMenu className="text-primary-text-light dark:text-primary-text-dark text-[25px] flex lg:hidden" />
        </button>
      </div>
    </nav>
  );
};

export default OrganismsNavBar;
