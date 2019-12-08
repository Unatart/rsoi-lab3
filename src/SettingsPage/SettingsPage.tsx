import React from "react";
import {Settings} from "../UiComponents/Settings/Settings";
import {CookieWorker} from "../Cookie/CookieWorker";

export interface ISettingsState {
    name:string|undefined;
    phone_number:string;
    email_addr:string;
    email:boolean;
    phone:boolean;
    password?:string;
    error?:string;
}

export class SettingsPage extends React.Component<{}, ISettingsState> {
    constructor(props:any) {
        super(props);
        this.cookie_worker = new CookieWorker();
        this.state = {
            name: this.cookie_worker.get("name"),
            phone_number: this.cookie_worker.get("phone") || "",
            email_addr: this.cookie_worker.get("email") || "",
            email: this.cookie_worker.get("email_on") === "true",
            phone: this.cookie_worker.get("phone_on") === "true"
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(): void {
        const options:RequestInit = {
            method: 'GET',
            mode: 'cors',
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials" : "true",
                "Content-Type" : "application/json"}
        };

        this.setState({
            ...this.state,
            error: undefined
        });

        fetch("http://localhost:5000/user/"+this.cookie_worker.get("user")+"/notifications", options)
            .then((res:any) => res.json())
            .then((data:any) => {
                this.setState({
                    ...this.state,
                    email: data.email,
                    phone: data.phone
                })
            })
    }

    public handleChange(event:any):void {
        const value = event.target.value;
        const name:string = event.target.name;

        if (name === "email") {
            return this.setState({
                ...this.state,
                email: !this.state.email
            });
        }

        if (name === "phone") {
            return this.setState({
                ...this.state,
                phone: !this.state.phone
            });
        }

        return this.setState({
            ...this.state,
            [name]: value
        });
    }

    private submit(event:any):void {
        event.preventDefault();
        if (this.state.password) {
            const options: RequestInit = {
                method: 'PATCH',
                mode: 'cors',
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Credentials": "true",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: this.state.name,
                    password: this.state.password,
                    email: this.state.email_addr,
                    phone: this.state.phone_number
                })
            };

            const notify_options: RequestInit = {
                method: 'PATCH',
                mode: 'cors',
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Credentials": "true",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: this.state.email,
                    phone: this.state.phone
                })
            };

            fetch("http://localhost:5000/user/" + this.cookie_worker.get("user"), options)
                .then((res: Response) => res.json())
                .then((body: any) => {
                    if (body.error) {
                        return this.setState({
                            ...this.state,
                            error: body.error
                        });
                    }
                    this.setState({
                        ...this.state,
                        phone_number: body.phone,
                        email_addr: body.email
                    });
                    this.cookie_worker.set("phone", this.state.phone_number);
                    this.cookie_worker.set("email", this.state.email_addr);

                    fetch("http://localhost:5000/user/" + this.cookie_worker.get("user") + "/notifications", notify_options)
                        .then((res: Response) => res.json())
                        .then((data: any) => {
                            if (data.error) {
                                return this.setState({
                                    ...this.state,
                                    error: data.error
                                });
                            }
                            this.cookie_worker.set("phone_on", data.phone);
                            this.cookie_worker.set("email_on", data.email);
                        })
                        .catch((error: any) => console.log(error));
                })
                .catch((error:any) => console.log(error));
        } else {
            this.setState({
                ...this.state,
                error: "You must enter password to update settings"
            })
        }
    }

    render() {
        return <Settings email={this.state.email}
                         phone={this.state.phone}
                         name={this.state.name}
                         phone_number={this.state.phone_number}
                         email_addr={this.state.email_addr}
                         onChange={(event) => this.handleChange(event)}
                         submitBtn={(event) => this.submit(event)}
                         error={this.state.error}
        />;
    }

    private cookie_worker:CookieWorker;
}