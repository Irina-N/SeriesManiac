import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Auth from '../Auth/Auth';
import Registration from '../Registration/Registration';
import Movies from '../Movies/Movies';
import MovieCard from '../Movies/MovieCard/MovieCard';
import { UserMovies } from '../Movies/UserMovies/UserMovies';
import { RecommendMovies } from '../Movies/RecommendMovie/RecommendMovie';

import '../../../css/app.css';
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
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/user/movies">
          <UserMovies />
        </Route>
        <Route exact path="/user/recommendations">
          <RecommendMovies />
        </Route>
        <Route exact path="/movies/:movieId" component={MovieCard}></Route>
      </Switch>
      <ToastContainer theme="colored" />
    </>
  );
}
