import React from "react";
import Login from "./Login";
import "./SignIn.css";

export default function SignIn() {
    return (
        <>
            <div className="sign-in">
                <div className="sign-in-bg"></div>
                <Login className='login-component'/>
            </div>
        </>
    );
}