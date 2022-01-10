import { useState } from "react";
import { commonFormReducer } from "./FormDataUtils";
import { useStateValue } from "./StateProvider";

export const useFormControls = () => {
  const [{ selectedCountry }] = useStateValue();
  const initialFormattedFormControlData = commonFormReducer(selectedCountry);
  console.log(initialFormattedFormControlData);
  const [values, setValues] = useState(initialFormattedFormControlData);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";

    if ("lastName" in fieldValues) {
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";
    }

    if ("countryOfWork" in fieldValues)
      temp.countryOfWork = fieldValues.countryOfWork
        ? ""
        : "This field is required.";

    if ("maritalStatus" in fieldValues)
      temp.maritalStatus = fieldValues.maritalStatus
        ? ""
        : "This field is required.";

    if ("numberOfChildren" in fieldValues)
      temp.numberOfChildren = fieldValues.numberOfChildren
        ? ""
        : "This field is required.";

    if ("socialInsuranceNumber" in fieldValues)
      temp.socialInsuranceNumber = fieldValues.socialInsuranceNumber
        ? ""
        : "This field is required.";

    if ("workingHours" in fieldValues)
      temp.workingHours = fieldValues.workingHours
        ? ""
        : "This field is required.";

    if ("holidayAllowance" in fieldValues)
      temp.holidayAllowance = fieldValues.holidayAllowance
        ? ""
        : "This field is required.";

    setErrors({
      ...temp,
    });
  };

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const display = (obj) => {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    validate();
    if (formIsValid()) {
      console.log("values", display(values));
      alert("You've posted your form!");
    }
  };
  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.firstName &&
      fieldValues.lastName &&
      fieldValues.countryOfWork &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors,
  };
};
