// src/TaskForm.js
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function TaskForm({ show, onHide, addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      addTask({ title, description });
      setTitle('');
      setDescription('');
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="taskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>

          <Form.Group controlId="taskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
            Add Task
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TaskForm;
