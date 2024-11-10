import { mirrorPic } from "@/assets";
import { AtomAtmCard } from "@/components/atoms";
import { useLoading } from "@/core/hooks";
import { BaseToggleProps } from "@/core/types";
import { Avatar, Skeleton } from "@mui/material"; // Import Skeleton for loading state
import React, { useState, useEffect } from "react";
import { GiExpense, GiPiggyBank } from "react-icons/gi";
import { IoMdAddCircle } from "react-icons/io";

export default function OrganismsATMCard(props: BaseToggleProps) {
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 2000); // Simulated loading time; adjust as needed

    return () => clearTimeout(timer);
  }, []);

  const transferTypes = [
    { icon: <GiPiggyBank />, label: "Total Savings", amount: "$12000" },
    { icon: <GiExpense />, label: "Avarage Expenses", amount: "$45000" },
    { icon: <GiPiggyBank />, label: "Avarage Savings", amount: "$60000" },
  ];

  if (isLoading) {
    return (
      <aside className="fixed overflow-y-auto overflow-x-hidden lg:overflow-hidden p-5 w-[300px] lg:w-[400px] inset-y-0 right-0 z-50 bg-main-background-dark dark:bg-secondary-background-dark shadow-md transform flex flex-col justify-between transition-all duration-300 ease-in-out lg:translate-y-0 lg:inset-0 lg:static">
        <div>
          <div className="flex gap-3 items-center mb-10">
            <Skeleton variant="circular" width={56} height={56} />
            <div className="flex flex-col font-bold">
              <Skeleton variant="text" width={120} />
              <Skeleton variant="text" width={150} />
            </div>
          </div>
          <div className="mt-5 relative">
            <div className="flex justify-between items-center mb-10">
              <Skeleton variant="text" width={100} />
              <Skeleton variant="circular" width={40} height={40} />
            </div>
            <Skeleton variant="rectangular" width="100%" height={270} />
          </div>
          <div className="mt-5">
            <div className="p-6 rounded-xl max-w-md w-full">
              <Skeleton variant="text" width={100} />
              <div className="space-y-4">
                {transferTypes.map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Skeleton variant="circular" width={100} height={100} />
                    <div className="flex-1">
                      <Skeleton variant="text" width={100} />
                      <Skeleton variant="text" width={100} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`fixed overflow-y-auto overflow-x-hidden lg:overflow-hidden p-5 w-[300px] lg:w-[400px] text-primary-text-dark dark:text-primary-text-dark inset-y-0 right-0 z-50 bg-main-background-dark dark:bg-secondary-background-dark shadow-md transform flex flex-col justify-between ${
        props.isOpenCard ? "translate-y-0" : "-translate-y-full"
      } transition-all duration-300 ease-in-out lg:translate-y-0 lg:inset-0 lg:static `}
    >
      <div>
        <div className="flex gap-3 items-center mb-10">
          <Avatar
            alt="Profile"
            src={mirrorPic.src}
            sx={{ width: 56, height: 56 }}
          />
          <h1 className="flex flex-col font-bold">
            Dastine Jhay{" "}
            <span className="text-sm font-normal text-hovered-text-light">
              Djhay@gmail.com
            </span>
          </h1>
        </div>
        <div className="mt-5 relative">
          <div className="flex justify-between items-center mb-10">
            <h1 className="font-bold text-xl">Your Card</h1>
            <button
              onClick={props.onClick}
              className="transition-all duration-300 hover:scale-125 group"
            >
              <IoMdAddCircle className="text-[40px] text-gray-400 group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
            </button>
          </div>
          <AtomAtmCard />
          <div className="absolute h-[150px] w-[150px] rounded-full bg-[#ff5656] shadow-md top-12 -left-4 -z-10"></div>
          <div className="absolute h-[90px] w-[90px] rounded-full bg-[#fcff56] shadow-md -bottom-5 -right-6 -z-10"></div>
        </div>
        <div className="mt-5">
          <div className="p-6 rounded-xl max-w-md w-full">
            <h2 className=" text-xl font-semibold mb-4">Amount Transfer</h2>

            <div className="space-y-4">
              {transferTypes.map((transfer, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="p-5 rounded-full border-4 border-r-primary-color-light">
                    <div className="text-[40px]">{transfer.icon}</div>
                  </div>
                  <div className="flex-1">
                    <div className=" text-sm">{transfer.label}</div>
                    <div className=" font-semibold">{transfer.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
