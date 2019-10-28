const initialState = {
  inputError: null,
  emailError: null,
  pwdError: null,
  register_error: null,
  searchError: null,
  uploadInputError: null,
  uploadDetailInputError: null
};

function errorReducers(state = initialState, action) {
  switch (action.type) {
    case "MYPAGEINPUT_ERROR":
      return Object.assign(
        { ...state },
        {
          inputError: "Please be sure to enter all items."
        }
      );
    case "MYPAGEINPUT_ERROR_CLEAR":
      return Object.assign(
        { ...state },
        {
          inputError: null
        }
      );
    case "INPUT_ERROR":
      return Object.assign(
        { ...state },
        {
          emailError: action.emailError,
          pwdError: action.pwdError
        }
      );
    case "REGISTER_INPUT_THROW_ERROR_FORM_SERVER":
      return Object.assign(
        { ...state },
        {
          register_error: action.error
        }
      );
    case "SEARCH_ERROR":
      return Object.assign(
        { ...state },
        {
          searchError: action.searchError
        }
      );
    case "UPLOAD_INPUT_ERROR":
      return Object.assign(
        { ...state },
        {
          uploadInputError: action.error
        }
      );
    case "POSTING_INPUT_ERROR":
      return Object.assign(
        { ...state },
        {
          uploadDetailInputError: action.error
        }
      );
    default:
      return state;
  }
}

export default errorReducers;
