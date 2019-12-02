import React from "react";
import "./HomePage.css";
import {Card} from "../UiComponents/Card/Card";

interface IHomeState {
    data:any;
}

export class HomePage extends React.Component<{}, IHomeState> {
    constructor(props:any) {
        super(props);
        this.state = {data: null};
    }

    public componentDidMount():void {
        const options:RequestInit = {
            method: 'GET',
            mode: 'cors',
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials" : "true",
                "Content-Type" : "application/json"}
        };

        fetch("http://localhost:5000/stories", options)
            .then((response: Response) => {
                return response.json();
            })
            .then((data:string) => {
                this.setState({
                    data: data
                });
                console.log(this.state.data);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    public render() {
        // TODO: создание истории
        if (this.state.data) {
            const stories = this.state.data;
            return (
                <div>
                    {stories.map((story:any) =>
                        <Card story={story["article"]} name={story["theme"]}/>
                    )}
                </div>
            );
        }
        
        return <div/>;
    }
}

