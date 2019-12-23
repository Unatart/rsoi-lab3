import React from "react";
import {AuthPanel} from "../UiComponents/Auth/Auth";
import {CookieWorker} from "../Cookie/CookieWorker";
import {useHistory} from "react-router-dom";

interface IAuthState {
    username:string,
    password:string,
    error?:string;
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

    public componentDidMount(): void {
        this.setState({
            ...this.state,
            error: undefined
        })
    }

    public render() {
        return (
            <AuthPanel
                handleChange={(event) => this.handleChange(event)}
                handleSubmit={(event) => this.handleSubmitButton(event)}
                error={this.state.error}
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

    public handleSubmitButton(event:any):void {
        event.preventDefault();
        if (this.state.password && this.state.username) {
            const options: RequestInit = {
                method: 'POST',
                mode: 'cors',
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Credentials": "true",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: this.state.username, password: this.state.password})
            };

            fetch("http://localhost:3006/auth", options)
                .then((response: Response) => {
                    return response.json();
                })
                .then( async (data: any) => {
                    if (data.error) {
                        return this.setState({
                            ...this.state,
                            error: data.error
                        });
                    }
                    this.cookie_worker.set("user", data.user.user_id);
                    this.cookie_worker.set("name", data.user.name);
                    this.cookie_worker.set("phone", data.user.phone);
                    this.cookie_worker.set("email", data.user.email);
                    this.cookie_worker.set("token", data.session.token);
                    const result = await fetch("http://localhost:5000/user/"+ data.user.user_id+"/notifications", {
                        ...options,
                        headers: {
                            ...options.headers,
                            "Authorization": "Bearer <"+this.cookie_worker.get("token")+">"
                        }
                    });

                    if (result.status === 200) {
                        this.props.history.push("/");
                        this.props.update_handler();
                    }
                })
                .catch((error:any) => {
                    this.setState({
                        ...this.state,
                        error: error
                    });
                });
        } else {
            this.setState({
                ...this.state,
                error: "You must fill in the fields above."
            })
        }
    }

    private cookie_worker = new CookieWorker();
}

export function AuthPageWrapper(props:IAuthWrapperProps) {
    let history = useHistory();

    return (
        <AuthPage history={history} {...props}/>
    );
}
