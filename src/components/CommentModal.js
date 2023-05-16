import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NODE_API_URL } from "../utils";
import CommentCard from "./CommentCard";

const CommentModal = ({ isOpen, onClose, comments, model }) => {
  const [comment, setComment] = useState("");

  const closeModal = () => {
    onClose();
    setComment("");
  };

  const addComment = () => {
    fetch(NODE_API_URL + "/comments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.soma_token,
      },
      body: JSON.stringify({
        model_id: model.model_id,
        user_id: localStorage.user,
        text: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.comment_id) {
          console.log("Added Comment");
          model.comments.push(comment);
          closeModal();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isOpen ? (
        <div
          onClick={(e) => {
            if (e.target.id === "background") {
              closeModal();
            }
          }}
        >
          <div className="fixed inset-0 bg-gray-800 opacity-50 z-50"></div>
          <div
            id="background"
            className="fixed inset-0 z-50 flex justify-center items-center"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full h-3/4 sm:max-w-md relative">
              <div className="absolute top-0 left-0 flex flex-row justify-between items-center w-full h-10 rounded-t-lg bg-purple-900">
                <h2 className="absolute top-0 left-0 p-2 text-lg text-white">
                  Comments
                </h2>
                <button
                  className="text-white absolute top-0 right-0 p-2"
                  onClick={closeModal}
                >
                  <AiOutlineClose size={24} />
                </button>
              </div>
              <div className="mt-10 w-96 mr-auto ml-auto flex flex-row items-center justify-between">
                <input
                  className="border border-gray-400 p-2 w-4/5 rounded focus:outline-gray-400"
                  type="text"
                  placeholder="Type something..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className="text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                  onClick={() => {
                    addComment();
                  }}
                >
                  ADD
                </button>
              </div>
              <div className="flex flex-col justify-start items-center overflow-auto h-3/5 mt-5 mb-5">
                {comments.map((c) => {
                  return <CommentCard comment={c} />;
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CommentModal;
