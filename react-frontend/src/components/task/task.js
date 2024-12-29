// src/Tasks.js
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import useTasks from '../../hooks/useTasks';
import TaskForm from './taskForm';
import DeleteModal from '../common/deleteComponent';
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

function Tasks() {
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
    </div>
  );
}

export default Tasks;
