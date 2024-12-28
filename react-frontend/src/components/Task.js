// src/Tasks.js
import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import useTasks from '../hooks/useTasks';

function Tasks() {
  const { tasks, newTask, addTask, deleteTask, completeTask, handleNewTaskChange } = useTasks();

  return (
    <div>
      {/* Input for adding tasks */}
      <div style={{ marginBottom: '10px' }}>
        <Form.Control
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <Button
          variant="primary"
          style={{ marginTop: '10px' }}
          onClick={addTask}
        >
          Add Task
        </Button>
      </div>

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
              <td style={{ backgroundColor: task.completed ? 'green' : 'pink' }}>
                {task.completed ? 'Yes' : 'No'}
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
                  variant="danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Tasks;
