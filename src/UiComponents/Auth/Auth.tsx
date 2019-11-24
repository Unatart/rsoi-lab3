import React from "react";
import "./Auth.css";

export function AuthPanel():JSX.Element {
    return (
        <form className='auth-form'>
            <input type='text' placeholder='Username'/>
            <input type='password' placeholder='Password'/>
            <input className='submit-btn' type='submit' value='Sign In'/>
        </form>
    );
}
