import dummy_profile_pic from "../assets/wallpaper.jpg";

const ProfilePicture = () => {
  return (
    <div>
      <img
        className="h-72 w-72"
        style={{ borderRadius: "50%" }}
        src={dummy_profile_pic}
        alt="Profile Picture"
      ></img>
    </div>
  );
};

export default ProfilePicture;
