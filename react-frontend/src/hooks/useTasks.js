// /src/hooks/useTasks.js
import { useState, useEffect } from 'react';
import {
  fetchTasksFromApi,
  addTaskToApi,
  deleteTaskFromApi,
} from '../api/taskApi';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState('');

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

  // Add a new task
  const addTask = async () => {  
    console.log(newTask);
    if (newTask.trim() === '') {
      return;
    }

    const task = { title: newTask };
  
    try {
      const newTaskResponse = await addTaskToApi(task);
  
      if (newTaskResponse) {
        setTasks((prevTasks) => [...prevTasks, newTaskResponse]);
        setNewTask('')
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
    console.log(id)
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };


  return {
    tasks,
    loading,
    error,
    addTask,
    deleteTask,
    fetchTasks,
    completeTask,
    handleNewTaskChange
  };
};

export default useTasks;
