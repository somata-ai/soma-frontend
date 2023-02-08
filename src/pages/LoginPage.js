import React from "react";
import { useState } from "react";
import Header from "../components/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    console.log(email, password);
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
          <form className="grid justify-center" onSubmit={handleSubmit}>
            <h1 className="text-4xl text-purple-500 mx-auto mb-5">
              Login to SOMA
            </h1>
            <br />
            <label className="text-[#a454fc] mb-1">Username</label>
            <input
              className="rounded-md p-1 mx-auto shadow-md w-full h-8"
              type="email"
              placeholder="e.g talhahaha"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />
            <label className="text-[#a454fc] mb-1">Password</label>
            <input
              className="rounded-md p-1 mx-auto shadow-md w-full h-8"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button
              className="bg-purple-800 hover:bg-purple-900 font-sans text-xl text-white rounded-lg w-80 h-8 mb-5"
              type="submit"
              onSubmit={() => handleSubmit()}
            >
              Log in
            </button>
            <button
              className="bg-purple-800 hover:bg-purple-900 font-sans text-xl text-white rounded-lg w-80 h-8"
              type="submit"
              onSubmit={() => handleSubmit()}
            >
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
