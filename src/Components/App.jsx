import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from './LoginPage';
import Signup from "./Signup";
import Home from "./Home";
export default function App() {
    return (
        <Router>
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
            </Switch>
        </Router>
    )
}
