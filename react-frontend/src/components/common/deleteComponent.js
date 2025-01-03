import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteModal({ show, onHide, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this task? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
