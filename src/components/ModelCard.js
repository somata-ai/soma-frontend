import { useEffect, useState } from "react";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NODE_API_URL } from "../utils";
import CommentModal from "./CommentModal";

const ModalCard = ({ model, setModels, models }) => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [liked, setLiked] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const toggleUpdate = () => (update ? setUpdate(false) : setUpdate(true));

  const openCommentModal = () => {
    openModal();
  };

  useEffect(() => {
    const index = model.likes.findIndex((e) => e === Number(localStorage.user));
    index === -1 ? setLiked(false) : setLiked(true);
  }, []);

  const toggleLike = () => {
    const url = liked ? "/model-likes/delete" : "/model-likes/create";
    const method = liked ? "DELETE" : "POST";

    fetch(NODE_API_URL + url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.soma_token,
      },
      body: JSON.stringify({
        model_id: model.model_id,
        user_id: localStorage.user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.model_id) {
          console.log("Model updated");
          const updatedModels = [...models];
          const index = updatedModels.findIndex(
            (m) => m.model_id === model.model_id
          );
          if (liked) {
            updatedModels[index].likes = model.likes.filter(
              (l) => l !== localStorage.user
            );
            setLiked(false);
          } else {
            updatedModels[index].likes.push(localStorage.user);
            setLiked(true);
          }
          setModels(updatedModels);
        }
      })
      .catch((err) => console.log(err));
  };

  const togglePublic = () => {
    if (model.user_id !== Number(localStorage.user)) {
      return;
    }

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

  return (
    <>
      <CommentModal
        isOpen={isOpen}
        onClose={closeModal}
        comments={model.comments}
        model={model}
      />
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
          <div
            onClick={toggleLike}
            className="flex flex-row items-center w-auto"
          >
            {liked ? (
              <IoHeartSharp className="text-red-400 text-lg" />
            ) : (
              <IoHeartOutline className="text-red-400 text-lg" />
            )}

            <div className="text-xs text-gray-400 mr-1">
              {model.likes[0] !== null ? model.likes.length : 0}
            </div>
          </div>

          <div
            onClick={openCommentModal}
            className="text-xs text-gray-400 mr-1"
          >
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
    </>
  );
};

export default ModalCard;
