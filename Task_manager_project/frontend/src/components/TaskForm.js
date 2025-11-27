import React, { useState } from 'react';
import { taskAPI } from '../services/api';

const TaskForm = ({ onTaskCreated, users = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    due_date: '',
    assigned_to: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const taskData = {
        ...formData,
        assigned_to: formData.assigned_to || null
      };
      
      await taskAPI.createTask(taskData);
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: '',
        assigned_to: ''
      });
      onTaskCreated();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      backgroundColor: 'white'
    }}>
      <h3>Create New Task</h3>
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffe6e6',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div style={{ flex: 1 }}>
            <label>Priority:</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <label>Due Date:</label>
            <input
              type="datetime-local"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
          
          {users.length > 0 && (
            <div style={{ flex: 1 }}>
              <label>Assign To:</label>
              <select
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
                disabled={loading}
                style={{ 
                  width: '100%', 
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              >
                <option value="">Unassigned</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username} ({user.role})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating Task...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;