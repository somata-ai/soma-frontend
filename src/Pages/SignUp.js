import React from "react";
import { useState } from "react";
import styles from "../styles/signUp.scss"

function SignUP(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = event => {
        
        if (password !== confirmPassword){
            setError("Both the passwords do not match")
        }
        console.log(email, password);
        console.log(event.state);
    };

   
    return( 
        <div className="div">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="h1">SignUp for SOMA</h1>
                <label className="label">
                    <input type = "email" placeholder="Username or Email Address" value={email} onChange={e=>setEmail(e.target.value)}/>
                </label>
                <br />
                <label className="label">
                    <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                </label>
                <br />
                <label className="label">
                    <input type="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </label>
                <br />

                <button className="button" type = "submit" onSubmit={()=>handleSubmit()}>Sign Up</button>
            </form>
        </div>
    );
}


export default SignUP;