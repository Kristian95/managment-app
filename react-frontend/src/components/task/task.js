// src/Tasks.js
import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import useTasks from '../../hooks/useTasks';
import TaskForm from './taskForm';
import DeleteModal from '../common/deleteComponent';
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";

export function Tasks() {
  const { tasks, addTask, deleteTask, completeTask, editTask } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] =  useState(null);

  const [selectedTasks, setSelectedTasks] = useState([]); // State for selected tasks

  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [filterCompleted, setFilterCompleted] = useState('All'); //

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

  // Bulk Action Handlers
  const handleBulkComplete = () => {
    selectedTasks.forEach((taskId) => completeTask(taskId));
    setSelectedTasks([]);
  };

  const handleBulkDelete = () => {
    selectedTasks.forEach((taskId) => deleteTask(taskId));
    setSelectedTasks([]);
  };

  const handleSelectTask = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map((task) => task.id));
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterCompleted === 'All' ||
      (filterCompleted === 'Completed' && task.completed) ||
      (filterCompleted === 'Pending' && !task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
        {/* Button to open TaskForm modal */}
        <Button variant="primary" onClick={() => handleShowModal()} style={{ marginBottom: '20px' }}>
            Add New Task
        </Button>

        {/* Bulk Actions */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <Button
          variant="success"
          onClick={handleBulkComplete}
          disabled={selectedTasks.length === 0}
        >
          Complete Selected
        </Button>
        <Button
          variant="danger"
          onClick={handleBulkDelete}
          disabled={selectedTasks.length === 0}
        >
          Delete Selected
        </Button>
      </div>

        {/* Search and Filter */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Form.Control
            type="text"
            placeholder="Search title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '300px' }}
          />
          <Form.Select
            value={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="All">All Tasks</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </Form.Select>
        </div>
        {/* Task Form for adding tasks */}
        <TaskForm show={showModal} task={editingTask} addTask={addTask} onHide={handleHideModal} onSubmit={handleFormSubmit} />

        {/* Bootstrap Table */}
        <Table striped bordered hover>
        <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  checked={selectedTasks.length === tasks.length && tasks.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th>#</th>
              <th>Task</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleSelectTask(task.id)}
                />
                </td>
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
