import React from 'react';
import {MainPage} from "./MainPage/MainPage";
import {HashRouter, Route, Switch} from "react-router-dom";
import {CookieWorker} from "./Cookie/CookieWorker";
import {INavBarProps, Navbar} from "./UiComponents/Navbar/Navbar";
import {AuthPage} from "./AuthPage/AuthPage";
import {FavPage} from "./FavPage/FavPage";
import {SettingsPage} from "./SettingsPage/SettingsPage";

class App extends React.Component {
    constructor(props:any) {
        super(props);
        this.cookie_worker = new CookieWorker();
        if (this.cookie_worker.get('user')) {
            this.navbar = {
                home:true,
                favs:true,
                settings:true,
                auth:false
            }
        } else {
            this.navbar = {
                home:true,
                auth:true,
                favs:false,
                settings:false
            }
        }
    }
    public render() {
        return (
            <HashRouter>
                <div>
                    <Navbar {...this.navbar} />
                    <Switch>
                        {this.navbar.home && <Route exact path="/"><MainPage/></Route>}
                        {this.navbar.auth && <Route path="/auth"><AuthPage/></Route>}
                        {this.navbar.auth && <Route path="/favs"><FavPage/></Route>}
                        {this.navbar.auth && <Route path="/settings"><SettingsPage/></Route>}
                    </Switch>
                </div>
            </HashRouter>
        );
    }

    private navbar:INavBarProps;
    private cookie_worker:CookieWorker;
}


export default App;
