import React from "react"
import {Link} from "react-router-dom";
import "./Navbar.css";

export interface INavBarProps {
    home?:boolean;
    auth?:boolean;
    favs?:boolean;
    settings?:boolean;
}

export function Navbar(props:INavBarProps):JSX.Element {
    return (
        <ul>
            {props.home &&<li>
                <Link to="/">Home</Link>
            </li>}
            {props.auth && <li>
                <Link to="/auth">Auth</Link>
            </li>}
            {props.favs && <li>
                <Link to="/favs">Favs</Link>
            </li>}
            {props.settings && <li>
                <Link to="/settings">Settings</Link>
            </li>}
        </ul>
    );
}
