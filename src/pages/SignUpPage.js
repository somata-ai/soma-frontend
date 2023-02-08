import React from "react";
import { useState } from "react";
import Header from "../components/Header";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    if (password !== confirmPassword) {
      setError("Both the passwords do not match");
    }
    console.log(email, password);
    console.log(event.state);
  };

  return (
    <div>
      <Header />
      <div style={{backgroundColor: 'rgba(255, 255, 255, 0.75)'}} className="flex items-center h-screen" >
      <div className="bg-slate-50 container mx-auto py-6 w-96 h-4/6 shadow-lg rounded-md p-1">
        <form className="grid justify-center" onSubmit={handleSubmit}>
          <h1 className="text-4xl text-purple-500 mx-auto mb-5">
            SignUp for SOMA
          </h1>
          <label className="text-[#a454fc] mb-1">Username</label>
          <input
            className="rounded-md p-1 shadow-md w-full h-8 mx-auto"
            type="email"
            placeholder="e.g talhahahae"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="text-[#a454fc] mb-1">Password</label>
          <input
            className="rounded-md p-1 shadow-md w-full h-8 mx-auto"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label className="text-[#a454fc] mb-1">Confirm Password</label>
          <input
            className="rounded-md p-1 shadow-md w-full h-8 mx-auto"
            type="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <button
            className="bg-purple-800 hover:bg-purple-900 font-sans text-2xl text-white rounded-lg w-80 h-12 mb-5"
            type="submit"
            onSubmit={() => handleSubmit()}
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
