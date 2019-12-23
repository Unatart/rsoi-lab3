import React from "react";
import './CreateCard.css';
import {CookieWorker} from "../../Cookie/CookieWorker";

interface ICreateCardState {
    article:string;
    theme:string;
}

export class CreateCard extends React.Component<{}, ICreateCardState>{
    constructor(props:any) {
        super(props);
        this.state = {
            article: "",
            theme: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange = (event:any) => {
        console.log('CHANGE');
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            ...this.state,
            [name]: value
        });
    };

    public createStory = async () => {
        const options: RequestInit = {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials": "true",
                "Content-Type": "application/json",
                "Authorization": "Bearer <"+this.cookie_worker.get("token")+">"
            },
            body: JSON.stringify({
                theme: this.state.theme,
                article: this.state.article
            })
        };

        console.log('send');
        const user_id = this.cookie_worker.get("user");
        const response = await fetch("http://localhost:5000/user/" + user_id + "/stories", options)
            .then((res:any) => {
                if (res.status === 401) {
                    this.cookie_worker.deleteAllCookies();
                    this.setState({});
                }
                return res.json();
            })
            .catch((error: any) => console.log(error));

        console.log(response);
    };

    public render() {
        return (
            <form className='form'>
                <input className='create-card-theme' name='theme' type='text' placeholder='Theme' onChange={(event) => this.handleChange(event)}/>
                <textarea className='create-card-story' name='article' placeholder='Article' onChange={(event) => this.handleChange(event)}/>
                <input className='submit-story-btn' type='submit' value='Create story' onClick={this.createStory}/>
            </form>
        );
    }

    private cookie_worker = new CookieWorker();
}