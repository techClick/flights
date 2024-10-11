import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Loader from './views/Loader/Loader';

const HomePage = lazy(() => import('./views/HomePage/HomePage'));
const App = lazy(() => import('./views/App/App'));
const Layout = lazy(() => import('./views/Layout/Layout'));

const Routing = function Routing() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Layout>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/app">
              <App />
            </Route>
          </Switch>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default Routing;
