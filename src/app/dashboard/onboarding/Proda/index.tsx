"use client";

import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

const Proda = () => {
  const [step, setStep] = useState<number>(1);
  return step === 1 ? (
    <Step1 setStep={setStep} />
  ) : step === 2 ? (
    <Step2 setStep={setStep} />
  ) : (
    ""
  );
};

export default Proda;
