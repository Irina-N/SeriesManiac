import React from "react";
import {Route, Switch} from "react-router-dom";
import App from "../App/App";
import Start from "../Start/Start";

function Router () {
    return (
    <Switch>            
        <Route exact path="/">
            <Start/>
        </Route>
    </Switch>
    )
}

export default Router;
