import React from "react";
import "./Card.css";

interface ICardProps {
    story:string;
    author?:string;
    name:string;
    makeFav:() => void;
    deleteStory:() => void;
    is_auth?:boolean;
    user_story?:boolean;
}

export function Card(props:ICardProps):JSX.Element {
    return (
        <div className="card">
            <div className="card-content">
                <div className="card-name">{props.name}
                    {props.is_auth && <button className="make-favourite" onClick={props.makeFav}>★</button>}
                    {props.user_story && <button className="delete-story" onClick={props.deleteStory}>x</button>}
                </div>
                <div className="card-story">{props.story}</div>
            </div>
            {props.author && <div className="card-author">{props.author}</div>}
        </div>
    );
}
