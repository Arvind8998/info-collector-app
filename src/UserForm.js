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
import { CountryInputFields } from "./FormDataUtils";
import { useStateValue } from "./StateProvider";

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
  const [{ selectedCountry }, dispatch] = useStateValue();
  const handleCountryUpdate = (e) => {
    dispatch({
      type: "SET_COUNTRY",
      selectedCountry: e.target.value,
    });
  };

  const customElement = (elementName) => {
    switch (elementName) {
      case "DateSelector":
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns} key="#DatePicker">
            <DatePicker
              label="Date of Birth"
              value={dateSelected}
              onChange={(date) => {
                setDate(date);
                handleInputValue({
                  target: {
                    name: "dob",
                    value: date,
                  },
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        );
      default:
        return "";
    }
  };

  const { handleInputValue, handleFormSubmit, errors } = useFormControls();

  const [dateSelected, setDate] = useState(null);
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
              labelId="country-select"
              id="demo-simple-select"
              data-testid="test_country_ele"
              value={selectedCountry}
              label="Country"
              onChange={(e) => {
                handleCountryUpdate(e);
              }}
            >
              <MenuItem value={"Spain"}>Spain</MenuItem>
              <MenuItem value={"Ghana"}>Ghana</MenuItem>
              <MenuItem value={"Brazil"}>Brazil</MenuItem>
            </Select>
          </FormControl>

          {CountryInputFields[selectedCountry]?.map(
            (inputFieldValue, index) => {
              return inputFieldValue.customElement ? (
                customElement(inputFieldValue.customElement)
              ) : (
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
            }
          )}

          <Button type="submit" variant="outlined" startIcon={<SendIcon />}>
            Submit
          </Button>
        </Item>
      </Box>
    </form>
  );
};

export default UserForm;
