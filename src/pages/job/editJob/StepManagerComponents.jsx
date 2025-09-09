
import React, { useState } from "react";
import EditJob from "./EditJob";
import EditJobSalary from "./EditJobSalary";
import EditJobThirdStep from "./EditJobThirdStep";

const EditJobAllComponet = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <>
      {step === 1 && <EditJob nextStep={nextStep} />}
      {step === 2 && <EditJobSalary nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <EditJobThirdStep prevStep={prevStep} />}
    </>
  );
};

export default EditJobAllComponet;
