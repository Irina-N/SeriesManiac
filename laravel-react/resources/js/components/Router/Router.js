import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Auth from '../Auth/Auth';
import Registration from '../Registration/Registration';
import Movies from '../Movies/Movies';
import MoviePage from '../Movies/MoviePage/MoviePage';
import { UserMovies } from '../Movies/UserMovies/UserMovies';
import { RecommendMovies } from '../Movies/RecommendMovie/RecommendMovie';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../../css/app.css';

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
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/user/movies">
          <UserMovies />
        </Route>
        <Route exact path="/user/recommendations">
          <RecommendMovies />
        </Route>
        <Route exact path="/movies/:movieId" component={MoviePage}></Route>
      </Switch>
      <ToastContainer theme="colored" />
    </>
  );
}
