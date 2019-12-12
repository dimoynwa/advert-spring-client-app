import React from 'react';
import {Redirect} from 'react-router-dom';

import {Form, FormInput, FormGroup, InputGroup,
  InputGroupAddon, InputGroupText, FormFeedback, FormSelect, Button} from 'shards-react';

import LinearProgress from '@material-ui/core/LinearProgress';

import {signup} from './../utils/Services';

import AppModal from './../components/dialogs/AppModal';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.signUp = this.signUp.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.state={
      avatar: null,
      username: '',
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      confirm_password: '',
      role: '',
      isLoading: false,
      showDialogSuccess: false,
      redirectToLogin: false,
      error : false,
      errorMessage : ""
    }
  }

  handleChangeRole(event) {
    this.setState({ role: event.target.value });
  };

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  onChangeFile(e) {
    this.setState({[e.target.name]:e.target.files[0]});
  }

  signUp(event) {
    event.preventDefault();
    let body = {
      "firstName" : this.state['first_name'],
	    "lastName" : this.state['last_name'],
	    "userName" : this.state.username,
	    "email" : this.state.email,
	    "password" : this.state.password,
	    "role" : this.state.role,
    }
    this.setState({
      isLoading: true,
    });
    signup(body, this.state.avatar).then(response => {
      this.setState({
        isLoading: false,
        showDialogSuccess: true
      });
    }).catch(error => {
      this.setState({
        isLoading: false,
        error : true,
        errorMessage : error.errorInfo ? error.errorInfo.error : '',
      });
      this.context.handleError(error);;
    });

  }

  closeDialog() {
    this.setState({
      showDialogSuccess: false,
      redirectToLogin: true
    });
  }

  redirectToLogin() {
    this.setState({
      redirectToLogin: true,
    });
  }

  render() {
    if(this.state.redirectToLogin) {
      return (<Redirect to={'/login'} />);
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div id="first">
                <div className="myform form ">
                    <div className="logo mb-3">
                        <div className="col-md-12 text-center">
                        <h1>Register</h1>
                        {this.state.showDialogSuccess && <AppModal dialogTitle='Success' dialogContent='You have successfully registered.' accept={this.closeDialog} />}

                        <Form onSubmit={this.signUp}>
                          <FormGroup>
                            <InputGroup className="mb-3">
                              <InputGroupAddon type="prepend">
                                <InputGroupText>@</InputGroupText>
                              </InputGroupAddon>
                              <FormInput placeholder="Username"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChange}
                                required
                                />
                                <FormFeedback>The username is required.</FormFeedback>
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <FormInput
                              placeholder="First name"
                              name="first_name"
                              value={this.state.first_name}
                              onChange={this.onChange}
                              required
                            />
                            <FormFeedback>The First name is required.</FormFeedback>
                          </FormGroup>
                        <FormGroup>
                          <FormInput
                            placeholder="Last name"
                            name="last_name"
                            value={this.state.last_name}
                            onChange={this.onChange}
                            required
                          />
                          <FormFeedback>The Last name is required.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <FormInput
                            placeholder="Email Address"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            required
                          />
                          <FormFeedback>The email is required.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <FormInput
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            required
                          />
                          <FormFeedback>The password is required.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <FormInput
                            type="password"
                            placeholder="Confirm password"
                            name="confirm_password"
                            value={this.state.confirm_password}
                            onChange={this.onChange}
                            required
                          />
                          <FormFeedback>The password is required.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <FormSelect name="skillLevel" value={this.state.role} onChange={this.handleChangeRole}>
                            <option value="ROLE_ADMIN">Admin</option>
                            <option value="ROLE_ADVERTISER">Advertiser</option>
                            <option value="ROLE_USER">User</option>
                          </FormSelect>
                        </FormGroup>
                        <FormGroup>
                          <FormInput placeholder="Avatar" type="file" name="avatar" onChange={this.onChangeFile}  />
                        </FormGroup>
                        <div className="col-md-12 text-center">
                          <Button block type="submit" className="btn btn-block mybtn btn-primary tx-tfm" disabled={this.state.isLoading}>Register</Button>
                        </div>
                        <br />
                        <div className="col-md-12 text-center">
                          <Button block outline onClick={this.redirectToLogin} className=" btn btn-block mybtn btn-primary tx-tfm" disabled={this.state.isLoading}>Login</Button>
                        </div>
                        {this.state.isLoading && <LinearProgress/>}
                      </Form>
                      {this.state.error && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}
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

export default SignUp;


// <div className="container">
// <div className="row">
// <div className="col-md-5 mx-auto">
// <div id="first">
// <div className="myform form ">
//    <div className="logo mb-3">
//      <div className="col-md-12 text-center">
//       <h1>Sign up</h1>
//      </div>
//   </div>
//   {this.state.showDialogSuccess && <AppModal dialogTitle='Success' dialogContent='You have successfully registered.' accept={this.closeDialog} />}
//   <Paper className={classes.paper}>
//   <Avatar className={classes.avatar}>
//     <LockOutlinedIcon />
//   </Avatar>
//     <form className={classes.form} onSubmit={this.signUp}>
//       <FormControl margin="normal" required fullWidth>
//         <InputLabel htmlFor="username">Username</InputLabel>
//         <Input id="username" name="username" autoComplete="username" autoFocus onChange={this.onChange} />
//       </FormControl>
//       <FormControl margin="normal" required fullWidth>
//         <InputLabel htmlFor="first_name">First name</InputLabel>
//         <Input id="first_name" name="first_name" autoComplete="first_name" autoFocus onChange={this.onChange} />
//       </FormControl>
//       <FormControl margin="normal" required fullWidth>
//         <InputLabel htmlFor="last_name">Last name</InputLabel>
//         <Input id="last_name" name="last_name" autoComplete="last_name" autoFocus onChange={this.onChange} />
//       </FormControl>
//       <FormControl margin="normal" required fullWidth>
//         <InputLabel htmlFor="email">Email Address</InputLabel>
//         <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.onChange} />
//       </FormControl>
//       <FormControl margin="normal" required fullWidth>
//         <InputLabel htmlFor="password">Password</InputLabel>
//         <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.onChange} />
//       </FormControl>
//       <FormControl margin="normal" required fullWidth>
//         <InputLabel htmlFor="password">Confirm Password</InputLabel>
//         <Input name="confirm_password" type="password" id="confirm_password" autoComplete="current-password" onChange={this.onChange} />
//       </FormControl>
//       <FormControl margin="normal" required fullWidth>
//         <InputLabel htmlFor="role-helper">Select role</InputLabel>
//         <Select value={this.state.role}
//             onChange={this.handleChangeRole}
//             input={<Input name="role" id="role-helper" />}>
//             <MenuItem value="">
//               <em>None</em>
//             </MenuItem>
//             <MenuItem value={'ROLE_ADMIN'}>Admin</MenuItem>
//             <MenuItem value={'ROLE_ADVERTISER'}>Advertiser</MenuItem>
//             <MenuItem value={'ROLE_USER'}>User</MenuItem>
//         </Select>
//       </FormControl>
//
//       <FormControl margin="normal" fullWidth>
//         <InputLabel htmlFor="avatar">Avatar</InputLabel>
//         <Input name="avatar" type="file" id="avatar"onChange={this.onChangeFile} />
//       </FormControl>
//
//       <Button
//         type="submit"
//         fullWidth
//         variant="contained"
//         color="primary"
//         className={classes.submit}
//         disabled={this.state.isLoading}
//       >
//         Sign up
//       </Button>
//       {this.state.error && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}
//       <Button fullWidth component={Link} to="/Login" disabled={this.state.isLoading}>
//         Login
//       </Button>
//       <br />
//       {this.state.isLoading && <LinearProgress/>}
//
//     </form>
//     </Paper>
//     </div>
//   </div>
// </div>
// </div>
// </div>
