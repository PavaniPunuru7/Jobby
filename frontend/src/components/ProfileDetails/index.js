import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const ProfileDetails = () => {
  const [profileData, setProfileData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    try {
      const response = await fetch("http://localhost:5000/api/profile");

      if (response.ok) {
        const data = await response.json();
        const { name, profile_image_url, short_bio } = data.profile_details;

        const updatedProfile = {
          name,
          profileImageUrl: profile_image_url,
          shortBio: short_bio,
        };

        setProfileData(updatedProfile);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.error("❌ Failed to fetch profile:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderProfileView = () => {
    const { name, profileImageUrl, shortBio } = profileData;

    return (
      <div className="profile-success-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    );
  };

  const renderFailureView = () => (
    <div className="profile-error-view-container">
      <button
        type="button"
        data-testid="button"
        className="profile-failure-button"
        onClick={getProfile}
      >
        Retry
      </button>
    </div>
  );

  const renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader color="#ffffff" height="50" width="50" />
    </div>
  );

  const renderProfileDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProfileView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return <>{renderProfileDetails()}</>;
};

export default ProfileDetails;
