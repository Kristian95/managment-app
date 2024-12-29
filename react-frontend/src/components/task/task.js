// src/Tasks.js
import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import useTasks from '../../hooks/useTasks';
import TaskForm from './taskForm';
import DeleteModal from '../common/deleteComponent';
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";

export function Tasks() {
  const { tasks, addTask, deleteTask, completeTask, editTask } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] =  useState(null);

  const handleHideModal = () => setShowModal(false);

  const handleShowModal = (task = null) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleFormSubmit = (task) => {
    if (task.id) {
      editTask(task);
    } else {
      addTask(task);
    }
    setShowModal(false);
    setEditingTask(null);
  };

  // Show the delete confirmation modal
  const handleShowDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  // Hide the delete confirmation modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  // Confirm the deletion
  const handleConfirmDelete = () => {
    deleteTask(taskToDelete);  // Call deleteTask from the custom hook
    setShowDeleteModal(false);  // Close the modal after deletion
  };

  // State for viewing task details
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingTask, setViewingTask] = useState(null);

  const handleShowViewModal = (task) => {
    setViewingTask(task);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewingTask(null);
  };

  return (
    <div>
        {/* Button to open TaskForm modal */}
        <Button variant="primary" onClick={() => handleShowModal()} style={{ marginBottom: '20px' }}>
            Add New Task
        </Button>
        {/* Task Form for adding tasks */}
        <TaskForm show={showModal} task={editingTask} addTask={addTask} onHide={handleHideModal} onSubmit={handleFormSubmit} />

        {/* Bootstrap Table */}
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Task</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {tasks.map((task) => (
            <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                <Button
                    variant={task.completed ? 'success' : 'secondary'}  // Yellow button for "Completed"
                    style={{ marginRight: '10px' }}
                >
                {task.completed ? 'Yes' : 'No'}
                </Button>
                </td>
                <td>
                <Button
                    variant="warning"  // Yellow button for "Completed"
                    style={{ marginRight: '10px' }}
                    onClick={() => completeTask(task.id)}
                >
                    {task.completed ? 'Undo' : 'Complete'}
                </Button>
                <Button
                    variant="info"
                    style={{ marginRight: '10px' }}
                    onClick={() => handleShowViewModal(task)}
                >
                    <AiFillEye />View
                </Button>
                <Button
                    variant="secondary"
                    style={{ marginRight: '10px' }}
                    onClick={() => handleShowModal(task)}
                >
                    <AiFillEdit />Edit
                </Button>
                <Button
                    variant="danger"
                    style={{ marginRight: '10px' }}
                    onClick={() => handleShowDeleteModal(task.id)}
                >
                    <AiFillDelete />Delete
                </Button>
                </td>
            </tr>
            ))}
        </tbody>
        </Table>
              {/* Delete Confirmation Modal */}
        <DeleteModal
            show={showDeleteModal}
            onHide={handleCloseDeleteModal}
            onConfirm={handleConfirmDelete}
        />

        {/* View Details Modal */}
        <Modal show={showViewModal} onHide={handleCloseViewModal}>
          <Modal.Header closeButton>
            <Modal.Title>Task Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {viewingTask && (
              <div>
                <p><strong>ID:</strong> {viewingTask.id}</p>
                <p><strong>Title:</strong> {viewingTask.title}</p>
                <p><strong>Description:</strong> {viewingTask.description}</p>
                <p><strong>Completed:</strong> {viewingTask.completed ? 'Yes' : 'No'}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default Tasks;
