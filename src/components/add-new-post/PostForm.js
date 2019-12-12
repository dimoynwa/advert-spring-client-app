import React from "react";
import ReactQuill from "react-quill";
import { Card, CardHeader, CardFooter, CardBody, Form, FormInput, FormRadio, Button,
  ListGroup, ListGroupItem, Container, Row, Col, ButtonToolbar} from "shards-react";
import LinearProgress from '@material-ui/core/LinearProgress';
import EditSkillModal from './EditSkillModal';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

import AppModal from './../dialogs/AppModal';
import {Redirect} from 'react-router-dom';

import AuthContext from './../../context/auth-context';

import {deleteJobPost} from './../../utils/Services';

class PostForm extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.changeActive = this.changeActive.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.beforeSubmit = this.beforeSubmit.bind(this);
    this.submit = this.submit.bind(this);
    this.closeDialogs = this.closeDialogs.bind(this);
    this.openAddSkillDialog = this.openAddSkillDialog.bind(this);
    this.closeSkillDialog = this.closeSkillDialog.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.showEditSkillDialog = this.showEditSkillDialog.bind(this);
    this.closeSuccessDialog = this.closeSuccessDialog.bind(this);
    this.askForDeleteSkillItem = this.askForDeleteSkillItem.bind(this);
    this.closeDeleteSkillItemDialog = this.closeDeleteSkillItemDialog.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.beforeDelete = this.beforeDelete.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.closeDeleteSuccessDialog = this.closeDeleteSuccessDialog.bind(this);
    this.state = {
        id: null,
        companyName: '',
        title: '',
        shortDescription: '',
        description: '',
        active: false,
        jobType: '',
        image: null,
        skills: [],
        imageChanged: false,
        isLoading: false,
        showApproveDialog: false,
        redirectToDashboard: false,
        errorMessage: null,
        openAddSkillDialog: false,
        skillForEditIndex: -1,
        skillForDeleteIndex: -1,
        askForDeleteSkill: false,
    };
    if(props.post) {
      console.log('Post', props.post);
      this.state.id = props.post.id;
      this.state.companyName = props.post.companyName;
      this.state.title = props.post.title;
      this.state.shortDescription = props.post.shortDescription;
      this.state.description = props.post.description;
      this.state.active = props.post.active;
      this.state.image = props.post.image;
      this.state.jobType = props.post.jobType.name;
      this.state.skills = props.post.skills;
      this.state.possibleDelete = true;
    }
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  changeActive() {
    this.setState({active: !this.state.active});
  }

  onChangeFile(e) {
    this.setState({ imageChanged: true,
      [e.target.name]:e.target.files[0]});
  }

  onChangeDescription(value) {
    this.setState({
      description: value
    });
  }

  submit() {
    this.setState({
      isLoading: true,
      showApproveDialog: false,
      errorMessage: null
    });
    let body = {
      "id" : this.state.id,
    	"companyName" : this.state.companyName,
      "title" : this.state.title,
      "shortDescription" : this.state.shortDescription,
    	"description" : this.state.description,
    	"active" : this.state.active,
    	"jobType" : {
    		"name" : this.state.jobType
    	},
    	"skills" : this.state.skills.filter(skill => !skill.forDelete),
      "imageChanged" : this.state.imageChanged,
    }
    this.props.action(body, this.state.image, this.context.authToken).then(response => {
      this.setState({
        isLoading: false,
        showSuccessDialog: true
      });
    }).catch(error => {
      this.setState({
        isLoading: false,
        showApproveDialog: false,
        errorMessage: error.errorInfo ? error.errorInfo.error : '',
      });
      this.context.handleError(error);;
    });
  }

  closeDialogs() {
    this.setState({
      showApproveDialog: false,
      showSuccessDialog: false,
      showDeleteApprovalDialog: false,
      showDeleteSuccessDialog: false,
    });
  }

  closeSuccessDialog() {
    this.setState({
      showApproveDialog: false,
      showSuccessDialog: false,
      redirectToDashboard: true,
    });
  }

  beforeSubmit(e) {
    e.preventDefault();
    this.setState({
      showApproveDialog: true,
    })
  }

  openAddSkillDialog() {
    this.setState({
      openAddSkillDialog: true,
      skillForEditIndex: -1,
    });
  }

  closeSkillDialog() {
    this.setState({
      openAddSkillDialog: false,
      skillForEditIndex: -1,
    });
  }

  addSkill(skillModal) {
    let skill = {
      skill : {
        name : skillModal.name,
      },
      skillLevel: skillModal.skillLevel,
    }
    if(this.state.skillForEditIndex !== -1) {
      let { skills } = this.state;
      skills[this.state.skillForEditIndex] = skill;
      this.setState(prevState => ({
        skills: skills
    }));
  } else {
      this.setState(prevState => ({
        skills: [...prevState.skills, skill],
      }));
  }
    this.setState({
      openAddSkillDialog: false,
      skillForEditIndex: -1,
    });
  }

  showEditSkillDialog(index) {
    this.setState({
      openAddSkillDialog: true,
      skillForEditIndex: index,
    });
  }

  askForDeleteSkillItem(index) {
    this.setState({askForDeleteSkill: true, skillForDeleteIndex: index, });
  }

  closeDeleteSkillItemDialog() {
    this.setState({askForDeleteSkill: false, skillForDeleteIndex: -1,});
  }

  deleteSkill() {
    let { skills } = this.state;
    skills[this.state.skillForDeleteIndex].forDelete = true;
    this.setState({
      askForDeleteSkill: false,
      skillForDeleteIndex: -1,
      skills: skills
    });
    console.log(this.state);
  }

  beforeDelete() {
    this.setState({
      showDeleteApprovalDialog: true,
    });
  }

  deletePost() {
    this.setState({
      isLoading: true,
      showDeleteApprovalDialog: false,
    });
    deleteJobPost(this.state.id, this.context.authToken).then(response => {
      this.setState({
        isLoading: false,
        showDeleteSuccessDialog: true,
      });
    }).catch(error => {
      this.context.handleError(error);
      this.setState({
        isLoading: false,
        showDeleteSuccessDialog: false,
        errorMessage: error.errorInfo ? error.errorInfo.error : "Error",
      });
    });
  }

  closeDeleteSuccessDialog() {
    this.setState({
      showDeleteSuccessDialog: false,
      redirectToDashboard: true,
    });
  }

  render() {
    if(this.state.redirectToDashboard) {
      return (<Redirect to={'/dashboard'} />);
    }
    return (
      <Card small className="mb-3">
        <CardBody>
          <Form className="add-new-post" onSubmit={this.beforeSubmit}>
            {this.state.openAddSkillDialog && <EditSkillModal submit={this.addSkill} close={this.closeSkillDialog} data={this.state.skillForEditIndex === -1 ? null : this.state.skills[this.state.skillForEditIndex]} existingSkills={this.state.skills
              .filter(skill => !skill.forDelete).map(sk => {
              return sk.skill.name;
            })}/>}
            {this.state.showDeleteSuccessDialog && <AppModal dialogTitle='Delete' dialogContent='You have successfully deleted that job post.' accept={this.closeDeleteSuccessDialog} /> }
            {this.state.showDeleteApprovalDialog && <AppModal dialogTitle='Delete' dialogContent='Are you sure you want to delete this job post?' accept={this.deletePost} onClose={this.closeDialogs} /> }
            {this.state.showApproveDialog && <AppModal dialogTitle='Create' dialogContent='Are you sure you want to create this job post?' accept={this.submit} onClose={this.closeDialogs}  />}
            {this.state.showSuccessDialog && <AppModal dialogTitle='Success' dialogContent='You have successfully created job post.' accept={this.closeSuccessDialog} onClose={this.closeSuccessDialog} />}
            {this.state.askForDeleteSkill && <AppModal dialogTitle='Delete' dialogContent='Are you sure you want to delete this skill?' accept={this.deleteSkill} onClose={this.closeDeleteSkillItemDialog} />}
            <FormInput size="lg" className="mb-3" placeholder="Company name" name="companyName" onChange={this.onChange} value={this.state.companyName} required />
            <FormInput size="lg" className="mb-3" placeholder="Title" name="title" maxLength="40" onChange={this.onChange} value={this.state.title} required />
            <FormInput size="lg" className="mb-3" placeholder="Short description" name="shortDescription" maxLength="140" onChange={this.onChange} value={this.state.shortDescription} required />
            <ReactQuill modules={{
                        clipboard: {
                          matchVisual: false,
                        },
                      }} value={this.state.description} name="description"
                  onChange={this.onChangeDescription} className="add-new-post__editor mb-1" required />
            <FormRadio
                inline
                name="active"
                checked={this.state.active}
                onChange={() => {
                  this.changeActive();
                }}
              >
                Active
            </FormRadio>
            <FormInput size="lg" className="mb-3" placeholder="Job type" onChange={this.onChange} name="jobType" value={this.state.jobType} required />
            <label htmlFor="image">Image</label>
            <FormInput size="lg" className="mb-3" placeholder="Post image" type="file" name="image" onChange={this.onChangeFile} />


            <Card>
              <CardHeader>Skills</CardHeader>
              <CardBody>
                <ListGroup>
                {
                  this.state.skills.filter(skill => !skill.forDelete).map((skill, index) => {
                    return (
                      <ListGroupItem key={index}>
                        <Container>
                          <Row>
                            <Col>{skill.skill.name}</Col>
                            <Col>{skill.skillLevel}</Col>
                            <Col>
                              <ButtonToolbar className="text-right">
                                  <Button onClick={() => this.showEditSkillDialog(index)}><i className="material-icons">&#xE3C9;</i> Edit</Button>
                                  <Button theme="danger" onClick={() => this.askForDeleteSkillItem(index)}><i className="material-icons">&#xE872;</i> Delete</Button>
                              </ButtonToolbar>
                            </Col>
                          </Row>
                        </Container>
                      </ListGroupItem>
                    );
                  })
                }
                </ListGroup>
              </CardBody>
              <CardFooter>
                <Button block theme="success" onClick={this.openAddSkillDialog}>Add skill</Button>
              </CardFooter>
            </Card>
            <br />
            <div className="col-md-12 text-center ">
              <Button block type="submit" className=" btn btn-block mybtn btn-primary tx-tfm" disabled={this.state.isLoading}>Create job post</Button>
            </div>
            <br />
            {this.state.possibleDelete && <div className="col-md-12 text-center ">
              <Button block theme="danger" onClick={this.beforeDelete} className=" btn btn-block mybtn btn-primary tx-tfm" disabled={this.state.isLoading}><i className="material-icons">delete</i> Delete</Button>
            </div>}
            {this.state.errorMessage && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}
          </Form>
          {this.state.isLoading && <LinearProgress />}
        </CardBody>
      </Card>
    );
  }
}

export default PostForm;
