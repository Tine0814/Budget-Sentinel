import { CardOneMoleculesProps } from "@/core/types";
import React from "react";
import CountUp from "react-countup";

const colorStyles = [
  "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
  "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300",
  "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200",
  "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "bg-green-300 text-green-800 dark:bg-green-700 dark:text-green-300",
];

const CardOneMolecules = (props: CardOneMoleculesProps) => {
  const colorClass = colorStyles[props.colorIndex % colorStyles.length];
  return (
    // <div
    //   className={`font-bold rounded-md shadow-md h-[150px] flex flex-col items-center justify-center ${colorClass} transition-all duration-300 ease-in-out`}
    // >
    //   <span className="text-[50px]">
    //     <CountUp duration={3} end={Number(props.count)} />
    //   </span>
    //   {props.label}
    // </div>
    <div
      className={`rounded-lg shadow-md p-6 ${colorClass} dark:bg-main-background-dark`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">{props.label}</p>
          <div className="flex items-baseline flex-col">
            <span className="text-2xl font-semibold">
              $ <CountUp duration={3} end={Number(props.count)} />
            </span>
            <span className="text-sm font-medium text-emerald-500">+19%</span>
          </div>
        </div>
        <div className="w-[80px] h-[40px]">
          <svg
            className="w-full h-full"
            viewBox="0 0 80 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 38L4 36L8 34L12 35L16 32L20 30L24 31L28 28L32 25L36 26L40 23L44 20L48 22L52 19L56 16L60 18L64 15L68 12L72 14L76 11L80 8"
              stroke="rgb(16, 185, 129)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CardOneMolecules;
