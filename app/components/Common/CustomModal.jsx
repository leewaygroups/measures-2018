import React from 'react';
import { Button, Popover, Tooltip, Modal, OverlayTrigger } from 'react-bootstrap';

export default class CustomModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props.article = {}
  }

  render() {

    if (!this.props.show){
      return null;
    }else{
      return (
        <div>
          <Modal backdrop={true} animation={false} show={this.props.show} onHide={this.props.closeAction}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{this.props.article.title}</h4>
              <p>
                {this.props.article.shortdescr}
              </p>
              <hr />

              <h4>Abstract.</h4>
              <p>
                {this.props.article.description}
              </p>
              <p>
                {this.props.article.description}
              </p>
              <p>
                {this.props.article.description}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={this.props.downloadAction}>Download full article</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
}