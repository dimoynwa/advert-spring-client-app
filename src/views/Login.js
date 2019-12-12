import React from "react";
import {
  Form,
  FormInput,
  FormGroup,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback
} from "shards-react";

import {Redirect} from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

import "../shards-dashboard/styles/login.css";

import {login, getCurrentUser} from '../utils/Services';

import AuthContext from './../context/auth-context';

class Login extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
    this.redirectToRegister = this.redirectToRegister.bind(this);
    this.redirectToForgotPass = this.redirectToForgotPass.bind(this);
    this.state = {
      'username' : '',
      'password' : '',
      'isLoading' : false,
      'redirectToDashboard': false,
      'role' : '',
      'wrongPassNum' : 0,
      'forgetPassButton': false
    }
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  loadCurrentUser() {
    getCurrentUser(this.context.authToken).then(response => {

      console.log('Load current user', response);
      //localStorage.setItem(USER_DATA, JSON.stringify(response.payload));
      this.context.addLoggedUser(response.payload);
      console.log('user added to the context');
      if(response.payload.roles.includes("ROLE_ADMIN")) {
        this.setState({'role': 'ADMIN'});
      } else if(response.payload.roles.includes("ROLE_ADVERTISER")) {
        this.setState({'role': 'ADV'});
      } else {
        this.setState({'role': 'USER'});
      }
      this.setState({
        'isLoading': false,
        'redirectToDashboard': true,
        'wrongPassNum' : 0,
        'forgetPassButton': false
      });
    }).catch(error => {
      console.log('loadCurrentCustomer', error);
      this.setState({
        'isLoading': false,
        'error' : true,
        'errorMessage': error.errorInfo ? error.errorInfo.error : 'Error',
      });
      this.context.handleError(error);
    });
  }

  redirectToForgotPass() {
    this.setState({
      redirectToForgotPass: true,
    });
  }

  redirectToRegister() {
    this.setState({
      redirectToRegister: true,
    });
  }

  submit(e) {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    const loginRequest = {
        'usernameOrEmail' : this.state.username,
        'password' : this.state.password
      };
    login(loginRequest).then(response => {
      //localStorage.setItem(ACCESS_TOKEN, response.payload.accessToken);
      this.context.addToken(response.payload.accessToken);
      console.log('Auth token ', this.context.authToken);
      this.loadCurrentUser();
    }).catch(error => {
      console.log(error);
      let wrongPassNum = this.state.wrongPassNum + 1;
        let forgetPassButton = wrongPassNum >= 3;
        this.setState({
          'isLoading': false,
          'redirectToDashboard': false,
          'wrongPassNum' : wrongPassNum,
          'forgetPassButton' : forgetPassButton,
          'error' : true,
          'errorMessage': 'Wrong username or password.'
        });
    });
  }

  render() {
    if(this.state.redirectToDashboard) {
      return (<Redirect to={'/dashboard'} />);
    }
    if(this.state.redirectToRegister) {
      return (<Redirect to={'/registration'} />)
    }
    if(this.state.redirectToForgotPass) {
      return (<Redirect to={'/forgot-password'} />);
    }
    return(
      <div className="container">
      <div className="row">
    <div className="col-md-5 mx-auto">
    <div id="first">
      <div className="myform form ">
         <div className="logo mb-3">
           <div className="col-md-12 text-center">
            <h1>Login</h1>
           </div>
        </div>
              <Form onSubmit={this.submit}>
                <FormGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon type="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <FormInput placeholder="Username or e-mail"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}
                      required
                      invalid={!this.state.username}
                      />
                      <FormFeedback>The username is required.</FormFeedback>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <FormInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                    invalid={!this.state.password}
                  />
                  <FormFeedback>The password is required.</FormFeedback>
                </FormGroup>
                <div className="col-md-12 text-center ">
                  <Button block type="submit" className=" btn btn-block mybtn btn-primary tx-tfm" disabled={this.state.isLoading}>Login</Button>
                </div>
                <br />
                <div className="col-md-12 text-center ">
                  <Button block outline className=" btn btn-block mybtn btn-primary tx-tfm" disabled={this.state.isLoading} onClick={this.redirectToRegister}>Registration</Button>
                </div>
                {this.state.error && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}
                {this.state.forgetPassButton && <Button block outline disabled={this.state.isLoading} onClick={this.redirectToForgotPass}>Forgot your password?</Button>}
                {this.state.isLoading && <LinearProgress />}
              </Form>
              </div>
            </div>
          </div>
        </div>
        </div>
    );

  }
}

export default Login;
