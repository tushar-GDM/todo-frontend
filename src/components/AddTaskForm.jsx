// src/components/AddTaskForm.jsx
import React, { useState } from 'react';
import api from './api';

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');

  const handleAdd = async () => {
    try {
      await api.post('/addTask.php', { title }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTitle('');
      onTaskAdded();
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        placeholder="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default AddTaskForm;
