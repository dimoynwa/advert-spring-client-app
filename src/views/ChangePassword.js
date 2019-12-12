import React from 'react';

import {Form, FormGroup, FormInput, Button} from 'shards-react';

import LinearProgress from '@material-ui/core/LinearProgress';
import AppModal from './../components/dialogs/AppModal';

import {Redirect} from 'react-router-dom';

import {changeUserPassword} from './../utils/Services';

import AuthContext from './../context/auth-context';

class ChangePassword extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleClickConfirm = this.handleClickConfirm.bind(this);
    this.state = {
      'oldPassword': '',
      'password' : '',
      'confirmPassword': '',
      'isLoading': false,
      'error' : false,
      'errorMessage' : '',
      'showConfirmChange' : false,
      'showDialogSuccess' : false,
    };
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  handleClickConfirm() {
    console.log("handleClickConfirm");
    this.setState({
      'showConfirmChange' : true,
      'showDialogSuccess' : false,
    });
  }

  changePassword(event) {
    event.preventDefault();
    console.log("changePassword");
    if(this.state.password && this.state.confirmPassword){
      this.setState({
        'isLoading': true,
      });
      let changePasswordBody = {
        'oldPassword': this.state.oldPassword,
        'password': this.state.password,
        'confirmPassword' : this.state.confirmPassword,
      };
      changeUserPassword(changePasswordBody, this.context.authToken).then(response => {
        console.log(response);
        this.setState({
          'isLoading': false,
          'showDialogSuccess' : true,
          'showConfirmChange' : false,
        });
      }).catch(error => {
        console.log(error);
        this.setState({
          'isLoading': false,
          'showConfirmChange' : false,
          'error' : true,
          'errorMessage': error.errorInfo ? error.errorInfo.error : '',
        });
        this.context.handleError(error);;
      });
    }
  }

  closeDialog() {
    this.setState({
      'showDialogSuccess': false,
      'showConfirmChange' : false,
      'redirectToDashboard': true,
    });
  }

  render() {
    if(this.state.redirectToDashboard) {
      return <Redirect to="/dashboard" />
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div id="first">
                <div className="myform form ">
                    <div className="logo mb-3">
                        <div className="col-md-12 text-center">
                            <h1>Change Password</h1>
                            {this.state.showConfirmChange && <AppModal dialogTitle="Confirm" dialogContent="Are you sure you want to change your password?" accept={this.changePassword} />}
                            {this.state.showDialogSuccess && <AppModal dialogTitle="Success" dialogContent="You have successfully changed your password." accept={this.closeDialog} />}
                            <Form onSubmit={this.changePassword}>
                              <FormGroup>
                                <FormInput
                                  type="password"
                                  placeholder="Old password"
                                  name="oldPassword"
                                  value={this.state.oldPassword}
                                  onChange={this.onChange}
                                  required
                                />
                              </FormGroup>
                              <FormGroup>
                                <FormInput
                                  type="password"
                                  placeholder="New password"
                                  name="password"
                                  value={this.state.password}
                                  onChange={this.onChange}
                                  required
                                />
                              </FormGroup>
                              <FormGroup>
                                <FormInput
                                  type="password"
                                  placeholder="Confirm password"
                                  name="confirmPassword"
                                  value={this.state.confirmPassword}
                                  onChange={this.onChange}
                                  required
                                />
                              </FormGroup>
                              <div className="col-md-12 text-center ">
                                <Button block type="submit" className=" btn btn-block mybtn btn-primary tx-tfm" disabled={this.state.isLoading}>Change password</Button>
                              </div>
                              {this.state.error && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}
                            </Form>
                            {this.state.isLoading && <LinearProgress/>}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

    );
  }
}

export default ChangePassword;


// <main className={classes.main}>
//  <CssBaseline />
//  {this.state.showConfirmChange && <AppModal dialogTitle="Confirm" dialogContent="Are you sure you want to change your password?" accept={this.changePassword} />}
//  {this.state.showDialogSuccess && <AppModal dialogTitle="Success" dialogContent="You have successfully changed your password." accept={this.closeDialog} />}
//  <Paper className={classes.paper}>
//      <Avatar className={classes.avatar}>
//        <LockOutlinedIcon />
//      </Avatar>
//      <Typography component="h1" variant="h5">
//        Change Password
//      </Typography>
//      <form className={classes.form}>
//      <FormControl margin="normal" required fullWidth>
//        <InputLabel htmlFor="oldPassword">Old password</InputLabel>
//        <Input name="oldPassword" type="password" id="oldPassword" onChange={this.onChange} />
//      </FormControl>
//      <FormControl margin="normal" required fullWidth>
//        <InputLabel htmlFor="password">Password</InputLabel>
//        <Input name="password" type="password" id="password" onChange={this.onChange} />
//      </FormControl>
//      <FormControl margin="normal" required fullWidth>
//        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
//        <Input name="confirmPassword" type="password" id="confirmPassword" onChange={this.onChange} />
//      </FormControl>
//        <Button
//          type="submit"
//          variant="contained"
//          color="primary"
//          fullWidth
//          className={classes.submit}
//          disabled={this.state.isLoading}
//          onClick={this.changePassword}
//        >
//          Submit
//        </Button>
//
//
//      {this.state.error && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}
//
//    </form>
//    {this.state.isLoading && <LinearProgress/>}
//  </Paper>
// </main>
