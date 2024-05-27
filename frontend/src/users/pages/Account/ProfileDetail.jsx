
import "./profiledetail.css"


const ProfileDetail = ({title,detail}) => {
  return (
    <div className="row profile-details">
      <p className="small-header">{title}</p>
      <p className="small-header">{detail}</p>
    </div>
  );
};

export default ProfileDetail;
