import React from "react";
import "./Auth.css";

export interface IAuthPageProps {
    handleSubmit:(event:any) => void;
    handleChange: (event:any) => void;
}

export function AuthPanel(props:IAuthPageProps):JSX.Element {
    return (
        <form className='auth-form'>
            <input name='username' type='text' placeholder='Username' onChange={props.handleChange}/>
            <input name='password' type='password' placeholder='Password' onChange={props.handleChange}/>
            <input className='submit-btn' type='submit' value='Sign In' onClick={props.handleSubmit}/>
        </form>
    );
}
