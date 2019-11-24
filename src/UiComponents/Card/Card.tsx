import React from "react";
import "./Card.css";

interface ICardProps {
    story:string;
    author:string;
    name:string;
}

export function Card(props:ICardProps):JSX.Element {
    return (
        <div className="card">
            <div className="card-content">
                <div className="card-name">{props.name}
                    <div className="make-favourite" role="button" onClick={() => null}>★</div>
                </div>
                <div className="card-story">{props.story}</div>
            </div>
            <div className="card-author">{props.author}</div>
        </div>
    );
}
