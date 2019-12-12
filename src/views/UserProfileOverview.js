import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";

import PostsTable from "../components/post/PostsTable";

import AuthContext from './../context/auth-context';
import defaultAvatar from './../images/avatars/defaultAvatar.png';

import LinearProgress from '@material-ui/core/LinearProgress';

import {getUserByUserName, IMAGES_PATH, ROLE_MAPPER} from './../utils/Services';

class UserProfileOverview extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {

      }
    }
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    this.setState({
      isLoading: true,
    });
    getUserByUserName(username, this.context.authToken).then(response => {
      console.log('getUserByUserName', response.payload);
      this.setState({
        isLoading: false,
        user: response.payload,
      });
    }).catch(error => {
      console.log('getUserByUserName error', error);
      this.context.handleError(error);
      this.setState({
        isLoading: false,
        error: error.errorInfo.error,
      });
    })
  }

  render () {
    if(this.state.isLoading) {
      return (<LinearProgress />);
    }
    return (
          <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
              <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>
            <Row>
              <Col lg="4">
                <UserDetails userDetails={{
                  avatar: this.state.user.avatar ? (IMAGES_PATH + this.state.user.avatar) : defaultAvatar,
                  name : this.state.user.firstName + ' ' + this.state.user.lastName,
                  role : ROLE_MAPPER[this.state.user.roles[0]],
                  date: this.state.user.created,
                }} readOnly={!(this.context.userData.userName === this.state.user.userName)}/>
              </Col>
              <Col lg="8">
                <UserAccountDetails userData={this.state.user} readOnly={!(this.context.userData.userName === this.state.user.userName)}/>
              </Col>
            </Row>
            {/* Table of posts */}
            {(this.state.user.roles.includes('ROLE_ADVERTISER') || this.state.user.roles.includes('ROLE_ADMIN')) && <PostsTable userName={this.state.user.userName}/> }
          </Container>);
    }
};

export default UserProfileOverview;
