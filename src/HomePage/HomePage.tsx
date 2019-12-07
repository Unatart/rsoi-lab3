import React from "react";
import "./HomePage.css";
import {Card} from "../UiComponents/Card/Card";
import {Pagination} from "../UiComponents/Pagination/Pagination";
import {CookieWorker} from "../Cookie/CookieWorker";

export interface IHomeState {
    data:any;
    amount:number;
    pageNo:number;
}

export class HomePage extends React.Component<{is_auth:boolean}, IHomeState> {
    constructor(props:any) {
        super(props);
        this.state = {data: null, amount:0, pageNo:1};
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
            .then((data:any) => {
                this.setState({
                    ...this.state,
                    data: data,
                    amount: Math.ceil(data.length / 5)
                });
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    public onPageClick = (pageNo:number) => {
        this.setState({
            ...this.state,
            pageNo: pageNo
        });

        const options:RequestInit = {
            method: 'GET',
            mode: 'cors',
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials" : "true",
                "Content-Type" : "application/json"}
        };

        fetch("http://localhost:5000/stories/?pageNo=" + pageNo + "&size=" + 5, options)
            .then((response: Response) => {
                return response.json();
            })
            .then((data:any) => {
                this.setState({
                    ...this.state,
                    data: data
                });
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    public makeFav = (story_id:number) => {
        const options:RequestInit = {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials" : "true",
                "Content-Type" : "application/json"}
        };

        const user_id = new CookieWorker().get("user");
        fetch("http://localhost:5000/user/"+user_id+"/stories/"+story_id+"/favourites", options)
            .then((response:Response) => response.json())
            .catch((error:any) => console.log(error))
    }

    public deleteStory = (story_id:number) => {
        const options:RequestInit = {
            method: 'DELETE',
            mode: 'cors',
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials" : "true",
                "Content-Type" : "application/json"
            }
        };

        const user_id = new CookieWorker().get("user");
        fetch("http://localhost:5000/user/"+user_id+"/stories/"+story_id, options)
            .then(() => window.location.reload())
            .catch((error:any) => console.log(error));
    }

    public render() {
        if (this.state.data) {
            const stories = this.state.data.slice(0, 5);
            return (
                <div>
                    <div>
                        {stories.map((story:any, key:number) => {
                            return <Card story={story["article"]} name={story["theme"]} key={key}
                                         makeFav={() => this.makeFav(story["id"])} is_auth={this.props.is_auth} user_story={this.cookie_worker.get("user") === story["author"]} deleteStory={() => this.deleteStory(story["id"])}/>
                        })}
                    </div>
                    <Pagination data={this.state.data} amount={this.state.amount} pageNo={this.state.pageNo} onClick={(pageNo:number) => this.onPageClick(pageNo)}/>
                </div>
            );
        }
        
        return <div/>;
    }

    private cookie_worker = new CookieWorker();
}

