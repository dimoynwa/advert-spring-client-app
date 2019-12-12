import React from 'react';
import PropTypes from 'prop-types';

import {
  Col, Card, Badge, CardBody, CardFooter, Button
} from "shards-react";

import {Redirect, Link} from 'react-router-dom';

import {IMAGES_PATH} from './../../utils/Services';
import defaultAvatar from './../../images/avatars/defaultAvatar.png';

import AuthContext from './../../context/auth-context';

class PostCard extends React.Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.editPost = this.editPost.bind(this);
    this.previewPost = this.previewPost.bind(this);
    this.state = {
      redirectToEdit: false,
      redirectToPreview: false,
    }
  }

  editPost() {
    this.setState({
      redirectToEdit: true,
    });
  }

  previewPost() {
    this.setState({
      redirectToPreview: true,
    })
  }

  render() {
    if(this.state.redirectToEdit) {
      const url = "/edit-post/" + this.props.post.id;
      return (<Redirect push to={url} />);
    }
    if(this.state.redirectToPreview) {
      const url = "/post-preview/" + this.props.post.id;
      return (<Redirect push to={url} />);
    }
    let postImage = this.props.post.image;
    if(!postImage) {
      postImage = defaultAvatar;
    } else {
      postImage = IMAGES_PATH + postImage;
    }

    let posterAvatar = this.props.post.poster.avatar;
    if(!posterAvatar) {
      posterAvatar = defaultAvatar;
    } else {
      posterAvatar = IMAGES_PATH + posterAvatar;
    }

    //let userData = JSON.parse(localStorage.getItem(USER_DATA));

    let userId = this.context.getUserId();

    let posterName = this.props.post.poster.firstName + ' ' + this.props.post.poster.lastName;
    return (
      <Col lg="3" md="6" sm="12" className="mb-4" key={this.props.index}>
        <Card small className="card-post card-post--1">
          <div
            className="card-post__image"
            style={{ backgroundImage: `url(${postImage})` }}
          >
            <Badge
              pill
              className={`card-post__category bg-${this.props.post.jobType.name}`}
            >
              {this.props.post.jobType.name}
            </Badge>
            <div className="card-post__author d-flex">
              <Link
                to={"/users/" + this.props.post.poster.userName}
                className="card-post__author-avatar card-post__author-avatar--small"
                style={{ backgroundImage: `url('${posterAvatar}')` }}
              >
                Written by {posterName}
              </Link>
            </div>
          </div>
          <CardBody>
            <h5 className="card-title">
              <span className="text-fiord-blue">
                {this.props.post.title}
              </span>
            </h5>
            <p className="card-text d-inline-block mb-3" >{this.props.post.shortDescription}</p>
            <br/>
            <span className="text-muted">{this.props.post.created}</span>

          </CardBody>
          {
            userId === this.props.post.poster.id &&
            <CardFooter>
              <Button block className=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.editPost}><i className="material-icons">edit</i> Edit</Button>
            </CardFooter>
          }
          {
            userId !== this.props.post.poster.id &&
            <CardFooter>
              <Button block className=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.previewPost}><i className="material-icons">pageview</i> Preview</Button>
            </CardFooter>
          }
        </Card>
      </Col>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default PostCard;
