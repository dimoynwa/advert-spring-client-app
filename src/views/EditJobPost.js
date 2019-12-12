import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import PostForm from "../components/add-new-post/PostForm";
// import SidebarActions from "../components/add-new-post/SidebarActions";
// import SidebarCategories from "../components/add-new-post/SidebarCategories";

import LinearProgress from '@material-ui/core/LinearProgress';

import {updateJobPost, getJobPost} from '../utils/Services';

import AuthContext from './../context/auth-context';

class EditJobPost extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      redirectToForm : false,
      isLoading: false,
      post: null,
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
        error: error.errorInfo ? error.errorInfo.error : '',
      });
      this.context.handleError(error);;
    });
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Add New Post" subtitle="Job Posts" className="text-sm-left" />
        </Row>

        <Row>
          {/* Editor */}
          {this.state.isLoading && <LinearProgress />}
          {this.state.post &&
            <Col lg="9" md="12">
              <PostForm action={updateJobPost} post={this.state.post}/>
            </Col>
          }
          {/* Sidebar Widgets */}
          <Col lg="3" md="12">
            {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
          </Col>
        </Row>
      </Container>
    );
  }

}

export default EditJobPost;
