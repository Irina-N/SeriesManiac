import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../Auth/Auth';
import Profile from '../Profile/Profile';
import Registration from '../Registration/Registration';
import Movies from '../Movies/Movies';
import MovieCard from '../Movies/MovieCard/MovieCard';
import { UserMovies } from '../Movies/UserMovies/UserMovies';
import '../../../css/app.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Router() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Auth />
        </Route>
        <Route exact path="/register">
          <Registration />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/movies">
          {/* <Movies/> */}
          {/* раскомментировать верхнюю☝ строчку и удалить нижнюю☟ после реализации на беккенде */}
          <UserMovies />
        </Route>
        {/* раскомментировать нижнюю☟ после реализации на беккенде */}
        {/* <Route exact path="/profile/movies">
          <UserMovies />
        </Route> */}
        <Route exact path="/movies/:movieId" component={MovieCard}></Route>
      </Switch>
      <ToastContainer theme="colored" />
    </>
  );
}
