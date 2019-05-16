import React, { Component } from "react";
import { Redirect, Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createHashHistory } from "history";

import IdeasPage from "./components/IdeasPage";
import LoginFields from "./components/LoginFields";
import "./App.css";
import logo from "./logo.svg";

export const history = createHashHistory();

const Welcome = () => <div>Welcome</div>;

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const NoMatch = ({ location }) => {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <LoginFields />
          </header>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <PrivateRoute
              path="/ideas"
              component={IdeasPage}
              isAuthenticated={this.props.hasSession}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    hasSession: state.login.hasSession
  };
}

export default connect(mapStateToProps)(App);
