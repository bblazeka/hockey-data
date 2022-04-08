import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

export default function QuestionModal( props ) {
  return (
    <Modal
      onClose={props.onClose}
      onOpen={props.onOpen}
      open={props.open}
      trigger={props.trigger}
    >
    <Modal.Header>Delete all</Modal.Header>
      <Modal.Content>
        Are you sure you want to delete all?
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' onClick={(e) => props.onClose(e, false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' onClick={(e) => props.onClose(e, true)}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}