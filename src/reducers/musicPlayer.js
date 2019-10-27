const initialState = {
  musicPlayState: "off",
  currentMusic: null
};

function musicPlayerReducers(state = initialState, action) {
  switch (action.type) {
    case "START_MUSICPLAYER":
      console.log("START_MUSICPLAYER ", action);
      return Object.assign(
        { ...state },
        {
          musicPlayState: "bodyPlay",
          currentMusic: action.music
        }
      );
    case "CLOSE_MUSICPLAYER":
      console.log("CLOSE_MUSICPLAYER ", action);
      return Object.assign(
        { ...state },
        {
          musicPlayState: "off",
          currentMusic: null
        }
      );
    case "BODYPLAY_MUSICPLAYER":
      console.log("BODYPLAY_MUSICPLAYER ", action);
      return Object.assign(
        { ...state },
        {
          musicPlayState: "footPlay"
        }
      );
    case "FOOTERPLAY_MUSICPLAYER":
      console.log("FOOTERPLAY_MUSICPLAYER ", action);
      return Object.assign(
        { ...state },
        {
          musicPlayState: "bodyPlay"
        }
      );

    default:
      return state;
  }
}

export default musicPlayerReducers;
