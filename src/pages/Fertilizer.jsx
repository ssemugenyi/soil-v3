import React, { useEffect, useState } from "react";
import CSVReader from "react-csv-reader";

import { getDatabase, onValue, ref, set } from "firebase/database";
import { RECOMMENDATION_COLUMNS } from "../components/Table/Columns";
import GGTable from "../components/Table/GGTable.tsx";

const Fertilizer = () => {
  const date = new Date();
  const time = date.getTime();
  const [soil, setSoil] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "uploads/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setSoil([...Object.values(data)]);
    });
  }, []);

  const phone = localStorage.getItem("phone");
  const userData = soil.filter((data) => data.PhoneNumber === phone);

  return (
    <>
      <div className="my-14">
        <h3 className="font-semibold text-md mb-2">Upload Data</h3>
        <CSVReader
          onFileLoaded={(data) => {
            var userList = [];
            for (var i = 0; i < data.length - 3; i++) {
              const ts = data[i + 1][0];
              const Nitrogen = data[i + 1][1];
              const Phosphorus = data[i + 1][2];
              const Potassium = data[i + 1][3];
              const pH = data[i + 1][4];
              // const PhoneNumber = data[i + 1][3];
              const newUser = {
                ts: ts,
                Nitrogen: Nitrogen,
                Phosphorus: Phosphorus,
                Potassium: Potassium,
                pH: pH,
                PhoneNumber: phone,
              };
              userList.push(newUser);

              const db = getDatabase();
              set(ref(db, `uploads/upload-${phone}-${time}-${i}`), newUser);
            }
          }}
        />
      </div>
      <div>
        <h3 className="font-semibold text-md">Recommendations</h3>
        <p>Data will be automatically updated on every upload</p>
        <div>
          <GGTable
            data={userData || []}
            columns={RECOMMENDATION_COLUMNS}
            searchInputPlaceholder="Search.."
          />
        </div>
      </div>
    </>
  );
};

export default Fertilizer;
