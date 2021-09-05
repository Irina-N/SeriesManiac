import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Start from '../Start/Start';
import Profile from '../Profile/Profile';
import Registration from '../Registration/Registration';
import '../../../css/app.css';
import Movies from '../Movies/Movies';

export default function Router () {
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
        <Route exact path='/movies'>
          <Movies/>
        </Route>        
    </Switch>
    )
}

