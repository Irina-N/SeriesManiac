import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from '../App/App';
import Start from '../Start/Start';
import Registration from '../Registration/Registration'
import '../../../css/app.css'

function Router () {
    return (
    <Switch>            
        <Route exact path='/'>
            <Start/>
        </Route>
        <Route exact path='/singup'>
            <Registration/>
        </Route>
    </Switch>
    )
}

export default Router;
