import React from "react";
import {IHomeState} from "../HomePage/HomePage";
import {Card} from "../UiComponents/Card/Card";
import {CookieWorker} from "../Cookie/CookieWorker";

interface IFavState extends IHomeState{
}

export class FavPage extends React.Component<{}, IFavState> {
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
        fetch("http://localhost:5000/user/"+this.user+"/favourites", options)
            .then((response: Response) => response.json())
            .then((data:any) => {
                const promises = data.map((v: any) => fetch("http://localhost:5000/stories/" + v.story_id, options)
                        .then((response: Response) => response.json())
                        .then((result:any) => stories.push({result}))
                        .catch((error: any) => console.log(error)));
                return Promise.all(promises);
            })
            .then(() => {
                this.setState({
                    ...this.state,
                    data: stories,
                    amount: Math.ceil(stories.length / 5)
                });
            })
            .catch((error: any) => console.log(error));
    }

    public deleteFavStory = (story_id:number) => {
        const options:RequestInit = {
            method: 'DELETE',
            mode: 'cors',
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials" : "true",
                "Content-Type" : "application/json"
            }
        };

        fetch("http://localhost:5000/user/"+this.user+"/stories/"+story_id+"/favourites", options)
            .then(() => window.location.reload())
            .catch((error:any) => console.log(error));
    }

    public render() {
        if (this.state.data && this.state.data.length > 0) {
            const stories = this.state.data;
            return (
                <div>
                    <div>
                        {stories.map((story: any, key: number) => {
                            return story.result["article"] &&
                                <Card story={story.result["article"]}
                                        name={story.result["theme"]} key={key}
                                        user_story={true}
                                        deleteStory={() => this.deleteFavStory(story.result["story_id"])}/>
                        })
                        }
                    </div>
                </div>
            );
        }
        return null;
    }

    private user = new CookieWorker().get('user');
}