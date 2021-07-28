import React from 'react'
import { Switch, Route, useHistory } from "react-router-dom";
import LoginPage from './LoginPage';
import Signup from "./Signup";
import Home from "./Home";
import interceptor from './interceptor';
import Profile from './Profile';
import Loading from './Loading';
export default function App() {
    let history = useHistory();
    interceptor(history);
    return (
        <Loading>
            <Switch>
                <Route exact path="/">
                    <LoginPage />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/feed">
                    <Home />
                </Route>
                <Route path="/profile/:username">
                    <Profile />
                </Route>
            </Switch>
        </Loading>
    )
}
