import React from "react";
import {AuthPanel} from "../UiComponents/Auth/Auth";
import {CookieWorker} from "../Cookie/CookieWorker";
import {useHistory} from "react-router-dom";

interface IAuthState {
    username:string,
    password:string
}

interface IAuthWrapperProps {
    update_handler:() => void;
}

interface IAuthProps extends IAuthWrapperProps{
    history:any;
}

class AuthPage extends React.Component<IAuthProps, IAuthState> {
    constructor(props:any) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    public render() {
        return (
            <AuthPanel
                handleChange={(event) => this.handleChange(event)}
                handleSubmit={(event) => this.handleSubmitButton(event)}
            />
        );
    }

    public handleChange(event:any):void {
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            ...this.state,
            [name]: value
        });
    }

    public handleSubmitButton(event:any):Promise<void> {
        event.preventDefault();
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials" : "true",
                "Content-Type" : "application/json"},
            body:JSON.stringify({ name: this.state.username, password: this.state.password })
        };

        // @ts-ignore
        return fetch("http://localhost:5000/user/auth", options)
            .then((response:Response) => {
                this.cookie_worker.set("user", this.state.username);
                this.props.history.push("/");
                this.props.update_handler();
            })
            .catch((error:any) => {
                console.log(error);
            });
    }

    private cookie_worker = new CookieWorker();
}

export function AuthPageWrapper(props:IAuthWrapperProps) {
    let history = useHistory();

    return (
        <AuthPage history={history} {...props}/>
    );
}
