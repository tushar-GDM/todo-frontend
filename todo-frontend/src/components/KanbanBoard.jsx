// KanbanBoard.jsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const API_BASE = 'https://backend.cicowp-ca.com/api';

const KanbanBoard = () => {
  

  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [editTaskId, setEditTaskId] = useState(null);
  const [activityLog, setActivityLog] = useState([]);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/getTasks.php`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 10000); // 🔁 Poll every 10 seconds
    return () => clearInterval(interval);
  }, [fetchTasks]);

  // Group by status
  const groupByStatus = () => {
    const groups = { todo: [], inprogress: [], done: [] };
    tasks.forEach(task => {
      const status = task.status || 'todo';
      if (groups[status]) groups[status].push(task);
    });
    return groups;
  };

  const grouped = groupByStatus();

  // Add/Edit Task
  const handleSubmitTask = async () => {
    if (!title.trim()) return alert('❗ Title is required.');
    const token = localStorage.getItem('token');
    const payload = { title, description, priority };
    const endpoint = editTaskId ? 'updateTask.php' : 'addTask.php';
    if (editTaskId) payload.task_id = editTaskId;

    try {
      const res = await axios.post(`${API_BASE}/${endpoint}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.data.status === 'success') {
        setActivityLog(log => [
          `✔️ ${editTaskId ? 'Edited' : 'Added'} task: "${title}"`,
          ...log,
        ]);
        setTitle('');
        setDescription('');
        setPriority('Medium');
        setEditTaskId(null);
        fetchTasks();
      } else {
        alert(res.data.msg || 'Something went wrong');
      }
    } catch (err) {
      console.error('Submit task error:', err);
    }
  };

  // Handle drag and drop
  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE}/updateTaskStatus.php`, {
        task_id: draggableId,
        new_status: destination.droppableId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setActivityLog(log => [
        `🔄 Moved task ID ${draggableId} to "${destination.droppableId}"`,
        ...log,
      ]);
      fetchTasks();
    } catch (err) {
      console.error('Drag error:', err);
    }
  };

  const handleEditClick = (task) => {
    setTitle(task.title);
    setDescription(task.description || '');
    setPriority(task.priority || 'Medium');
    setEditTaskId(task.id);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* 🔓 Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Kanban Board</h2>
        <button onClick={handleLogout} style={{ padding: '8px 14px', background: '#d9534f', color: '#fff', border: 'none' }}>Logout</button>
      </div>

      {/* ➕ Task Form */}
      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h4>{editTaskId ? '✏️ Edit Task' : '➕ Add Task'}</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ flex: '1 1 150px', padding: '8px' }} />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ flex: '1 1 200px', padding: '8px' }} />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: '8px' }}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button onClick={handleSubmitTask} style={{ padding: '8px 16px', background: '#5cb85c', color: '#fff', border: 'none' }}>
            {editTaskId ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      {/* 📋 Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['todo', 'inprogress', 'done'].map(status => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    flex: 1,
                    background: '#fff',
                    padding: '10px',
                    borderRadius: '10px',
                    minHeight: '300px',
                    border: '1px solid #ccc'
                  }}
                >
                  <h4 style={{ textAlign: 'center' }}>{status.toUpperCase()}</h4>
                  {grouped[status].map((task, index) => (
                    <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          style={{
                            background: '#fefefe',
                            margin: '10px 0',
                            padding: '10px',
                            borderRadius: '6px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            ...provided.draggableProps.style
                          }}
                        >
                          <strong>{task.title}</strong>
                          {task.description && <div style={{ fontSize: '0.9em', marginTop: '4px' }}>{task.description}</div>}
                          <div style={{ fontSize: '0.8em', color: '#999' }}>Priority: {task.priority}</div>
                          <button onClick={() => handleEditClick(task)} style={{ marginTop: '5px', padding: '4px 8px', fontSize: '0.8em' }}>✏️ Edit</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* 📝 Activity Log */}
      <div style={{ marginTop: '30px' }}>
        <h4>🕒 Activity Logs</h4>
        <ul style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto' }}>
          {activityLog.map((log, i) => (
            <li key={i} style={{ fontSize: '0.9em', marginBottom: '4px' }}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KanbanBoard;
