import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/auth";
import { NODE_API_URL } from "../utils";

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const clearError = () => setErr(false);

  const showError = () => {
    setErr(true);
    setTimeout(clearError, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(NODE_API_URL + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("soma_token", data.user);
          localStorage.setItem("user", data.id);
          auth.login(true);
          navigate("/profile", { replace: true });
          setErr(false);
          return;
        } else {
          showError();
          auth.logout();
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        }}
        className="flex h-screen items-center"
      >
        <div className="bg-slate-50 container mx-auto py-6 w-96 max-h-max shadow-lg rounded-md p-1">
          <form className="grid justify-center">
            <h1 className="text-4xl text-purple-500 mx-auto mb-5">
              Login to SOMA
            </h1>
            <br />
            <label className="text-[#a454fc] mb-1">
              Username <span className="text-red-400">*</span>
            </label>
            <input
              className="rounded-md p-1 mx-auto mb-8 shadow-md w-full h-8"
              type="email"
              placeholder="e.g talhahaha"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="text-[#a454fc] mb-1">
              Password <span className="text-red-400">*</span>
            </label>
            <input
              className="rounded-md p-1 mx-auto shadow-md w-full h-8"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {err ? (
              <div className="text-red-500 mx-auto mt-2">
                Incorrect Username or Password
              </div>
            ) : (
              ""
            )}
            <button
              className="bg-purple-900 hover:bg-purple-800 mt-10 font-sans text-xl text-white rounded-lg w-80 h-12 mb-5"
              onClick={(e) => handleSubmit(e)}
            >
              Log in
            </button>
            {/* <button className="bg-purple-800 hover:bg-purple-900 font-sans text-xl text-white rounded-lg w-80 h-12">
              Continue with Google
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
