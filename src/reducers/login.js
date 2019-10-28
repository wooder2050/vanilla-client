const initialState = {
  authenticated: false,
  loginPage: "login"
};

function loginReducers(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return Object.assign(
        { ...state },
        {
          authenticated: true
        }
      );
    case "LOGIN_FAILED":
      return Object.assign(
        { ...state },
        {
          authenticated: false,
          error: action.error
        }
      );
    case "LOGOUT":
      return Object.assign(
        { ...state },
        {
          authenticated: action.responseJson.authenticated
        }
      );
    case "MOVE_PAGE":
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
