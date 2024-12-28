// /src/api/taskApi.js

const API_URL = 'http://localhost:4000/todos';

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
