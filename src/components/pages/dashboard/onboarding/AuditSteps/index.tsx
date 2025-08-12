import React, { useState } from "react";
import Step1 from "./Step1";
import BookAppointment from "./BookAppointment";

const AuditStep = () => {
  const [step, setStep] = useState<number>(1);
  return step === 1 ? (
    <Step1 setStep={setStep} />
  ) : step === 2 ? (
    <BookAppointment />
  ) : (
    ""
  );
};

export default AuditStep;
