import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Col} from "shards-react";

class AppModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    if(this.props.onClose) {
      this.props.onClose();
    }

    if(!this.props.onClose) {
      this.props.accept();
    }

    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Modal open={open} toggle={this.toggle}>
          <ModalHeader>{this.props.dialogTitle}</ModalHeader>
          <ModalBody>
            {this.props.dialogContent}
          </ModalBody>
          <ModalFooter>
            <Container>
              <Row>
                <Col>
                  <Button block theme="success" className=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.props.accept}>OK</Button>
                </Col>
                {this.props.onClose && <Col>
                  <Button block className=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.toggle}>Cancel</Button>
                </Col>}
              </Row>
            </Container>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AppModal;
