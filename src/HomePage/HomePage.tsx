import React from "react";
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

        let stories:any = [];
        fetch("http://localhost:5000/stories", options)
            .then((response: Response) => {
                return response.json();
            })
            .then((data:any) => {
                const promises = data.map((v: any) => {
                    return fetch("http://localhost:5000/stories/" + v.id, options)
                            .then((response: Response) => response.json())
                            .then((result: any) => stories.push({result}))
                            .catch((error: any) => console.log(error))
                });
                return Promise.all(promises);
            })
            .then(() => {
                this.setState({
                    ...this.state,
                    data: stories,
                    amount: 3
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
                "Content-Type" : "application/json"
            }
        };

        let stories:any = [];
        fetch("http://localhost:5000/stories/?pageNo=" + pageNo + "&size=" + 5, options)
            .then((response: Response) => {
                return response.json();
            })
            .then((data:any) => {
                const promises = data.map((v: any) => {
                    return fetch("http://localhost:5000/stories/" + v.id, options)
                        .then((response: Response) => response.json())
                        .then((result: any) => stories.push({result}))
                        .catch((error: any) => console.log(error))
                });
                return Promise.all(promises);
            })
            .then(() => {
                this.setState({
                    ...this.state,
                    data: stories,
                    amount: 3
                });
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    public makeFav = (story_id:number) => {
        const options:RequestInit = {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials" : "true",
                "Content-Type" : "application/json",
                "Authorization": "Bearer <"+this.cookie_worker.get("token")+">"
            }
        };

        const user_id = new CookieWorker().get("user");
        fetch("http://localhost:5000/user/"+user_id+"/stories/"+story_id+"/favourites", options)
            .then((res:any) => {
                if (res.status === 401) {
                    this.cookie_worker.deleteAllCookies();
                    this.setState({});
                }
                return res.json();
            })
            .catch((error:any) => console.log(error))
    };

    public deleteStory = (story_id:number) => {
        const options:RequestInit = {
            method: 'DELETE',
            mode: 'cors',
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials" : "true",
                "Content-Type" : "application/json",
                "Authorization": "Bearer <"+this.cookie_worker.get("token")+">"
            }
        };

        const user_id = new CookieWorker().get("user");
        fetch("http://localhost:5000/user/"+user_id+"/stories/"+story_id, options)
            .then((res:any) => {
                if (res.status === 401) {
                    this.cookie_worker.deleteAllCookies();
                    this.setState({});
                }
                return res.json();
            })
            .then(() => window.location.reload())
            .catch((error:any) => console.log(error));
    };

    public render() {
        if (this.state.data && this.state.data.length > 0) {
            const stories = this.state.data.slice(0, 5);
            return (
                <div>
                    <div>
                        {stories.map((story: any, key: number) => {
                            return (<Card story={story.result["article"]}
                                        name={story.result["theme"]}
                                        key={key}
                                        makeFav={() => this.makeFav(story.result["story_id"])}
                                        is_auth={this.props.is_auth}
                                        author={story.result["author"]}
                                        user_story={this.cookie_worker.get("name") === story.result["author"]}
                                        deleteStory={() => this.deleteStory(story.result["story_id"])}/>);
                        })
                        }
                    </div>
                    <Pagination data={this.state.data} amount={this.state.amount} pageNo={this.state.pageNo}
                                onClick={(pageNo: number) => this.onPageClick(pageNo)}/>
                </div>
            );
        }
        
        return <div/>;
    }

    private cookie_worker = new CookieWorker();
}

