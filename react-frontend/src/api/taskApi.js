// /src/api/taskApi.js

const API_URL = 'http://localhost:4000/tasks';

// Fetch tasks from the API
export const fetchTasksFromApi = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const data = await response.json();
    return data;  // Return the fetched tasks
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];  // Return an empty array on error
  }
};

// edit task api
export const handleEditTaskApi = async (task) => {
  try {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      return updatedTask;
    } else {
      console.error('Failed to edit task');
    }
  } catch (error) {
    console.error('Error edit task:', error);
    return null;
  }
}

// Add a new task to the API
export const addTaskToApi = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) throw new Error('Failed to add task');
    const newTask = await response.json();
    return newTask;  // Return the newly added task
  } catch (error) {
    console.error('Error adding task:', error);
    return null;  // Return null if the task couldn't be added
  }
};

// Delete a task from the API
export const deleteTaskFromApi = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete task');
    return id;  // Return the id of the deleted task
  } catch (error) {
    console.error('Error deleting task:', error);
    return null;  // Return null if the task couldn't be deleted
  }
};

// Complete a task from the API
export const handleToggleCompleteApi = async (taskId) => {
  try {
    const response = await fetch(`http://localhost:4000/task/${taskId}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const updatedTask = await response.json();
      return updatedTask;
    } else {
      console.error('Failed to update task');
    }
  } catch (error) {
    console.error('Error completing task:', error);
  }
};
