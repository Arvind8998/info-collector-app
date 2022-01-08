import { useState } from "react";

const initialFormValues = {
  firstName: "",
  lastName: "",
  countryOfWork: "",
  dob: "",
  formSubmitted: false,
  success: false,
};

export const useFormControls = () => {
  // We'll update "values" as the form updates
  const [values, setValues] = useState(initialFormValues);
  // "errors" is used to check the form for errors
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";

    if ("lastName" in fieldValues) {
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";
      if (fieldValues.lastName)
        temp.lastName = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.lastName)
          ? ""
          : "Email is not valid.";
    }

    if ("countryOfWork" in fieldValues)
      temp.countryOfWork = fieldValues.countryOfWork
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    validate();
    if (formIsValid()) {
      console.log("values", values);
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
