export const initialState = {
  selectedCountry: "Brazil",
};

export const actionTypes = {
  SET_COUNTRY: "SET_COUNTRY",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_COUNTRY:
      return {
        ...state,
        selectedCountry: action.selectedCountry,
      };
    default:
      return state;
  }
};

export default reducer;
