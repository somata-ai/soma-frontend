import { useEffect, useState } from "react";
import { NODE_API_URL } from "../utils";

const Settings = () => {
  const [userEmail, setUserEmail] = useState("");
  const [bio, setBio] = useState("");
  const [url, setUrl] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    fetch(NODE_API_URL + `/users/${localStorage.user}/getById`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.soma_token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data[0]);
        console.log(data[0]);
      });
  }, []);

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImage(file);
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(NODE_API_URL + "/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.soma_token,
        body: JSON.stringify({}),
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  let imagePreview = null;
  if (imagePreviewUrl) {
    imagePreview = (
      <div
        style={{
          backgroundImage: `url(${imagePreviewUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: 200,
          height: 200,
          borderRadius: "50%",
        }}
      />
    );
  } else {
    imagePreview = (
      <div
        style={{
          backgroundImage:
            "url(https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fboy-standing&psig=AOvVaw1uGs-_k8ZWbsXGyHJCXqUp&ust=1675958955488000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPC9yuOnhv0CFQAAAAAdAAAAABAG)",
          width: 200,
          height: 200,
          borderRadius: "50%",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Please select an image</p>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
      className="flex items-center"
    >
      <div className="ml-28 mr-28">
        <div>
          <h2 className=" text-4xl text-black mt-5 mb-5">Public Profile</h2>
          <div>
            <form className=" ml-28">
              <div className="flex flex-column max-w-full">
                <div>
                  <div className="w-80 mb-6">
                    <label>Email</label>
                    <br />
                    <input
                      type="email"
                      placeholder="abcd@gmail.com"
                      className="rounded-md p-1 shadow-md h-8 mx-auto w-80"
                      onChange={(e) => setUserEmail(e.target.value)}
                      value={userEmail}
                    />
                    <br />
                  </div>

                  <div className="w-80 mb-6">
                    <label>Bio</label>
                    <br />
                    <textarea
                      type="text"
                      placeholder="Tell us a little bit about yourself"
                      className="rounded-md p-1 shadow-md mx-auto w-80 h-32"
                      onChange={(e) => setBio(e.target.value)}
                      value={bio}
                    ></textarea>
                  </div>
                </div>

                <div className=" mx-auto ml-96">
                  <div> {imagePreview}</div>
                  <br />
                  <input
                    type="file"
                    id="files"
                    className="text-transparent"
                    onChange={handleImageChange}
                    value={image}
                  />
                </div>
              </div>

              <div className="w-80 mb-6">
                <label>LinkedIn URL</label>
                <br />
                <input
                  type="url"
                  placeholder="URL of your linkedin profile"
                  className="rounded-md p-1 shadow-md w-80 h-8 mx-auto"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                />
                <label></label>
              </div>

              <div className="w-80 mb-6">
                <label>Company</label>
                <br />
                <input
                  type="text"
                  placeholder="e.g Bitnine Global"
                  className="rounded-md p-1 shadow-md w-80 h-8 mx-auto"
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                />
                <label className="text-sm font-thin text-gray-500">
                  You can mention your company name or your school name here
                </label>
              </div>

              <div className="w-80 mb-6">
                <label>Country</label>
                <br />
                <input
                  type="text"
                  placeholder="Provide your country name here"
                  className="rounded-md p-1 shadow-md w-80 h-8 mx-auto"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                  Country
                />
              </div>

              <button
                onClick={handleSubmit}
                className="bg-purple-800 hover:bg-purple-900 text-xl text-white rounded-lg mt-1 ml-96 mb-10 w-44 h-10"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
