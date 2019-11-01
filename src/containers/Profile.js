import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Icon from "../components/Icon";

const Profile = ({ userId, profileData, loading, fetchProfile, error }) => {
  let profileContent;

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [userId, fetchProfile]);

  if (loading) {
    profileContent = <div>Loading...</div>;
  } else if (profileData) {
    let { city, languages, social } = profileData;
    profileContent = (
      <div>
        <div>
          <h4>City:</h4> <span>{city}</span>
        </div>
        <h4>Language knowledge: </h4>
        {languages.map(lang => (
          <p>{lang}</p>
        ))}
        <h4>Links:</h4>
        {social.map(({ label, link }) => (
          <Icon label={label} link={link} />
        ))}
      </div>
    );
  }

  return <div>{profileContent}</div>;
};

const mapStateToProps = state => {
  let social;
  if (state.profile.data) {
    let web = state.profile.data.social.filter(el => el.label === "web");
    social = state.profile.data.social.filter(el => el.label !== "web");
    if (web.length > 0) {
      social = [web[0], ...social];
    }
  }

  return {
    profileData: state.profile.data ? { ...state.profile.data, social } : null,
    loading: state.profile.loading,
    error: state.profile.error,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProfile: userId => dispatch(actions.fetchProfile(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
