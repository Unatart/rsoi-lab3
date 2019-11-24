import React from "react";
import "./Settings.css";

export function Settings():JSX.Element {
    return (
        <form className='form'>
            <input type='text' placeholder='Username'/>
            <input type='password' placeholder='Password'/>
            <input type='text' placeholder='Phone'/>
            <input type='email' placeholder='Email'/>
            <div className="title">Notifications</div>
            <div>
                <label className="container">Phone
                    <input type="checkbox"/>
                        <span className="checkmark"/>
                </label>
                <label className="container">Email
                    <input type="checkbox"/>
                        <span className="checkmark"/>
                </label>
            </div>
            <input className='save-btn' type='submit' value='Save'/>
        </form>
    );
}
