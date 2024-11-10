import { CardOneMolecules } from "@/components";
import React, { useEffect } from "react";
import { Skeleton } from "@mui/material";
import { useLoading } from "@/core/hooks";

const OverviewSection = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const tickets = [
    { count: 36, label: "Current Balance", colorIndex: 0 },
    { count: 9, label: "Monthly Income", colorIndex: 1 },
    { count: 18, label: "Total Expenses", colorIndex: 3 },
  ];

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-3 grid grid-cols-1 gap-4 items-center md:grid-cols-2 lg:grid-cols-3">
      {isLoading
        ? tickets.map((_, index) => (
            <div key={index}>
              <Skeleton variant="rectangular" width="100%" height={150} />
            </div>
          ))
        : tickets.map((ticket, index) => (
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
