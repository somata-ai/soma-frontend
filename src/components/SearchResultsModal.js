import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ModalCard from "./ModelCard";

const SearchResultsModal = ({ results, setSearchResults, isOpen, onClose }) => {
  const closeModal = () => {
    onClose();
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
                  Results
                </h2>
                <button
                  className="text-white absolute top-0 right-0 p-2"
                  onClick={closeModal}
                >
                  <AiOutlineClose size={24} />
                </button>
              </div>
              <div className="overflow-auto h-5/6 flex flex-col  items-center  mt-10 mb-5">
                {results.length === 0 ? (
                  <div>No results!</div>
                ) : (
                  results.map((model) => {
                    return (
                      <div className="mb-2 mt-2">
                        <ModalCard
                          key={model.model_id}
                          models={results}
                          setModels={setSearchResults}
                          model={model}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SearchResultsModal;
