import React from "react"
import {Link} from "react-router-dom";
import "./Navbar.css";
import {CookieWorker} from "../../Cookie/CookieWorker";

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
            {props.settings && <li>
                <Link className="story" to="/create_story">create a new story</Link>
            </li>}
            {props.settings && <li>
                <Link className="logout" to="/" onClick={() => {
                    const cookie_worker = new CookieWorker();
                    cookie_worker.deleteAllCookies();
                    window.location.reload();
                }
                }>logout :(</Link>
            </li>}
        </ul>
    );
}
