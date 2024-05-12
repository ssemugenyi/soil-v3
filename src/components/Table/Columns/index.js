// id: "1000-0",
//   productCode: "f230fh0g3",
//   date: "2020-09-13",
//   amount: 65,
//   quantity: 1,
//   customer: "David James",
//   status: "PENDING",

import { get } from "firebase/database";
import {
  fertilizerCalculation,
  getRecommendation,
  kFertilizerCalculation,
  nFertilizerCalculation,
  pFertilizerCalculation,
} from "../../../helpers/helpers";

export const RECOMMENDATION_COLUMNS = [
  {
    Header: "Date",
    accessor: "ts",
    Cell: ({ value }) => {
      return new Date(value * 1000).toLocaleDateString();
    },
    style: { alignText: "center" },
  },
  {
    Header: "Nitrogen",
    accessor: "Nitrogen",
  },

  {
    Header: "Phosphorus",
    accessor: "Phosphorus",
    style: { textAlign: "center" },
  },

  {
    Header: "Potassium",
    accessor: "Potassium",
  },

  {
    Header: "Crop",
    accessor: "crop",
    Cell: ({ row }) => {
      const { recommendation } = getRecommendation(row.original);

      return recommendation.length > 0 ? (
        recommendation.map((crop) => (
          <span className="rounded-full bg-primary p-1 text-white text-nowrap m-0.5 font-medium ">
            {crop}
          </span>
        ))
      ) : (
        <p>No recommendation</p>
      );
    },
  },
];

// Nitrogen: 421.12;
// PhoneNumber: "0705438524";
// Phosphorus: 8.96;
// Potassium: 13.44;
// kCritical: 25;
// nCritical: 10;
// name: "GROUND NUTS";
// pCritical: 15;
// pH: 13;
// ts: 1715513876;

export const FERTILIZER_COLUMNS = [
  {
    Header: "Crop Name",
    accessor: "name",
  },
  {
    Header: "Nitrogen",
    accessor: "Nitrogen",
  },
  {
    Header: "Phosphorus",
    accessor: "Phosphorus",
  },
  {
    Header: "Potassium",
    accessor: "Potassium",
  },
  {
    Header: "N-required",
    Cell: ({ row }) => {
      const { nCritical, Nitrogen } = row.original;

      return nFertilizerCalculation(Nitrogen, nCritical);
    },
  },
  {
    Header: "P-required",
    Cell: ({ row }) => {
      const { Phosphorus, pCritical } = row.original;

      return pFertilizerCalculation(Phosphorus, pCritical);
    },
  },
  {
    Header: "K-required",
    Cell: ({ row }) => {
      const { Potassium, kCritical } = row.original;

      return kFertilizerCalculation(
        Potassium,

        kCritical
      );
    },
  },
];
export const SOIL_DATA = [
  {
    nitrogen: 35,
    potassium: 15,
    phosphorus: 20,
    ph: 6.5,
    crop: "Maize",

    date: 1714060800,
  },
  {
    nitrogen: 40,
    potassium: 18,
    phosphorus: 22,
    ph: 6.8,
    date: 1714064400,
  },
  {
    nitrogen: 30,
    potassium: 14,
    phosphorus: 19,
    ph: 6.2,
    date: 1714068000,
  },
  {
    nitrogen: 28,
    potassium: 20,
    phosphorus: 24,
    ph: 6.7,
    date: 1714071600,
  },
  {
    nitrogen: 38,
    potassium: 17,
    phosphorus: 23,
    ph: 7.0,
    date: 1714075200,
  },
  {
    nitrogen: 32,
    potassium: 16,
    phosphorus: 21,
    ph: 6.6,
    date: 1714078800,
  },
  {
    nitrogen: 34,
    potassium: 19,
    phosphorus: 25,
    ph: 6.4,
    date: 1714082400,
  },
  {
    nitrogen: 31,
    potassium: 15,
    phosphorus: 22,
    ph: 6.3,
    date: 1714086000,
  },
  {
    nitrogen: 36,
    potassium: 21,
    phosphorus: 27,
    ph: 6.9,
    date: 1714089600,
  },
  {
    nitrogen: 29,
    potassium: 18,
    phosphorus: 20,
    ph: 6.5,
    date: 1714093200,
  },
];
