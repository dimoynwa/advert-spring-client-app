import React from 'react';

import AppModal from './../components/dialogs/AppModal';

import AuthContext from './auth-context';

import {IMAGES_PATH} from './../utils/Services';
import defaultAvatar from './../images/avatars/defaultAvatar.png';

class AuthState extends React.Component {

  constructor() {
    super();
    this.addToken = this.addToken.bind(this);
    this.addLoggedUser = this.addLoggedUser.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getUserAvatar = this.getUserAvatar.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.handleError = this.handleError.bind(this);
    this.closeUnauthorized = this.closeUnauthorized.bind(this);
    this.state = {
      userData: null,
      authToken: null,
    }
  }

  addToken(token) {
    this.setState({
      authToken: token,
    });
  }

  addLoggedUser(user) {
    this.setState({
      userData: user,
    });
  }

  logOut() {
    this.setState({
      userData: null,
      authToken: null,
      unauthorized: false,
    });
  }

  handleError(error) {
    console.log('AuthState handleError', error);
    this.setState({
      unauthorized: true,
    });
  }

  getUserAvatar() {
    return this.state.userData.avatar ? (IMAGES_PATH + this.state.userData.avatar) : defaultAvatar;
  }

  getUserId() {
    return this.state.userData.id;
  }

  closeUnauthorized() {
    this.setState({
      unauthorized: false,
    });
    window.location.reload();
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          userData: this.state.userData,
          authToken: this.state.authToken,
          addToken: this.addToken,
          addLoggedUser: this.addLoggedUser,
          logOut: this.logOut,
          getUserAvatar: this.getUserAvatar,
          getUserId: this.getUserId,
          handleError: this.handleError,
        }}
      >
        {this.state.unauthorized && <AppModal dialogTitle='Unauthorized' dialogContent='Your token is expired.' accept={this.closeUnauthorized} />}
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthState;
