import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Header = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-purple-900 h-12 flex flex-row items-center">
      <h1 className="text-white text-2xl ml-2">Soma</h1>
      {auth.user ? (
        <div className="flex justify-evenly w-1/6 ml-auto mr-5">
          <NavLink to={"/model"}>
            <div className="text-white transition ease-in hover:scale-110 duration-200">
              Create
            </div>
          </NavLink>
          <div
            className="text-white transition ease-in hover:cursor-pointer hover:scale-110 duration-200"
            onClick={(e) => {
              auth.logout();
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </div>
        </div>
      ) : (
        <div className="flex justify-evenly w-1/6 ml-auto mr-5">
          <NavLink to={"/model"}>
            <div className="text-white transition ease-in hover:scale-110 duration-200">
              Create
            </div>
          </NavLink>
          <NavLink to={"/login"}>
            <div className="text-white transition ease-in hover:scale-110 duration-200">
              Login
            </div>
          </NavLink>
          <NavLink to={"/signUp"}>
            <div className="text-white transition ease-in hover:scale-110 duration-200">
              SignUp
            </div>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
