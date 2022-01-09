import React from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormControls } from "./UserFormControls";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

const inputFieldValues = [
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
    name: "maritalStatus",
    label: "Marital Status",
    id: "#maritalStatus",
  },
  {
    name: "socialInsuranceNumber",
    label: "Social insurance number",
    id: "#SocialInsuranceNumber",
  },
  {
    name: "workingHours",
    label: "Working Hours",
    id: "#WorkingHours",
  },
  {
    name: "numberOfChildren",
    label: "Number Of Children",
    id: "#numberOfChildren",
  },
];

const Item = (props) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        color: "white",
        p: 1,
        m: 1,
        borderRadius: 1,
        textAlign: "center",
        fontSize: "1rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
};

const UserForm = () => {
  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls();
  const [dateSelected, setDate] = useState(null);
  const [selectedCountry, setCountry] = useState("Brazil");
  return (
    <form mt={100} onSubmit={handleFormSubmit}>
      <Box sx={{ width: "97%", ml: 2.5, mt: 10 }}>
        <Item
          sx={{
            "& .MuiTextField-root": { mb: 2, width: "30ch" },
            width: "30ch",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCountry}
              label="Country"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              <MenuItem value={"Spain"}>Spain</MenuItem>
              <MenuItem value={"Ghana"}>Ghana</MenuItem>
              <MenuItem value={"Brazil"}>Brazil</MenuItem>
            </Select>
          </FormControl>

          {inputFieldValues.map((inputFieldValue, index) => {
            if (
              selectedCountry !== "Ghana" &&
              (inputFieldValue.name === "numberOfChildren" ||
                (selectedCountry !== "Spain" &&
                  inputFieldValue.name === "maritalStatus"))
            ) {
              return "";
            } else if (
              selectedCountry !== "Spain" &&
              ((selectedCountry !== "Ghana" &&
                inputFieldValue.name === "maritalStatus") ||
                inputFieldValue.name === "socialInsuranceNumber")
            ) {
              return "";
            }
            if (
              selectedCountry !== "Brazil" &&
              inputFieldValue.name === "workingHours"
            ) {
              return "";
            }
            return (
              <TextField
                key={index}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                name={inputFieldValue.name}
                label={inputFieldValue.label}
                multiline={inputFieldValue.multiline ?? false}
                rows={inputFieldValue.rows ?? 1}
                autoComplete="none"
                {...(errors[inputFieldValue.name] && {
                  error: true,
                  helperText: errors[inputFieldValue.name],
                })}
              />
            );
          })}

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Birth"
              value={dateSelected}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button type="submit" variant="outlined" startIcon={<SendIcon />}>
            Submit
          </Button>
        </Item>
      </Box>
    </form>
  );
};

export default UserForm;
