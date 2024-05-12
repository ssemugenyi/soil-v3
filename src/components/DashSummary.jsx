import React from "react";

export const DashSummary = ({ item, itemValue, unit }) => {
  return (
    <div className="bg-primary/50 rounded-md p-4 flex justify-between flex-col min-h-[100px]">
      <h2 className="text-white font-bold font-inter text-sm">{item}</h2>
      <p className="font-bold text-md  font-inter">
        {itemValue} {unit}
      </p>
    </div>
  );
};
