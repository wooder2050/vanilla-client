const initialState = {
  assets: null
};

function assetReducers(state = initialState, action) {
  switch (action.type) {
    case "ASSETS_ONLOAD":
      console.log("ASSETS_ONLOAD ", action);
      return Object.assign(
        { ...state },
        {
          assets: action.responseJson.assets
        }
      );
    default:
      return state;
  }
}

export default assetReducers;
