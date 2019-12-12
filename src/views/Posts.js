import React from "react";
import {
  Container,
  Row,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

import {getMyJobPosts, getAllJobPosts, POSTS_ON_ROW} from '../utils/Services';

import PostCard from "../components/post/PostCard";

import {Redirect} from 'react-router-dom';

import AuthContext from './../context/auth-context';

class Posts extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.loadMoreData = this.loadMoreData.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.state = {
      isLoading : true,
      page: 1,
      data: [],
      last: false,
      error: null
    };

    window.onscroll = () => {
      const {
        loadMoreData,
        state: {
          isLoading,
          last,
          error,
        },
      } = this;

      if (error || isLoading || last) {
        return;
      }
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadMoreData();
      }
    };
  }

  componentDidMount() {
    this.loadMoreData();
  }

  loadMoreData() {
    if(!this.state.last) {
      this.setState({
        isLoading: true,
      });
      const fetcher = this.props.mine ? getMyJobPosts : getAllJobPosts;
      console.log('Load more data context', this.context);
      fetcher(this.state.page, POSTS_ON_ROW, this.context.authToken).then(response => {
        this.setState(prevState => ({
          data: [...prevState.data, response.payload.content],
          isLoading: false,
          page: this.state.page + 1,
          last: response.payload.last,
        }));
      }).catch(error => {

          this.setState({
            error: error.errorInfo ? error.errorInfo.error : "Error",
            isLoading: false,
          });

        this.context.handleError(error);;
      });
    }
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
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Posts" subtitle="Components" className="text-sm-left" />
        </Row>

        {this.state.data.map((row, index) => (
        <Row key={index}>
          {row.map((post, idx) => (
            <PostCard post={post} index={idx} key={idx} />
          ))}
        </Row>))}
      </Container>
    );
  }
}

export default Posts;
