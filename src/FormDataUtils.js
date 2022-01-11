export const commonFormFields = () => {
  return [
    {
      name: "firstName",
      label: "First Name",
      id: "#FirstName",
    },
    {
      name: "lastName",
      label: "Last Name",
      id: "#LastName",
    },
    {
      name: "countryOfWork",
      label: "Country Of Work",
      id: "#CountryOfWork",
    },
    {
      name: "holidayAllowance",
      label: "Holiday Allowance",
      id: "#holidayAllowance",
    },
    {
      name: "DateOfBirth",
      label: "Date Of Birth",
      id: "#DateOfBirth",
      customElement: "DateSelector",
    },
  ];
};

export const CountryInputFields = {
  Spain: [
    ...commonFormFields(),
    {
      name: "maritalStatus",
      label: "Marital Status",
      id: "#maritalStatus",
    },
    {
      name: "socialInsuranceNumber",
      label: "Social insurance number",
      id: "#SocialInsuranceNumber",
    },
  ],

  Ghana: [
    ...commonFormFields(),
    {
      name: "maritalStatus",
      label: "Marital Status",
      id: "#maritalStatus",
    },
    {
      name: "numberOfChildren",
      label: "Number Of Children",
      id: "#numberOfChildren",
    },
  ],

  Brazil: [
    ...commonFormFields(),
    {
      name: "workingHours",
      label: "Working Hours",
      id: "#WorkingHours",
    },
  ],
};

export const commonFormReducer = (selectedCountry = "Brazil") => {
  const mergedFieldsData = [
    ...commonFormFields(),
    ...CountryInputFields[selectedCountry],
  ];
  const commonInitialFormData = {};
  mergedFieldsData.forEach((el) => {
    commonInitialFormData[el.name] = null;
  });
  return commonInitialFormData;
};

export const resetFormData = (selectedCountry) => {
  return [...commonFormFields(), ...CountryInputFields[selectedCountry]];
};
