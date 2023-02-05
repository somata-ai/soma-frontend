import React from "react";
import { useState } from "react";

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    console.log(email, password);
  };

  return (
    <div className="bg-slate-50 container mx-auto my-auto mt-20 py-6 w-96 h-4/6 shadow-lg rounded-md p-1">
      <form className="grid justify-center" onSubmit={handleSubmit}>
        <h1 className="text-4xl text-purple-500 mx-auto mb-5">Login to SOMA</h1>
        <br />
        <label className="text-[#a454fc] mb-1">Username</label>
        <input className="rounded-md p-1 shadow-md w-64 h-8" type="email" placeholder="e.g talhahahae" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <br />
        <label className="text-[#a454fc] mb-1">Password</label>
        <input className="rounded-md p-1 shadow-md w-64 h-8" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <br />
        <button className="bg-[#a454fc] font-sans text-2xl text-white rounded-lg w-80 h-12 mb-5" type="submit" onSubmit={() => handleSubmit()} >Log in</button>
        <button className="bg-[#a454fc] font-sans text-2xl text-white rounded-lg mt-4 w-80 h-12 mb-5" type="submit" onSubmit={() => handleSubmit()}>Continue with Google</button>
      </form>
    </div>
  );
}


export default LoginPage;
