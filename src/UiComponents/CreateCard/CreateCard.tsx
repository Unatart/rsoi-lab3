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
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            ...this.state,
            [name]: value
        });
    }

    public createStory = () => {
        if (this.state.article && this.state.theme) {
            const options: RequestInit = {
                method: 'POST',
                mode: 'cors',
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Credentials": "true",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    theme: this.state.theme,
                    article: this.state.article
                })
            };

            const user_id = new CookieWorker().get("user");
            fetch("http://localhost:5000/user/" + user_id + "/stories", options)
                .then((response: Response) => response.json())
                .catch((error: any) => console.log(error))
        }
    }

    public render() {
        return (
            <form className='form'>
                <input className='create-card-theme' name='theme' type='text' placeholder='Theme' onChange={(event) => this.handleChange(event)}/>
                <textarea className='create-card-story' name='article' placeholder='Article' onChange={(event) => this.handleChange(event)}/>
                <input className='submit-story-btn' type='submit' value='Create story' onClick={() => this.createStory()}/>
            </form>
        );
    }
}