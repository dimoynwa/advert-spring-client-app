import React from 'react';

import {Redirect} from 'react-router-dom';

import {Form, FormGroup, FormInput, Button} from 'shards-react';

import {forgotPassword} from './../utils/Services';

import LinearProgress from '@material-ui/core/LinearProgress';

import AppModal from './../components/dialogs/AppModal';

class ForgotPassword extends React.Component {

  constructor() {
    super();
    this.state = {
      'email': '',
      'redirectToReferrer': false,
      'showDialogSuccess': false,
      'error': false,
      'errorMessage' : '',
      'isLoading' : false
    }
    this.onChange = this.onChange.bind(this);
    this.forgotPass = this.forgotPass.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  forgotPass(e) {
    e.preventDefault();
    if(this.state.email) {
      this.setState({
        'isLoading' : true
      });
      const request = {
        'email' : this.state.email
      };
      forgotPassword(request).then(response => {
        this.setState({'redirectToReferrer' : false, 'isLoading' : false, 'showDialogSuccess': true});
      }).catch(error => {
        this.setState({
          'error': true,
          'errorMessage' : error.errorInfo ? error.errorInfo.error : '',
          'isLoading' : false
        });
        this.context.handleError(error);;
      });
    }
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  closeDialog() {
    this.setState({
      'showDialogSuccess': false,
      'redirectToReferrer': true
    });
  }

  render() {
    if(this.state.redirectToReferrer) {
      return (<Redirect to={'/'} />);
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div id="first">
                <div className="myform form ">
                    <div className="logo mb-3">
                        <div className="col-md-12 text-center">
                            <h1>Forgot password</h1>
                            {this.state.showDialogSuccess && <AppModal dialogTitle='Success' dialogContent='You have successfully reset your password.' accept={this.closeDialog} />}
                            <Form onSubmit={this.forgotPass}>
                              <FormGroup>
                                <FormInput
                                  type="email"
                                  placeholder="Email"
                                  name="email"
                                  value={this.state.email}
                                  onChange={this.onChange}
                                  required
                                />
                              </FormGroup>
                              <div className="col-md-12 text-center ">
                                <Button block type="submit" className=" btn btn-block mybtn btn-primary tx-tfm" disabled={this.state.isLoading}>Submit</Button>
                                {this.state.error && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}
                              </div>
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

export default ForgotPassword;

// <main className={classes.main}>
//  <CssBaseline />
//  {this.state.showDialogSuccess && <AppModal dialogTitle='Success' dialogContent='You have successfully reset your password.' accept={this.closeDialog} />}
//  <Paper className={classes.paper}>
//    <Avatar className={classes.avatar}>
//      <LockOutlinedIcon />
//    </Avatar>
//    <Typography component="h1" variant="h5">
//      Forgot password
//    </Typography>
//    <form className={classes.form}>
//      <FormControl margin="normal" required fullWidth>
//        <InputLabel htmlFor="email">Email address</InputLabel>
//        <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.onChange} />
//      </FormControl>
//      <Button
//        type="submit"
//        variant="contained"
//        color="primary"
//        fullWidth
//        className={classes.submit}
//        disabled={this.state.isLoading}
//        onClick={this.forgotPass}
//      >
//        Submit
//      </Button>
//
//      {this.state.error && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}
//      {this.state.isLoading && <LinearProgress/>}
//    </form>
//  </Paper>
// </main>
