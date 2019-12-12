import React from "react";
import {
  Container,
  Row,
} from "shards-react";
import { Redirect } from "react-router-dom";

import PageTitle from "../components/common/PageTitle";

import {getJobPost} from '../utils/Services';

import PostPreview from "../components/post/PostPreview";

import LinearProgress from '@material-ui/core/LinearProgress';

import AuthContext from './../context/auth-context';

class JobPostOverview extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.state = {
      isLoading: false,
      post: null,
      error: null,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({
      isLoading: true,
      error: null,
      post: null,
    });
    getJobPost(id, this.context.authToken).then(response => {
      this.setState({
        isLoading: false,
        post: response.payload,
      });
    }).catch(error => {
        this.setState({
          isLoading: false,
          post: null,
          error: error.errorInfo ? error.errorInfo.error : "Error",
        });
      this.context.handleError(error);;
    });
  }

  redirectToLogin() {
    this.setState({
      redirectToLogin: true,
    });
  }

  render() {
    if(this.state.redirectToLogin) {
      return (<Redirect to="/login" />);
    }
    return (
      <Container fluid className="main-content-container px-4">
        {this.state.isLoading && <LinearProgress />}
        {/* Page Header */}

          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Posts" subtitle="Components" className="text-sm-left" />
          </Row>
        { this.state.post &&
          <Row>
            <PostPreview post={this.state.post} />
          </Row>
        }
      </Container>
    );
  }
}

export default JobPostOverview;
