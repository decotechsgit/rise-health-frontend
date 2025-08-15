import React, { useState } from "react";

import BookAppointment from "./BookAppointment";
import Step1 from "./Step1";

interface AuditStepProps {
  onboardingStep: Step;
}

const AuditStep = ({ onboardingStep }: AuditStepProps) => {
  const [step, setStep] = useState<number>(1);
  return step === 1 ? (
    <Step1 setStep={setStep} />
  ) : step === 2 ? (
    <BookAppointment setStep={setStep} onboardingStep={onboardingStep} />
  ) : (
    ""
  );
};

export default AuditStep;
