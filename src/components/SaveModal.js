import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NODE_API_URL } from "../utils";

const SaveModal = ({ isOpen, onClose, params, model }) => {
  const [name, setName] = useState(model !== null ? model.name : "My Model");
  const [description, setDescription] = useState(
    model !== null ? model.description : ""
  );
  const [err, setErr] = useState(false);

  // useEffect(() => {
  //   model !== null ? console.log(model) : console.log("Yee");
  // }, []);

  const clearError = () => setErr(false);

  const showError = () => {
    setErr(true);
    setTimeout(clearError, 3000);
  };

  const closeModal = () => {
    onClose();
  };

  const saveModel = () => {
    if (model && model.user_id !== Number(localStorage.user)) {
      return;
    }

    if (name === "") {
      showError();
    } else {
      // Existing model - update.
      if (model !== null) {
        fetch(NODE_API_URL + `/models/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.soma_token,
          },
          body: JSON.stringify({
            model_id: model.model_id,
            name: name,
            description: description,
            user_id: localStorage.user,
            learning_rate: params.learningRate,
            optimizer: params.optimizer,
            layers: JSON.stringify(params.layers),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.model_id) {
              console.log("Model updated");
            }
          })
          .catch((err) => console.log(err));
        closeModal();
      }
      // New model - create.
      else {
        fetch(NODE_API_URL + "/models/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.soma_token,
          },
          body: JSON.stringify({
            name: name,
            description: description,
            user_id: localStorage.user,
            learning_rate: params.learningRate,
            optimizer: params.optimizer,
            layers: JSON.stringify(params.layers),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.model_id) {
              console.log("Model saved");
            }
          })
          .catch((err) => console.log(err));
        closeModal();
      }
    }
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
            <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:max-w-md relative">
              <div className="absolute top-0 left-0 flex flex-row justify-between items-center w-full h-10 rounded-t-lg bg-purple-900">
                <h2 className="absolute top-0 left-0 p-2 text-lg text-white">
                  Save Model Architecture
                </h2>
                <button
                  className="text-white absolute top-0 right-0 p-2"
                  onClick={closeModal}
                >
                  <AiOutlineClose size={24} />
                </button>
              </div>
              <div className="mt-10 flex flex-col items-center justify-center">
                <div className="flex flex-row w-11/12 items-center justify-between mb-4 mt-2">
                  <label className="block font-bold mr-2">Model Name:</label>
                  <input
                    className="border border-gray-400 p-2 w-6/12 rounded focus:outline-gray-400"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-row w-11/12 items-center justify-between mb-4 mt-2">
                  <label className="block font-bold mr-2">Description:</label>
                  <input
                    className="border border-gray-400 p-2 w-6/12 rounded focus:outline-gray-400"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {err ? (
                  <div className="text-red-500 mx-auto mt-2 mb-2">
                    Please give model name!
                  </div>
                ) : (
                  ""
                )}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    saveModel();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SaveModal;
