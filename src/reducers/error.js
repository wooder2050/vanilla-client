const initialState = {
  inputError: null
};

function errorReducers(state = initialState, action) {
  switch (action.type) {
    case "MYPAGEINPUT_ERROR":
      console.log("MYPAGEINPUT_ERROR ", action);
      return Object.assign(
        { ...state },
        {
          inputError: "Please be sure to enter all items."
        }
      );
    case "MYPAGEINPUT_ERROR_CLEAR":
      console.log("MYPAGEINPUT_ERROR_CLEAR ", action);
      return Object.assign(
        { ...state },
        {
          inputError: null
        }
      );

    default:
      return state;
  }
}

export default errorReducers;
