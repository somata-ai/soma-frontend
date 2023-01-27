import React from "react";
import styles from "../styles/signUp.scss"
import { useState } from "react";


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        console.log(email, password);
    };

    return (
        <div className="div">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="h1">Login to SOMA</h1>
                <input type="email" placeholder="Username or Email Address" value={email} onChange={e => setEmail(e.target.value)} />
                <br />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />               
                <br />
                <button className="button" type="submit" onSubmit={() => handleSubmit()}>Login</button>
            </form>
        </div>
    );
}


export default Login;