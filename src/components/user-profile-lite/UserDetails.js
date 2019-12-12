import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  ListGroup,
  ListGroupItem
} from "shards-react";

import {updateUserAvatar} from './../../utils/Services';
import AppModal from './../dialogs/AppModal';
import LinearProgress from '@material-ui/core/LinearProgress';

import AuthContext from './../../context/auth-context';

class UserDetails extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
      super(props);
      this.inputOpenFileRef = React.createRef();
      this.onChangeFile = this.onChangeFile.bind(this);
      this.openAvatarSelect = this.openAvatarSelect.bind(this);
      this.closeSubmitDialog = this.closeSubmitDialog.bind(this);
      this.submit = this.submit.bind(this);
      this.state = {
        avatar: null,
        showConfirmChangeDialog: false,
        isLoading: false,
      }
    }

    onChangeFile(e) {
      this.setState({'avatar':e.target.files[0],
                  showConfirmChangeDialog: true,});
    }

    openAvatarSelect() {
      this.inputOpenFileRef.current.click();
    }

    submit() {
      this.setState({
        isLoading: true,
      });
      updateUserAvatar(this.state.avatar, this.context.authToken).then(response => {
        //localStorage.setItem(USER_DATA, JSON.stringify(response.payload));
        this.context.addLoggedUser(response.payload);
        this.setState({
          showConfirmChangeDialog: false,
          isLoading: false,
        } /*,  window.location.reload() */);
      }).catch(error => {
        this.setState({
          showConfirmChangeDialog: false,
          isLoading: false,
          error: error.errorInfo ? error.errorInfo.error : '',
        });
        this.context.handleError(error);;
      });

    }

    closeSubmitDialog() {
      this.setState({
        avatar: null,
        showConfirmChangeDialog: false,
      });
    }

    render() {
      return (
        <Card small className="mb-4 pt-3">
          {this.state.showConfirmChangeDialog && <AppModal dialogTitle="Edit avatar" dialogContent="Are you sure you want to edit your avatar?" accept={this.submit} onClose={this.closeSubmitDialog} />}
          <CardHeader className="border-bottom text-center">
            <div className="mb-3 mx-auto">
              <img
                className="rounded-circle"
                src={this.props.userDetails.avatar}
                alt={this.props.userDetails.name}
                width="110"
              />
            </div>
            <h4 className="mb-0">{this.props.userDetails.name}</h4>
            <span className="text-muted d-block mb-2">{this.props.userDetails.role}</span>
          </CardHeader>

          <ListGroup flush>
            <ListGroupItem className="p-4">
              <strong className="text-muted d-block mb-2">
                Created
              </strong>
              <span>{this.props.userDetails.date}</span>
            </ListGroupItem>
          </ListGroup>

          <CardFooter>
            <input name="avatar" onChange={this.onChangeFile} ref={this.inputOpenFileRef} type="file" style={{display:"none"}}/>
            {!this.props.readOnly && <Button block className=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.openAvatarSelect} disabled={this.state.isLoading}>Change avatar</Button>}
            {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
            {this.state.isLoading && <LinearProgress />}
          </CardFooter>
        </Card>
      );
    }


}

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Sierra Brooks",
    avatar: require("./../../images/avatars/0.jpg"),
    role: "User",
    date: "24-03-1994",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
};

export default UserDetails;
