import { TextField, Button, Box } from "@mui/material";
import { useFormControls } from "./UserFormControls";

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
    name: "DOB",
    label: "Date Of Birth",
    id: "#DateOfWork",
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
  return (
    <form mt={100} onSubmit={handleFormSubmit}>
      <Box sx={{ width: "97%", ml: 2.5 }}>
        <Item
          sx={{ width: "20%", display: "flex", mb: 2, flexDirection: "column" }}
        >
          {inputFieldValues.map((inputFieldValue, index) => {
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
          <Button type="submit">Send Message</Button>
        </Item>
      </Box>
    </form>
  );
};

export default UserForm;
