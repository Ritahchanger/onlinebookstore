import "./Profile.css";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import ProfileIcon from "../../../assets/icons/boy.png";
import { useSelector, useDispatch } from "react-redux";
import uploadIcon from "../../../assets/icons/upload.png";
import axios from "axios";
import { updateUserData } from "../../Redux/features/userSlice";
import UpdateBasicInformation from "./UpdateBasicInformation";
import UpdateContactInformation from "./UpdateContactInformation";
import UpdateEmailInformation from "./UpdateEmailInformation";
import UpdatePasswordInformation from "./UpdatePasswordInformation";
import Config from "../../../Config";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentEmail, userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);
  const [terminationModel, setTerminationModel] = useState(false);
  const [fileMessage, setFileMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(user.user?.passport);
  const [userProfile, setUserProfile] = useState(null);
  const [description, setDescription] = useState("");
  const [emailModal, setEmailModal] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    setTerminationModel(!terminationModel);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileMessage(`File "${file.name}" has been selected`);
    } else {
      setSelectedFile(null);
      setFileMessage("");
    }
  };

  const uploadProfileImage = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setFileMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const result = await axios.put(
        `${Config.apiUrl}/api/users/${user.user?._id}/update-profile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Update user data in Redux state
      const updatedUserData = await axios.get(
        `${Config.apiUrl}/api/users/userId/${user.user?._id}`
      );

      dispatch(updateUserData({ user: updatedUserData.data.data }));

      // Update profileImage state and display message
      setProfileImage(result.data.data);
      setFileMessage("File uploaded successfully");
    } catch (error) {
      setFileMessage(`Error uploading file: ${error.message}`);
    }
  };

  useEffect(() => {
    setProfileImage(user.user?.passport); // Update profileImage state on user change
  }, [user.user?.passport]);

  useEffect(() => {
    getUser(); // Fetch user data on component mount
    displayEmailChangeModal(); // Check whether to show email modal on mount
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${Config.apiUrl}/api/users/user-information/${user.user?._id}`
      );

      if (!response.data.success) {
        throw new Error("Failed to fetch user data");
      }

      setUserProfile(response.data.data); // Update userProfile state with fetched data
    } catch (error) {
      console.error(`Error fetching user data: ${error.message}`);
    }
  };

  const updateUserDescription = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${Config.apiUrl}/api/users/update/description/${user.user._id}`,
        { description },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        // Update userProfile state with the new description
        setUserProfile((prevUserProfile) => ({
          ...prevUserProfile,
          description,
        }));
      } else {
        console.error("Failed to update description");
      }
    } catch (error) {
      console.error(`Error updating description: ${error.message}`);
    }
  };

  const displayEmailChangeModal = () => {
    // Conditionally show email modal based on userId and currentEmail
    if (userId && currentEmail) {
      setEmailModal(true);
    } else {
      setEmailModal(false);
    }
  };

  const handleEmailChange = async () => {
    try {
      const response = await axios.put(
        `${Config.apiUrl}/api/users/${user.user?._id}/update-email`,
        { newEmail: currentEmail },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.success) {
        setEmailModal(false);
        getUser();
        // Optionally navigate or refresh page after successful email change
        navigate("/profile");
      } else {
        console.error("Failed to update email");
      }
    } catch (error) {
      console.error(`Error updating email: ${error.message}`);
    }
  };

  const handleEmailChangeCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="account">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar
        sidebar={sidebar}
        handleTerminationModel={handleTerminationModel}
      />
      <TerminationModel
        handleTerminationModel={handleTerminationModel}
        terminationModel={terminationModel}
      />

      <div className="profile">
        <p className="medium-header">PROFILE SECTION</p>
        <div className="container">
          <div className="user-information">
            <div className="profile-card">
              <div className="profile-image">
                <img
                  src={
                    profileImage
                      ? `${Config.apiUrl}/upload/authors/${profileImage}`
                      : ProfileIcon
                  }
                  alt={`${user.user?.firstName} ${user.user?.lastName}`}
                />
              </div>
              <form className="alter_profile" onSubmit={uploadProfileImage}>
                <label htmlFor="change-profile" className="upload-icon-wrapper">
                  <img
                    src={uploadIcon}
                    alt="Upload Profile"
                    className="upload-icon"
                  />
                </label>
                <input
                  type="file"
                  name="changeProfile"
                  id="change-profile"
                  accept="image/*"
                  className="file-input"
                  onChange={handleFileChange}
                />
                {fileMessage && <p className="file-message">{fileMessage}</p>}
                <button type="submit" className="cart-buttons">
                  SAVE
                </button>
              </form>
            </div>

            <div className="profile-card">
              <p
                className="small-header"
                style={{
                  textAlign: "start",
                  width: "100%",
                  color: "var(--blue)",
                }}
              >{`${user.user?.firstName} ${user.user?.secondName}`}</p>
              <p className="description" style={{ textAlign: "start" }}>
                {userProfile?.description
                  ? userProfile.description
                  : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dolore, iste odio recusandae in totam nihil, molestias officia voluptates error perspiciatis suscipit. Reprehenderit ducimus."}
              </p>

              {userProfile && (
                <>
                  <p
                    className="small-header"
                    style={{ textAlign: "start", width: "100%" }}
                  >
                    Email
                  </p>
                  <p
                    className="small-header"
                    style={{
                      textAlign: "start",
                      width: "100%",
                      color: "var(--blue)",
                    }}
                  >
                    {userProfile.email}
                  </p>

                  <p
                    className="small-header"
                    style={{ textAlign: "start", width: "100%" }}
                  >
                    Username
                  </p>
                  <p
                    className="small-header"
                    style={{
                      textAlign: "start",
                      width: "100%",
                      color: "var(--blue)",
                    }}
                  >
                    {userProfile.username}
                  </p>
                </>
              )}
            </div>

            <form
              onSubmit={updateUserDescription}
              style={{ marginTop: "1rem" }}
            >
              <p
                className="small-header"
                style={{
                  textAlign: "start",
                  width: "100%",
                  color: "var(--blue)",
                }}
              >
                Update description
              </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="10"
                className="profileDescription"
              />
              <input
                type="submit"
                className="submit-btn"
                style={{ marginTop: "1rem" }}
                value="SUBMIT"
              />
            </form>
          </div>

          <div className="main-section">
            <UpdateBasicInformation />
            <UpdateContactInformation />
            <UpdateEmailInformation />
            <UpdatePasswordInformation />
          </div>
        </div>
      </div>

      {/* Email Change Modal */}
      <div className={`email_modal ${emailModal ? "show" : ""}`}>
        <div className="email_change">
          <button className="cart-buttons" onClick={handleEmailChange}>
            VERIFY
          </button>
          <button
            className="cart-buttons"
            onClick={() => {
              setEmailModal(false);
              handleEmailChangeCancel();
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
