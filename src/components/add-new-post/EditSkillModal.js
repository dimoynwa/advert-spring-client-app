import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter,
     FormGroup, FormInput, FormFeedback, FormSelect, Container, Row, Col} from "shards-react";

class EditSkillModal extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      open: true,
      data : {
        name: '',
        skillLevel: ''
      },
      existingSkills : props.existingSkills,
    };
    if(props.data) {
      this.state = {
        open: true,
        data : {
          name: props.data.skill.name,
          skillLevel: props.data.skillName,
        },
        existingSkills :  props.existingSkills.filter(name => {
          return name !== props.data.skill.name;
        }),
      };
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
    this.props.close();
  }

  onChangeName(e){
    this.setState({data: Object.assign(this.state.data,{[e.target.name]:e.target.value})});
  }

  submit() {
    if(!this.state.data.skillLevel) {
      this.setState({data: Object.assign(this.state.data,{'skillLevel': 'NEW'})}, () => {this.props.submit(this.state.data);});
    } else {
      this.props.submit(this.state.data);
    }
  }

  render() {
    const { open } = this.state;

    return (
      <div>
        <Modal open={open} toggle={this.toggle}>
          <ModalHeader>Edit/Create skill</ModalHeader>
          <ModalBody>
            <FormGroup>
                <FormInput placeholder="Skill name"
                  name="name"
                  value={this.state.data.name}
                  onChange={this.onChangeName}
                  required
                  invalid={this.state.existingSkills.includes(this.state.data.name)}
                  />
                <FormFeedback>The skill is already added.</FormFeedback>
            </FormGroup>
            <FormGroup>
              <FormSelect name="skillLevel" value={this.state.data.skillLevel} onChange={this.onChangeName}>
                <option value="NEW">New</option>
                <option value="MEDIUM">Medium</option>
                <option value="EXPERT">Expert</option>
              </FormSelect>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Container>
              <Row>
                <Col>
                  <Button block theme="success" className=" btn btn-block mybtn btn-primary tx-tfm" disabled={this.state.existingSkills.includes(this.state.data.name) || !this.state.data.name} onClick={this.submit}>Submit</Button>
                </Col>
                <Col>
                  <Button block className=" btn btn-block mybtn btn-primary tx-tfm" disabled={this.state.isLoading} onClick={this.toggle}>Cancel</Button>
                </Col>
              </Row>
            </Container>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditSkillModal;
