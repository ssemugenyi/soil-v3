import React, { useEffect, useState } from "react";
import { DashSummary } from "../components/DashSummary";
import AreaChart from "../components/Chart";

import {
  FERTILIZER_COLUMNS,
  RECOMMENDATION_COLUMNS,
} from "../components/Table/Columns";
import GGTable from "../components/Table/GGTable.tsx";
import { SoilData } from "../components/Table/GGTable.tsx";
import { getDatabase, onValue, ref } from "firebase/database";
// import { getRecommendation } from "../helpers/helpers.js";

const Overview = () => {
  const [soil, setSoil] = useState<SoilData[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "newData/log");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setSoil([...Object.values(data)] as SoilData[]);
    });
  }, []);

  const phone = localStorage.getItem("phone");

  const userData = soil.filter((arr) => {
    const numArr = arr.PhoneNumber.split("");
    const newPhone =
      "+256" +
      numArr[1] +
      numArr[2] +
      numArr[3] +
      numArr[4] +
      numArr[5] +
      numArr[6] +
      numArr[7] +
      numArr[8] +
      numArr[9];

    return newPhone === phone;
  });

  const nitrogen = userData.map((arr) => arr.Nitrogen);
  const phosphorus = userData.map((arr) => arr.Phosphorus);
  const potassium = userData.map((arr) => arr.Potassium);
  const date = userData.map((arr) => {
    const date = new Date(arr.ts * 1000);
    return date.toLocaleDateString();
  });

  const crops = [
    { name: "GROUND NUTS", nCritical: 10, pCritical: 15, kCritical: 25 },
    { name: "SIM SIM", nCritical: 20, pCritical: 10, kCritical: 20 },
    { name: "MAIZE", nCritical: 100, pCritical: 50, kCritical: 60 },
    { name: "SOYA BEANS", nCritical: 10, pCritical: 15, kCritical: 25 },
  ];

  const lastEntry = userData[userData.length - 1];

  const cropsCombined = crops.map((crop) => {
    return { ...crop, ...lastEntry };
  });

  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-14 gap-3">
        <DashSummary
          item="Nitrogen"
          itemValue={nitrogen[nitrogen.length - 1] ?? 0}
          unit={"kg/Ha"}
        />
        <DashSummary
          item={"Phosphorus"}
          itemValue={phosphorus[phosphorus.length - 1] ?? 0}
          unit={"kg/Ha"}
        />
        <DashSummary
          item={"Potassium"}
          itemValue={phosphorus[potassium.length - 1] ?? 0}
          unit={"kg/Ha"}
        />
        {/* <DashSummary item={"pH"} itemValue={7} unit={""} /> */}
      </div>
      <div className="">
        <div className="">
          <h3 className="font-semibold text-lg text-md capitalize ">
            Soil Nutrients
          </h3>
          <AreaChart
            type={"line"}
            nitrogen={nitrogen}
            phosphorus={phosphorus}
            potassium={potassium}
            date={date}
          />
        </div>
        <div className="rounded-md bg-primary/20 p-4 my-8">
          <h3 className="font-semibold text-md capitalize ">
            Recommendation summary
          </h3>
          <div>
            <GGTable
              data={userData.length < 1 ? [] : cropsCombined}
              columns={FERTILIZER_COLUMNS}
              searchInputPlaceholder="Search.."
            />
          </div>
        </div>
        <div className="my-8">
          <h3 className="font-semibold text-lg text-md capitalize ">
            Recommendations
          </h3>
          <div>
            <GGTable
              data={userData || []}
              columns={RECOMMENDATION_COLUMNS}
              searchInputPlaceholder="Search.."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
