import dummy_profile_pic from "../assets/wallpaper.jpg";

const ProfilePicture = ({ picture }) => {
  return (
    <div>
      <img
        className="h-72 w-72"
        style={{ borderRadius: "50%" }}
        src={picture ? picture : dummy_profile_pic}
        alt="Profile Picture"
      ></img>
    </div>
  );
};

export default ProfilePicture;
