import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import App from 'containers/App';
import LivePage from 'containers/LivePage';
import CompetitionPage from 'containers/CompetitionPage';

const Root = ({
  history,
  store,
}) => (
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route
            exact
            path="/live"
            component={LivePage}
          />

          <Route
            exact
            path="/:id"
            component={CompetitionPage}
          />

          {/* <Route
            exact
            path="/example/:id/:id"
            component={() => (
              <div>Example Page with id from id in match params</div>
            )}
          /> */}

          {/* <Route
            exact
            path="/"
            component={() => (
              <div>Default Page</div>
            )}
          /> */}

          <Redirect to="/live" />
        </Switch>
      </App>
    </Router>
  </Provider>
);

Root.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  store: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Root;