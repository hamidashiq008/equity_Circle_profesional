import React from "react";
import EditJobSalary from "./EditJobSalary";
import EditJobThirdStep from "./EditJobThirdStep";
import EditJob from "./EditJob";

const EditJobAllComponet = () => {
  return (
    <>
    {localStorage.getItem("job") === "1" ? (
      <EditJob />
    ) : localStorage.getItem("job2") === "2" ? (
      <EditJobSalary />
    ) : localStorage.getItem("job3") === "3" ? (
      <EditJobThirdStep />
    ) : null}
  </>
  
  );
};

export default EditJobAllComponet;
