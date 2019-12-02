import React from 'react';
import {HomePage} from "./HomePage/HomePage";
import {HashRouter, Route, Switch} from "react-router-dom";
import {CookieWorker} from "./Cookie/CookieWorker";
import {INavBarProps, Navbar} from "./UiComponents/Navbar/Navbar";
import {AuthPageWrapper} from "./AuthPage/AuthPage";
import {FavPage} from "./FavPage/FavPage";
import {SettingsPage} from "./SettingsPage/SettingsPage";

interface IAppState {
    navbar:INavBarProps;
}

class App extends React.Component<{}, IAppState> {
    constructor(props:any) {
        super(props);
        this.state = {
            navbar: {
                home: true,
                auth: true,
                favs: false,
                settings: false
            }
        };

        this.cookie_worker = new CookieWorker();
        if (this.cookie_worker.get('user')) {
            this.state = {
                navbar: {
                    home:true,
                    favs:true,
                    settings:true,
                    auth:false
                }
            };
        }
    }

    public checkCookieWorker():void {
        if (this.cookie_worker.get('user')) {
            this.setState({
                navbar: {
                    home:true,
                    favs:true,
                    settings:true,
                    auth:false
                }
            });
        } else {
            this.setState({
                navbar: {
                    home: true,
                    auth: true,
                    favs: false,
                    settings: false
                }
            });
        }
    }

    public render() {
        return (
            <HashRouter>
                <div>
                    <Navbar {...this.state.navbar} />
                    <Switch>
                        {this.state.navbar.home && <Route exact path="/"><HomePage/></Route>}
                        {this.state.navbar.auth && <Route path="/auth"><AuthPageWrapper update_handler={() => this.checkCookieWorker()}/></Route>}
                        {this.state.navbar.favs && <Route path="/favs"><FavPage/></Route>}
                        {this.state.navbar.settings && <Route path="/settings"><SettingsPage/></Route>}
                    </Switch>
                </div>
            </HashRouter>
        );
    }

    private cookie_worker:CookieWorker;
}


export default App;
