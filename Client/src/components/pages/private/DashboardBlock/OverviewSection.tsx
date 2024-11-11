import { CardOneMolecules } from "@/components";
import React, { useEffect } from "react";
import { Skeleton } from "@mui/material";
import { useLoading } from "@/core/hooks";

const OverviewSection = () => {
  const tickets = [
    { count: 36, label: "Current Balance", colorIndex: 0 },
    { count: 9, label: "Monthly Income", colorIndex: 1 },
    { count: 18, label: "Total Expenses", colorIndex: 3 },
  ];
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mb-5 grid grid-cols-1 gap-4 items-center md:grid-cols-2 lg:grid-cols-3">
      {tickets.map((ticket, index) => (
        <CardOneMolecules
          key={index}
          count={ticket.count}
          label={ticket.label}
          colorIndex={ticket.colorIndex}
        />
      ))}
    </section>
  );
};

export default OverviewSection;
