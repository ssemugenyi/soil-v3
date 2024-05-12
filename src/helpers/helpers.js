import { FaCheckCircle } from "react-icons/fa";

export const getRecommendation = (soilData) => {
  const recommendation = [];

  const test =
    soilData.Nitrogen >= 10 &&
    soilData.Nitrogen <= 20 &&
    soilData.Phosphorus >= 15 &&
    soilData.Phosphorus <= 40 &&
    soilData.Potassium >= 25 &&
    soilData.Potassium <= 40;
  console.log("test", test);

  if (
    soilData.Nitrogen >= 10 &&
    // soilData.Nitrogen <= 20 &&
    soilData.Phosphorus >= 15 &&
    // soilData.Phosphorus <= 40 &&
    soilData.Potassium >= 25
    // &&
    // soilData.Potassium <= 40
  ) {
    recommendation.push("Groundnut");
  }
  if (
    soilData.Nitrogen >= 100 &&
    // soilData.Nitrogen <= 200 &&
    soilData.Phosphorus >= 50 &&
    // soilData.Phosphorus <= 40 &&
    soilData.Potassium >= 60
    //  &&
    // soilData.Potassium <= 100
  ) {
    recommendation.push("Maize");
  }
  if (
    soilData.Nitrogen >= 10 &&
    // soilData.Nitrogen <= 20 &&
    soilData.Phosphorus >= 15 &&
    // soilData.Phosphorus <= 30 &&
    soilData.Potassium >= 25
    //  &&
    // soilData.Potassium <= 60
  ) {
    recommendation.push("Soya Beans");
  }
  if (
    soilData.Nitrogen >= 20 &&
    // soilData.Nitrogen <= 40 &&
    soilData.Phosphorus >= 10 &&
    // soilData.Phosphorus <= 20 &&
    soilData.Potassium >= 20
    // &&
    // soilData.Potassium <= 40
  ) {
    recommendation.push("Sim Sim");
  }

  return { recommendation };
};

const fertilizer = (value, fertilizerComposition) => {
  const convertedValue = value;
  if (convertedValue > fertilizerComposition) {
    return (
      fertilizerComposition +
      (convertedValue - fertilizerComposition)
    ).toPrecision(2);
  } else {
    return fertilizerComposition.toPrecision(4);
  }
};

export const pFertilizerCalculation = (phosphorusValue, pCritical) => {
  const BP_fertilizer = pCritical - phosphorusValue;

  if (BP_fertilizer < 0) {
    return <FaCheckCircle className="text-green-500 w-4 h-4" />;
  } else {
    return <p>{`P-TSP (kg): ${fertilizer(BP_fertilizer, 46)}`}</p>;
  }
};
export const nFertilizerCalculation = (nitrogenValue, nCritical) => {
  const BN_fertilizer = nCritical - nitrogenValue;

  if (BN_fertilizer < 0) {
    return <FaCheckCircle className="text-green-500 w-4 h-4" />;
  } else {
    return <p>{`N-DAP (kg) ${fertilizer(BN_fertilizer, 14)}`}</p>;
  }
};
export const kFertilizerCalculation = (potassiumValue, kCritical) => {
  const BK_fertilizer = kCritical - potassiumValue;

  if (BK_fertilizer < 0) {
    return <FaCheckCircle className="text-green-500 w-4 h-4" />;
  } else {
    return <p>{`K-NPK (kg): ${fertilizer(BK_fertilizer, 17)}`}</p>;
  }
};
