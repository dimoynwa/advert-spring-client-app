import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";

import {ROLE_MAPPER} from './../utils/Services';

import AuthContext from './../context/auth-context';

class UserProfileLite extends React.Component {
  static contextType = AuthContext;

  render () {
    return (
      <AuthContext.Consumer>
        {context => (
          <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
              <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>
            <Row>
              <Col lg="4">
                <UserDetails userDetails={{
                  avatar: context.getUserAvatar(),
                  name : context.userData.firstName + ' ' + context.userData.lastName,
                  role : ROLE_MAPPER[context.userData.roles[0]],
                  date: context.userData.created,
                }} />
              </Col>
              <Col lg="8">
                <UserAccountDetails userData={context.userData} />
              </Col>
            </Row>
          </Container>)
        }
      </AuthContext.Consumer>);
    }
};

export default UserProfileLite;
