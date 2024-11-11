import React from "react";

export default function LatestTransactionSection() {
  const transactions = [
    {
      id: 1,
      name: "Amazon Prime",
      logo: "/placeholder.svg?height=40&width=40",
      date: "09 Feb 2022 at 10:40AM",
      amount: "-$50.00",
      status: "Success",
      isNegative: true,
    },
    {
      id: 2,
      name: "Isaac Newton",
      logo: "/placeholder.svg?height=40&width=40",
      date: "09 Feb 2022 at 10:40AM",
      amount: "+$95.00",
      status: "Failed",
      isNegative: false,
    },
    {
      id: 3,
      name: "Ruskin Bond",
      logo: "/placeholder.svg?height=40&width=40",
      date: "09 Feb 2022 at 10:40AM",
      amount: "+$46.00",
      status: "Pending",
      isNegative: false,
    },
    {
      id: 4,
      name: "Netflix",
      logo: "/placeholder.svg?height=40&width=40",
      date: "09 Feb 2022 at 10:40AM",
      amount: "+$46.00",
      status: "Success",
      isNegative: false,
    },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Success":
        return "text-emerald-600";
      case "Failed":
        return " text-red-600";
      case "Pending":
        return " text-yellow-600";
      default:
        return " text-gray-600";
    }
  };

  return (
    <div className="w-full bg-main-background-light dark:bg-main-secondarycard rounded-lg text-primary-text-light dark:text-primary-text-dark shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Latest Transaction</h2>
        <a href="#" className="text-blue-500 text-sm hover:underline">
          View All
        </a>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="grid grid-cols-4 p-2 py-2 px-4 rounded-full hover:bg-hovered-text-light hover:dark:bg-hovered-text-dark transition-colors w-full"
          >
            <div className="font-medium">{transaction.name}</div>
            <div className="flex items-center justify-center">
              <div className="text-sm">{transaction.date}</div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <span
                className={`font-medium ${
                  transaction.isNegative ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {transaction.amount}
              </span>
            </div>
            <div className="flex justify-end items-center">
              <div
                className={`rounded-full text-sm font-medium ${getStatusStyles(
                  transaction.status
                )}`}
              >
                {transaction.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
