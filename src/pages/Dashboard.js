import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCard from "../components/ModelCard";
import ProfilePicture from "../components/ProfilePicture";
import { NODE_API_URL } from "../utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const getModels = () => {
      fetch(NODE_API_URL + `/models/${localStorage.user}/getUserModels`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.soma_token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setModels(data);
        })
        .catch((err) => console.log(err));
    };

    const getProfileData = () => {
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
    };

    getModels();
    getProfileData();
  }, []);

  return (
    <div className="bg-white flex min-h-screen">
      <div
        id="profile-section"
        className="bg-white pt-10 flex flex-col items-center w-1/4"
        style={{ boxShadow: "1px 0px 1px 0 lightgray" }}
      >
        <ProfilePicture picture={profileData.profile_picture_url} />
        <p className="mt-5 text-justify w-9/12 text-clamp">
          {profileData.bio
            ? profileData.bio
            : "Description will go here. Description will go here. Description will go here. Description will go here . Description will go here."}
        </p>
        <button
          className="w-64 h-8 mt-6 bg-purple-900 text-white text-md hover:bg-purple-800 rounded"
          onClick={() => navigate("/settings", { replace: false })}
        >
          Edit Profile
        </button>
        <hr className="mt-5 bg-gray-400 h-0.5" style={{ width: "80%" }}></hr>
      </div>
      <div id="projects" className="p-20 grid grid-cols-2 auto-rows-min gap-6">
        {models.length === 0 ? (
          <div>No projects yet.</div>
        ) : (
          models.map((model) => {
            return (
              <ModalCard
                key={model.model_id}
                models={models}
                setModels={setModels}
                model={model}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;
