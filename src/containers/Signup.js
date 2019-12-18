import Form from "../components/Form/Form";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const mapStateToProps = state => ({
  loading: state.auth.loading,
  loggedIn: state.auth.userId,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  submit: (email, password) => dispatch(actions.signup(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
