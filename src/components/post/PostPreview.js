import React from 'react';

import {
  Card, CardBody, ListGroup, ListGroupItem, CardFooter,Container
} from "shards-react";

import {IMAGES_PATH} from './../../utils/Services';
import defaultAvatar from './../../images/avatars/defaultAvatar.png';

import { Link } from 'react-router-dom'

import ReactHtmlParser from 'react-html-parser';

class PostPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.post,
      error: null,
    }
  }

  render() {
    const authorFullName = this.state.post.poster.firstName + ' ' + this.state.post.poster.lastName;
    const userAvatar = this.state.post.poster.avatar ? (IMAGES_PATH + this.state.post.poster.avatar) : defaultAvatar;
    const postImage = this.state.post.image ? (IMAGES_PATH + this.state.post.image) : defaultAvatar;
    return (
      <Container fluid className="main-content-container px-4">
      <Card small className="mb-3">
        <CardBody>
        <div
          className="card-post__image" style={{'minHeight':'20.6250rem'}}
        >
          <img src={postImage} alt={this.state.post.title} style={{position: 'absolute',
                                          width: '100%',
                                          height: '100%',
                                          }}/>
        </div>
          <ListGroup flush>
            {/* Author */}
            <ListGroupItem className="p-4">
              <strong className="text-muted d-block mb-2">
                Author
              </strong>
              <div className="card-post__author d-flex">
                <Link to={"/users/" + this.state.post.poster.userName}
                  className="card-post__author-avatar"
                  style={{ backgroundImage: `url('${userAvatar}')` }}
                >
                </Link>
                <div className="d-flex flex-column justify-content-center ml-3">
                  <span className="card-post__author-name">
                    {authorFullName}
                  </span>
                  <small className="text-muted">{this.state.post.date}</small>
                </div>
              </div>
            </ListGroupItem>
            {/* Title */}
            <ListGroupItem className="p-4">
              <strong className="text-muted d-block mb-2">
                Title
              </strong>
              <span>{this.state.post.title}</span>
            </ListGroupItem>
            {/* Short description */}
            <ListGroupItem className="p-4">
              <strong className="text-muted d-block mb-2">
                Short description
              </strong>
              <span>{this.state.post.shortDescription}</span>
            </ListGroupItem>
            {/* Job type */}
            <ListGroupItem className="p-4">
              <strong className="text-muted d-block mb-2">
                Job type
              </strong>
              <span>{this.state.post.jobType.name}</span>
            </ListGroupItem>
            {/* Text */}
            <ListGroupItem className="p-4">
              <strong className="text-muted d-block mb-2">
                Text
              </strong>
              {ReactHtmlParser(this.state.post.description)}
            </ListGroupItem>
            <ListGroupItem className="p-4">
              <strong className="text-muted d-block mb-2">
                Required skills
              </strong>
              {/* Skills table */}
              <SkillsTable skills={this.state.post.skills} />
            </ListGroupItem>
          </ListGroup>
        </CardBody>
        <CardFooter>
          <span className="d-inline-block">
            By <strong>{authorFullName}</strong> for <strong>{this.state.post.companyName}</strong>.
          </span>
        </CardFooter>
      </Card>
      </Container>
    );
  }
}

function SkillsTable(props) {
  return (
    <table className="table mb-0">
      <thead className="bg-light">
        <tr>
          <th scope="col" className="border-0">
            #Skill name
          </th>
          <th scope="col" className="border-0">
            Skill Level
          </th>
        </tr>
      </thead>
      <tbody>
        {props.skills.map((skill, index) => {
          return (
            <tr key={index}>
              <td>{skill.skill.name}</td>
              <td>{skill.skillLevel}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default PostPreview;
