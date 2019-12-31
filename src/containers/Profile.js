import React, { useEffect } from "react";
import { connect } from "react-redux";
import withError from "../hoc/withError";
import * as actions from "../store/actions";
import Icon from "../components/Icon/Icon";
import Spinner from "../components/Spinner/Spinner";

const Profile = ({ userId, profileData, loading, fetchProfile, error }) => {
  let profileContent;

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [userId, fetchProfile]);

  if (loading) {
    profileContent = <Spinner />;
  } else if (profileData) {
    profileContent = <div></div>;
  }

  return <div>{profileContent}</div>;
};

const mapStateToProps = state => ({
  profileData: state.profile.data,
  loading: state.profile.loading,
  error: state.profile.error,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: userId => dispatch(actions.fetchProfile(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withError(Profile));
