import React, { useState } from 'react';

// Task component to render individual tasks
const Task = ({ task, onDelete, onComplete }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onComplete(task.id)}
        style={{ marginRight: '10px' }}
      />
      <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</p>
      <button onClick={() => onDelete(task.id)} style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </div>
  );
};

// Main component for the To-Do List project
const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  // Function to handle input change
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to mark a task as completed
  const handleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#007bff' }}>To-Do List</h1>

      {/* Task input form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Add a new task..."
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ced4da',
            marginRight: '10px',
          }}
        />
        <button type="submit" style={{ backgroundColor: '#007bff', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
          Add Task
        </button>
      </form>

      {/* Render tasks */}
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={handleDelete} onComplete={handleComplete} />
      ))}
    </div>
  );
};

export default ToDoList;
