import React from 'react';
import { taskAPI } from '../services/api';

const TaskList = ({ tasks, onTaskUpdate, onTaskDelete, user }) => {
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskAPI.updateStatus(taskId, newStatus);
      onTaskUpdate();
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status');
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        onTaskUpdate();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'in_progress': return '#ffc107';
      case 'pending': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div>
      <h3>Tasks ({tasks.length})</h3>
      {tasks.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6c757d', margin: '20px 0' }}>
          No tasks found.
        </p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} style={{ 
            border: '1px solid #ddd', 
            padding: '20px', 
            margin: '15px 0',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{task.title}</h4>
                <p style={{ margin: '0 0 15px 0', color: '#666' }}>{task.description}</p>
                
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div>
                    <strong>Status: </strong>
                    <select 
                      value={task.status} 
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      style={{ 
                        marginLeft: '5px',
                        padding: '5px',
                        border: `2px solid ${getStatusColor(task.status)}`,
                        borderRadius: '4px'
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  
                  <div>
                    <strong>Priority: </strong>
                    <span style={{ 
                      color: getPriorityColor(task.priority),
                      fontWeight: 'bold'
                    }}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <div>
                    <strong>Due: </strong>
                    <span>
                      {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                    </span>
                  </div>
                </div>
                
                <div style={{ marginTop: '10px', fontSize: '14px', color: '#6c757d' }}>
                  <strong>Created by:</strong> {task.created_by.username} | 
                  <strong> Assigned to:</strong> {task.assigned_to ? task.assigned_to.username : 'Unassigned'} |
                  <strong> Created:</strong> {new Date(task.created_at).toLocaleDateString()}
                </div>
              </div>
              
              {(user.is_admin || task.created_by.id === user.id) && (
                <button 
                  onClick={() => handleDelete(task.id)}
                  style={{ 
                    marginLeft: '15px', 
                    color: 'white',
                    backgroundColor: '#dc3545',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;