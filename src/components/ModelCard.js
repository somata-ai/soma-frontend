import { useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NODE_API_URL } from "../utils";

const ModalCard = ({ model }) => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);

  const toggleUpdate = () => (update ? setUpdate(false) : setUpdate(true));

  const toggleLike = () => {
    fetch(NODE_API_URL + `/models/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.soma_token,
      },
      body: JSON.stringify({
        model_id: model.model_id,
        likes: model.likes + 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.model_id) {
          console.log("Model updated");
          model.likes = model.likes + 1;
          toggleUpdate();
        }
      })
      .catch((err) => console.log(err));
  };

  const togglePublic = () => {
    fetch(NODE_API_URL + `/models/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.soma_token,
      },
      body: JSON.stringify({
        model_id: model.model_id,
        public: model.public !== 0 ? 0 : 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.model_id) {
          console.log("Model updated");
          model.public = model.public !== 0 ? 0 : 1;
          toggleUpdate();
        }
      })
      .catch((err) => console.log(err));
  };

  const openCommentModal = () => {};

  return (
    <div className="flex flex-col p-5 pb-3 border border-solid border-purple-300 w-96 h-36 rounded-lg">
      <h1
        onClick={() => {
          navigate("/model", { replace: false, state: model });
        }}
        id="title"
        className="text-blue-400 text-lg font-normal hover:underline hover:cursor-pointer truncate"
      >
        {model.name}
      </h1>
      <div id="" className="text-xs text-clamp">
        {model.description ? model.description : "No description provided"}
      </div>
      <div
        id="likes and comments and visibility"
        className="flex items-center flex-row w-auto mt-auto ml-auto hover:cursor-pointer"
      >
        <div onClick={toggleLike} className="flex flex-row items-center w-auto">
          <IoHeartSharp className="text-red-400 text-lg" />
          <div className="text-xs text-gray-400 mr-1">{model.likes}</div>
        </div>

        <div onClick={openCommentModal} className="text-xs text-gray-400 mr-1">
          <FaRegComment className="text-gray-400 mr-1" />
          {model.comments[0] !== null ? model.comments.length : 0}
        </div>

        <div
          onClick={togglePublic}
          className="text-purple-400 text-sm border border-solid rounded-lg px-1"
        >
          {model.public !== 0 ? "public" : "private"}
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
