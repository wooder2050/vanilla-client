const initialState = {
  authenticated: false,
  loginPage: "login"
};

function loginReducers(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("LOGIN_SUCCESS ", action);
      return Object.assign(
        { ...state },
        {
          authenticated: true
        }
      );
    case "LOGIN_FAILED":
      console.log("LOGIN_FAILED ", action);
      return Object.assign(
        { ...state },
        {
          authenticated: false,
          error: action.responseJson.message
        }
      );
    case "LOGOUT":
      console.log("LOGOUT ", action);
      return Object.assign(
        { ...state },
        {
          authenticated: action.responseJson.authenticated
        }
      );
    case "MOVE_PAGE":
      console.log("MOVE_PAGE ", action);
      return Object.assign(
        { ...state },
        {
          loginPage: action.page
        }
      );
    default:
      return state;
  }
}

export default loginReducers;
