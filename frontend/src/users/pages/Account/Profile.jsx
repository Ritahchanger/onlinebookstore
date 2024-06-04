import "./Profile.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useEffect, useState } from "react";
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

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [fileMessage, setFileMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(user.user.passport);

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
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
        `http://localhost:5000/api/users/${user.user._id}/update-profile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const updatedUserData = await axios.get(
        `http://localhost:5000/api/users/userId/${user.user._id}`
      );

      dispatch(updateUserData({ user: updatedUserData.data.data }));

      setProfileImage(result.data.data);

      setFileMessage("File uploaded successfully");

      console.log(result.data);
    } catch (error) {
      setFileMessage(
        `There was a problem accessing the server: ${error.message}`
      );
      console.error(error);
    }
  };
  useEffect(() => {
    setProfileImage(user.user.passport);
  }, [user.user.passport]);

  const [updateInformationModal, setUpdateInformationModal] = useState(false);

  const displayUpdateInformationModal = () => {
    setUpdateInformationModal(!updateInformationModal);
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
                {profileImage ? (
                  <img
                    src={`http://localhost:5000/upload/authors/${profileImage}`}
                    alt={`${user.user.firstName} ${user.user.lastName}`}
                  />
                ) : (
                  <img
                    src={ProfileIcon}
                    alt={`${user.user.firstName} ${user.user.lastName}`}
                  />
                )}
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
              <p className="small-header">{`${user.user.firstName} ${user.user.secondName}`}</p>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio, dolore, iste odio recusandae in totam nihil,
                molestias officia voluptates error perspiciatis suscipit.
                Reprehenderit ducimus.
              </p>
              <div className="row profile-details">
                <p className="small-header">Phone</p>
                <p className="small-header">0712195228</p>
              </div>
              <div className="row profile-details">
                <p className="small-header">Email</p>
                <p className="small-header">{`${user.user.email}`}</p>
              </div>
              <div className="row profile-details">
                <p className="small-header">Username</p>
                <p className="small-header">{`${user.user.username}`}</p>
              </div>
            </div>
          </div>

          <div className="main-section">
            <UpdateBasicInformation />
            <UpdateContactInformation />
            <UpdateEmailInformation />
            <UpdatePasswordInformation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
