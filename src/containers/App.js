import { connect } from "react-redux";
import App from "../components/App/App";
import { LOG_IN } from "../contants/actionTypes";

const mapStateToProps = state => {
  return { isLogin: state.isLogin };
};

const mapDispatchToProps = dispatch => {
  return {
    verification(event) {
      dispatch({
        type: LOG_IN
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
