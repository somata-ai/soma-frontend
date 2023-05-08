import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth";
import SearchBar from "./SearchBar";
import SearchResultsModal from "./SearchResultsModal";

const Header = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <SearchResultsModal
        results={searchResults}
        setSearchResults={setSearchResults}
        isOpen={isOpen}
        onClose={closeModal}
      />
      <div className="bg-purple-900 h-12 flex flex-row items-center">
        <h1 className="text-white text-2xl ml-2">Soma</h1>
        {auth.user ? (
          <div className="flex flex-row items-center justify-evenly w-fit ml-auto mr-5">
            <SearchBar
              openModal={openModal}
              setSearchResults={setSearchResults}
            />
            <NavLink to={"/profile"}>
              <div className="ml-2 mr-2 text-white transition ease-in hover:scale-110 duration-200">
                Learn
              </div>
            </NavLink>
            <NavLink to={"/profile"}>
              <div className="ml-2 mr-2 text-white transition ease-in hover:scale-110 duration-200">
                Dashboard
              </div>
            </NavLink>
            <NavLink to={"/model"}>
              <div className="ml-2 mr-2 text-white transition ease-in hover:scale-110 duration-200">
                Create
              </div>
            </NavLink>
            <div
              className="ml-2 mr-2 text-white transition ease-in hover:cursor-pointer hover:scale-110 duration-200"
              onClick={(e) => {
                auth.logout();
                navigate("/login", { replace: true });
              }}
            >
              Logout
            </div>
          </div>
        ) : (
          <div className="flex justify-evenly w-fit ml-auto mr-5">
            <NavLink to={"/model"}>
              <div className="ml-2 mr-2 text-white transition ease-in hover:scale-110 duration-200">
                Create
              </div>
            </NavLink>
            <NavLink to={"/login"}>
              <div className="ml-2 mr-2 text-white transition ease-in hover:scale-110 duration-200">
                Login
              </div>
            </NavLink>
            <NavLink to={"/signUp"}>
              <div className="ml-2 mr-2 text-white transition ease-in hover:scale-110 duration-200">
                SignUp
              </div>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
