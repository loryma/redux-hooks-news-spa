import React, { useEffect } from "react";
import { connect } from "react-redux";
import withError from "../hoc/withError";
import * as actions from "../store/actions";
import Icon from "../components/Icon/Icon";
import Spinner from "../components/Spinner/Spinner";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const Profile = ({ idToken, profileData, loading, fetchProfile, error }) => {
  let profileContent;

  useEffect(() => {
    if (idToken) {
      fetchProfile(idToken);
    }
  }, [idToken, fetchProfile]);

  if (loading) {
    profileContent = <Spinner />;
  } else if (profileData) {
    const date = new Date(+profileData.createdAt);
    const month = MONTHS[date.getMonth()];
    const createdAt = `${month} ${date.getDate()}, ${date.getFullYear()}`;
    profileContent = (
      <div>
        <p>
          Email: <span>{profileData.email}</span>
        </p>

        <p>
          Accout created on: <span>{createdAt}</span>
        </p>
      </div>
    );
  }

  return <div>{profileContent}</div>;
};

const mapStateToProps = state => ({
  profileData: state.profile.data,
  loading: state.profile.loading,
  error: state.profile.error,
  idToken: state.auth.idToken
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: idToken => dispatch(actions.fetchProfile(idToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(withError(Profile));
