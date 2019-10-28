const initialState = {
  assets: null,
  selectAsset: null
};

function assetReducers(state = initialState, action) {
  switch (action.type) {
    case "ASSETS_ONLOAD":
      return Object.assign(
        { ...state },
        {
          assets: action.responseJson.assets
        }
      );
    case "SELECT_ASSET":
      return Object.assign(
        { ...state },
        {
          selectAsset: action.asset
        }
      );
    default:
      return state;
  }
}

export default assetReducers;
