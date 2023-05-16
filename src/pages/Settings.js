import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NODE_API_URL } from "../utils";

const Settings = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin_url, setLinkedinUrl] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [imageURL, setImageURL] = useState("");

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
        setUserEmail(data[0].email || "");
        setBio(data[0].bio || "");
        setLinkedinUrl(data[0].linkedin_url || "");
        setCompany(data[0].company || "");
        setCountry(data[0].country || "");
        setImageURL(data[0].profile_picture_url || "");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(NODE_API_URL + "/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.soma_token,
      },
      body: JSON.stringify({
        user_id: localStorage.user,
        email: userEmail,
        bio: bio,
        profile_pic_url: imageURL,
        linkedin_url: linkedin_url,
        company: company,
        country: country,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/profile", { replace: true });
      });
  };

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
              </div>

              <div className="w-80 mb-6">
                <label>Image URL</label>
                <br />
                <input
                  type="url"
                  placeholder="URL of your linkedin profile"
                  className="rounded-md p-1 shadow-md w-80 h-8 mx-auto"
                  onChange={(e) => setImageURL(e.target.value)}
                  value={imageURL}
                />
              </div>

              <div className="w-80 mb-6">
                <label>LinkedIn URL</label>
                <br />
                <input
                  type="url"
                  placeholder="URL of your linkedin profile"
                  className="rounded-md p-1 shadow-md w-80 h-8 mx-auto"
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  value={linkedin_url}
                />
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
