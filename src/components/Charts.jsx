import { Line } from "@ant-design/charts";
import React from "react";

import { PieChart } from "@mui/x-charts/PieChart";

const Charts = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((transaction) => {
    return {
      date: transaction.date,
      ammount: transaction.ammount,
    };
  });

  const config = {
    data: data,
    autoFit: true,
    xField: "date",
    yField: "ammount",
    seriesField: "type",
    forceFit: true,
  };

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type === "expense") {
      return {
        label: transaction.tag,
        value: transaction.ammount,
      };
    }
  });

  let newSpendings = [
    { value: 0, label: "Food" },
    { value: 0, label: "Education" },
    { value: 0, label: "Office" },
  ];

  spendingData.forEach((item) => {
    if (item.tag === "food") {
      newSpendings[0].value += item.ammount;
    } else if (item.tag === "education") {
      newSpendings[1].value += item.ammount;
    } else if (item.tag === "office") {
      newSpendings[2].value += item.ammount;
    }
  });

  let chart;

  return (
    <div className="flex-wrap my-10 flex justify-between items-center w-11/12 lg:gap-0 gap-5 mx-auto">
      <div className="w-full lg:w-[58%] p-8 rounded-lg shadow-own-uday flex flex-col gap-10 justify-center items-center">
        <h1 className="font-bold text-center">Your Analytics</h1>
        <Line {...config} onReady={(ci) => (chart = ci)} />
      </div>
      <div className="w-full lg:w-[40%] p-8 rounded-lg shadow-own-uday flex flex-col gap-10 justify-center items-center">
        <h1 className="font-bold">Your Spendings</h1>
        <PieChart
          series={[
            {
              data: newSpendings,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30 },
            },
          ]}
          config={{ ...config }}
          height={481}
          autoFit
        />
      </div>
    </div>
  );
};

export default Charts;
