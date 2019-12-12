import React from 'react';

import {Redirect} from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';

import LinearProgress from '@material-ui/core/LinearProgress';
import AppModal from './../components/dialogs/AppModal';

import {activateUserAuth} from '../utils/Services';

import authStyles from './../styles/authStyles';

import queryString from 'query-string';

class ActivateUser extends React.Component {
  constructor(props) {
    super(props);
    this.activateUser = this.activateUser.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.state = {
      'isLoading': false,
      'redirectToReferrer': false,
      'error' : false,
      'errorMessage' : ''
    };
  }

  componentDidMount() {
    this.activateUser();
  }

  activateUser() {
    this.setState({
      'isLoading': true,
    });
    const values = queryString.parse(this.props.location.search);
    const token = values.token;
    activateUserAuth(token).then(response => {
      this.setState({
        'isLoading': false,
        'showDialogSuccess' : true
      });
    }).catch(error => {
      this.setState({
        'isLoading': false,
        'showDialogError': true
      });
      this.context.handleError(error);
    });
  }

  closeDialog() {
    this.setState({
      'showDialogSuccess': false,
      'showDialogError': false,
      'redirectToReferrer': true
    });
  }

  render() {
    if(this.state.isLoading) {
      return (<LinearProgress />);
    }
    if (this.state.redirectToReferrer) {
     return (<Redirect to={'/login'}/>);
    }
    if(this.state.showDialogSuccess) {
      return (<AppModal dialogTitle="Success" dialogContent="You have successfully activated your user." accept={this.closeDialog} />)
    }
    if(this.state.showDialogError) {
      return (<AppModal dialogTitle="Error" dialogContent="Error activating your user." accept={this.closeDialog} />)
    }
    return (<div> </div>);
  }
}

export default withStyles(authStyles)(ActivateUser);
