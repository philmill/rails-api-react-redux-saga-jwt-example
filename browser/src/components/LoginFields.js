import React, { Fragment } from "react";
import { connect } from "react-redux";

import { login, logout } from "../redux/login";

class LoginFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: { email: "", password: "" }
    };
  }

  onChange = event => {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({ credentials: credentials });
  };

  handleLogInClick = () => {
    this.props.logInUser(this.state.credentials);
  };

  handleLogOutClick = () => {
    this.props.logOutUser();
  };

  render() {
    return (
      <Fragment>
        {!this.props.hasSession ? (
          <div>
            <input
              className="input"
              type="text"
              name="email"
              placeholder="you@email.com"
              value={this.state.credentials.email}
              onChange={this.onChange}
            />
            <input
              className="input"
              name="password"
              type="password"
              value={this.state.credentials.password}
              onChange={this.onChange}
            />
            <button
              className="baseBtn"
              onClick={this.handleLogInClick}
              disabled={this.props.loggingIn}
            >
              Log In
            </button>
          </div>
        ) : (
          <button className="baseBtn" onClick={this.handleLogOutClick}>
            Log Out
          </button>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { hasSession, loggingIn } = state.login;
  return {
    hasSession,
    loggingIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logInUser: credentials => dispatch(login(credentials)),
    logOutUser: () => dispatch(logout())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFields);
