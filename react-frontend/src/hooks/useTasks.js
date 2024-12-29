// /src/hooks/useTasks.js
import { useState, useEffect } from 'react';
import {
  fetchTasksFromApi,
  addTaskToApi,
  deleteTaskFromApi,
  handleToggleCompleteApi
} from '../api/taskApi';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const tasksData = await fetchTasksFromApi();
      setTasks(tasksData);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTaskApi = async (data) => {
    try {
      const updatedTask = await handleEditTaskApi(data);

      if (updatedTask) {
        // setTasks((prevTasks) =>
        //   prevTasks.map((task) =>
        //     task.id === id ? { ...task, title: updatedTask.title, description: updatedTask.description } : task
        //   )
        // );
      } else {
        console.error('Failed to edit task. No task returned.');
      }
    } catch (err) {
      setError('Failed to edit task');
    }
  }

  // Add a new task
  const addTask = async (data) => {  
    if (!data.title || !data.description) {
      console.error('Incorect data.');
      return;
    }
  
    try {
      const newTaskResponse = await addTaskToApi(data);
  
      if (newTaskResponse) {
        setTasks((prevTasks) => [...prevTasks, newTaskResponse]);
      } else {
        console.error('Failed to add task. No task returned.');
      }
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await deleteTaskFromApi(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const completeTask = async (id) => {
    try {
      const updatedTask = await handleToggleCompleteApi(id);

      if (updatedTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, completed: updatedTask.completed } : task
          )
        );
      } else {
        console.error('Failed to complete task. No task returned.');
      }
    } catch (err) {
      setError('Failed to complete task');
    }
  };


  return {
    tasks,
    loading,
    error,
    addTask,
    deleteTask,
    fetchTasks,
    completeTask
  };
};

export default useTasks;
