import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";


const SignUpPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errPass, setErr] = useState(false);
  const [errName, setErrName] = useState(false);

  const clearError = () => setErr(false);
  const clearErrName = () => setErrName(false);

  const showError = () => {
    setErr(true);
    setTimeout(clearError, 3000);
  };

  const showErrorName = () => {
    setErrName(true);
    setTimeout(clearErrName, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" && password === "" && confirmPassword === "") {
      showError();
    } else if (password !== confirmPassword) {
      showError();
    } else if (name === ""){
      showErrorName();
    } else {
      auth.login(name);
      localStorage.setItem("user", name);
      setErr(false);
      navigate("/settings", { replace: true });
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
        className="flex items-center h-screen"
      >
        <div className="bg-slate-50 container mx-auto py-6 w-96 max-h-max shadow-lg rounded-md p-1">
          <form className="grid justify-center">
            <h1 className="text-4xl text-purple-500 mx-auto mb-5">
              SignUp for SOMA
            </h1>
            <label className="text-[#a454fc] mb-1">
              Username <span className="text-red-400">*</span>
            </label>
            <input
              className="rounded-md p-1 shadow-md w-full h-8 mx-auto mb-3"
              type="email"
              placeholder="e.g talhahahae"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="text-[#a454fc] mb-1">
              Password <span className="text-red-400">*</span>
            </label>
            <input
              className="rounded-md p-1 shadow-md w-full h-8 mx-auto mb-3"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="text-[#a454fc] mb-1">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <input
              className="rounded-md p-1 shadow-md w-full h-8 mx-auto"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errPass ? (
              <div className="text-red-500 mx-auto mt-2">
                Password and Confirm password must match.<br></br>
                Required fields marked with *
              </div>
            ) : (
              ""
            )}
            {errName ? (
              <div className="text-red-500 mx-auto mt-2">
                Username cannot be empty.
              </div>
            ) : (
              ""
            )}

            <button
              className="bg-purple-900 hover:bg-purple-800 mt-10 font-sans text-2xl text-white rounded-lg w-80 h-12 mb-5"
              onClick={(e) => handleSubmit(e)}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
