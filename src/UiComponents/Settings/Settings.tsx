import React from "react";
import "./Settings.css";
import {ISettingsState} from "../../SettingsPage/SettingsPage";

interface ISettingsProps extends ISettingsState {
    submitBtn?:(event:any) => void;
    onChange?:(event:any) => void;
    error?:string;
}

export function Settings(props:ISettingsProps):JSX.Element {
    return (
        <form className='form'>
            <input name="name" autoComplete="false" type='text' placeholder={"ur name is " + props.name} onChange={props.onChange}/>
            <input name="password" autoComplete="false" type='password' placeholder='enter password' onChange={props.onChange}/>
            <input name="phone_number" autoComplete="false" type='text' placeholder={props.phone_number || "enter phone number"} onChange={props.onChange}/>
            <input name="email_addr" autoComplete="false" type='email' placeholder={props.email_addr || "enter email"} onChange={props.onChange}/>
            <div className="title">connect Notifications</div>
            <div>
                <label className="container">Phone
                    <input name="phone" type="checkbox" defaultChecked={props.phone} onChange={props.onChange}/>
                        <span className="checkmark"/>
                </label>
                <label className="container">Email
                    <input name="email" type="checkbox" defaultChecked={props.email} onChange={props.onChange}/>
                        <span className="checkmark"/>
                </label>
            </div>
            {props.error && <label className='error'>{props.error}</label>}
            <input className='save-btn' type='submit' value='Save' onClick={props.submitBtn}/>
        </form>
    );
}
