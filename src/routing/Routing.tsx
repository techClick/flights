import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Loader from 'pages/components/Loader/Loader';
import Homepage from 'pages/Homepage/Homepage';

// const HomePage = lazy(() => import('../pages/Homepage/Homepage'));

(document.body.style as any).zoom = '100%';

const Routing = function Routing() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routing;
