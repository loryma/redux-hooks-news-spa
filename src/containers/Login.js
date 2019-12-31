import Form from "../components/Form/Form";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const mapStateToProps = state => ({
  loading: state.auth.loading,
  loggedIn: state.auth.userId,
  error: state.auth.error,
  clearPassword: state.auth.error && state.auth.error.message === "INVALID_PASSWORD"
});

const mapDispatchToProps = dispatch => ({
  submit: (email, password) => dispatch(actions.authorize(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
