import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Loader from './views/Loader/Loader';

const HomePage = lazy(() => import('./views/HomePage/HomePage'));
const App = lazy(() => import('./views/App/App'));

const Routing = function Routing() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/app">
            <App />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routing;
