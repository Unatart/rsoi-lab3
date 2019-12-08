import React from "react";
import "./Auth.css";

export interface IAuthPageProps {
    handleSubmit:(event:any) => void;
    handleChange: (event:any) => void;
    error?:string;
}

export function AuthPanel(props:IAuthPageProps):JSX.Element {
    return (
        <form className='auth-form'>
            <input name='username' type='text' placeholder='Username' required={true} onChange={props.handleChange}/>
            <input name='password' type='password' placeholder='Password' required={true} onChange={props.handleChange}/>
            {props.error && <label className='error'>{props.error}</label>}
            {props.error && <label className="warning">must contain at least one digit,</label>}
            {props.error && <label className="warning">one lowercase, one capital letter</label>}
            {props.error && <label className="warning">and be at least 8 characters in size</label>}
            <input className='submit-btn' type='submit' value='Sign In' onClick={props.handleSubmit}/>
        </form>
    );
}
