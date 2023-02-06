import ModalCard from "../components/ModelCard";
import ProfilePicture from "../components/ProfilePicture";

const Dashboard = () => {
  return (
    <div className="bg-white flex min-h-screen">
      <div
        id="profile-section"
        className="bg-white pt-10 flex flex-col items-center w-1/4"
        style={{ boxShadow: "1px 0px 1px 0 lightgray" }}
      >
        <ProfilePicture />
        <p className="mt-5 text-justify w-9/12 text-clamp">
          Description will go here. Description will go here. Description will
          go here. Description will go here . Description will go here.
        </p>
        <button className=" w-64 h-8 mt-6 bg-purple-400 text-white text-md hover:bg-purple-500 rounded">
          Edit Profile
        </button>
        <hr className="mt-5 bg-gray-400 h-0.5" style={{ width: "80%" }}></hr>
      </div>
      <div id="projects" className="p-20 grid grid-cols-2 auto-rows-min gap-6">
        <ModalCard title="Hello World" visibility="public" />
        <ModalCard title="Perceptron" visibility="private" />
        <ModalCard title="Lth Layer Model" visibility="private" />
        <ModalCard
          title="Hello World Again Hello World Again Hello World Again"
          visibility="private"
        />
        <ModalCard title="Hello World" visibility="public" />
      </div>
    </div>
  );
};

export default Dashboard;
