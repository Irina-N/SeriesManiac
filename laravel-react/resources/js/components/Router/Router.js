import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from '../App/App';
import Start from '../Start/Start';
import Profile from '../Profile/Profile';
import Registration from '../Registration/Registration';
import Logout from '../Profile/Logout';
import '../../../css/app.css'

function Router () {
    return (
    <Switch>            
        <Route exact path='/'>
            <Start/>
        </Route>
        <Route exact path='/register'>
            <Registration/>
        </Route>
        <Route exact path='/profile'>
            <Profile/>
        </Route>
        <Route exact path='/logout'>
            <Logout/>
        </Route>
    </Switch>
    )
}

export default Router;
