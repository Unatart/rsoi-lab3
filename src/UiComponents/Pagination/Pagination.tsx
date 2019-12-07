import React from "react";
import "./Pagination.css";
import {IHomeState} from "../../HomePage/HomePage";

interface IPaginationProps extends IHomeState {
    onClick:(pageNo:number) => void;
}


export function Pagination(props:IPaginationProps):JSX.Element {
    const pages:number[] = [];
    for (let i = 0; i < props.amount; i++) {
        pages.push(i+1);
    }
    return (
        <div className="pagination-parent">
            <div className="pagination">
                <div>
                    {props.pageNo > 1 && <a href="#" onClick={() => props.onClick(props.pageNo - 1)}>&laquo;</a>}
                    {pages.map((v, i) => <a href="#" key={i} onClick={() => props.onClick(v)}>{v}</a>)}
                    {props.amount > props.pageNo && <a href="#" onClick={() => props.onClick(props.pageNo + 1)}>&raquo;</a>}
                </div>
            </div>
        </div>
    );
}
