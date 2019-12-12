import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from "shards-react";

import LinearProgress from '@material-ui/core/LinearProgress';

import {updateGeneralInfo} from './../../utils/Services';
import AppModal from './../dialogs/AppModal';

import AuthContext from './../../context/auth-context';

class UserAccountDetails extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.beforeSubmit = this.beforeSubmit.bind(this);
    this.submit = this.submit.bind(this);
    this.closeSuccessDialog = this.closeSuccessDialog.bind(this);
    this.closeSubmitDialog = this.closeSubmitDialog.bind(this);
    console.log('Props in User Account Details', this.props);
    this.state = {
      firstName: this.props.userData.firstName,
      lastName: this.props.userData.lastName,
      email: this.props.userData.email,
      userName: this.props.userData.userName,
      isLoading: false,
      forEdit: false,
      showSubmitDialog: false,
      error: null,
    }
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  beforeSubmit(e) {
    e.preventDefault();
    this.setState({
      showSubmitDialog: true,
    });
  }

  submit() {
    this.setState({
      isLoading: true,
      error: null,
      showSubmitDialog: false,
    });
    let body = {
      "firstName" : this.state.firstName,
	    "lastName" : this.state.lastName,
	    "email" : this.state.email,
	    "userName" : this.state.userName,
    }
    updateGeneralInfo(body, this.context.authToken).then(response => {
      this.setState({
        isLoading: false,
        showSuccessDialog: true,
      });
      //localStorage.setItem(USER_DATA, JSON.stringify(response.payload));
      this.context.addLoggedUser(response.payload);
    }).catch(error => {
      this.setState({
        isLoading: false,
        error: error.errorInfo ? error.errorInfo.error : '',
      });
      this.context.handleError(error);;
    });
  }

  closeSuccessDialog() {
    this.setState({
      showSuccessDialog: false,
    }/*, window.location.reload()*/);
  }

  closeSubmitDialog() {
    this.setState({
      showSubmitDialog: false,
    });
  }

  render() {
   return (
    <Card small className="mb-4">
      {this.state.showSubmitDialog && <AppModal dialogTitle="Edit" dialogContent="Are you sure you want to edit your user?" accept={this.submit} onClose={this.closeSubmitDialog}/>}
      {this.state.showSuccessDialog && <AppModal dialogTitle="Success" dialogContent="You have successfully updated your user." accept={this.closeSuccessDialog} /> }
      <CardHeader className="border-bottom">
        <h6 className="m-0">{this.props.title}</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form onSubmit={this.beforeSubmit}>
                <Row form>
                  {/* First Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feFirstName">First Name</label>
                    <FormInput
                      id="feFirstName"
                      placeholder="First Name"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onChange}
                      readOnly={this.props.readOnly}
                    />
                  </Col>
                  {/* Last Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feLastName">Last Name</label>
                    <FormInput
                      id="feLastName"
                      placeholder="Last Name"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.onChange}
                      readOnly={this.props.readOnly}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <FormInput
                      type="email"
                      name="email"
                      id="feEmail"
                      placeholder="Email Address"
                      value={this.state.email}
                      onChange={this.onChange}
                      autoComplete="email"
                      readOnly={this.props.readOnly}
                    />
                  </Col>
                  {/* Password */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feUsername">Username</label>
                    <FormInput
                      id="feUsername"
                      placeholder="Username"
                      name="userName"
                      value={this.state.userName}
                      onChange={this.onChange}
                      readOnly={this.props.readOnly}
                    />
                  </Col>
                </Row>
                {!this.props.readOnly && <Button type="submit" theme="accent" disabled={this.state.isLoading}>Update Account</Button>}
                {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
                {this.state.isLoading && <LinearProgress />}
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
    );
  }
}

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details",
  //userData: JSON.parse(localStorage.getItem(USER_DATA))
};

export default UserAccountDetails;
