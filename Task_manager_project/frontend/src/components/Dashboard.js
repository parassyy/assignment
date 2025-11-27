import React, { useState, useEffect } from 'react';
import { taskAPI, authAPI } from '../services/api';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);

  const fetchTasks = async () => {
    try {
      let response;
      switch (activeTab) {
        case 'my_tasks':
          response = await taskAPI.getMyTasks();
          break;
        case 'assigned_tasks':
          response = await taskAPI.getAssignedTasks();
          break;
        default:
          response = await taskAPI.getTasks();
      }
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    if (user.is_admin) {
      try {
        const response = await authAPI.getProfile();
        // For demo, we'll create a mock users list
        // In real app, you'd have an endpoint to get all users
        setUsers([user]);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [activeTab]);

  const handleTaskUpdate = () => {
    fetchTasks();
  };

  const handleTaskCreated = () => {
    setShowTaskForm(false);
    fetchTasks();
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: '2px solid #eee'
      }}>
        <div>
          <h1>Task Manager Dashboard</h1>
          <p style={{ color: '#666', margin: 0 }}>
            Welcome, {user.username}!
            {user.is_admin && ' (Admin)'}
          </p>
        </div>
        <button
          onClick={() => setShowTaskForm(!showTaskForm)}
          style={{
            backgroundColor: showTaskForm ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {showTaskForm ? 'Cancel' : 'Create Task'}
        </button>
      </div>

      {showTaskForm && (
        <TaskForm 
          onTaskCreated={handleTaskCreated}
          users={users}
        />
      )}

      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '10px',
          borderBottom: '1px solid #ddd',
          paddingBottom: '10px'
        }}>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              backgroundColor: activeTab === 'all' ? '#007bff' : 'transparent',
              color: activeTab === 'all' ? 'white' : '#007bff',
              border: '1px solid #007bff',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            All Tasks
          </button>
          <button
            onClick={() => setActiveTab('my_tasks')}
            style={{
              backgroundColor: activeTab === 'my_tasks' ? '#007bff' : 'transparent',
              color: activeTab === 'my_tasks' ? 'white' : '#007bff',
              border: '1px solid #007bff',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            My Created Tasks
          </button>
          <button
            onClick={() => setActiveTab('assigned_tasks')}
            style={{
              backgroundColor: activeTab === 'assigned_tasks' ? '#007bff' : 'transparent',
              color: activeTab === 'assigned_tasks' ? 'white' : '#007bff',
              border: '1px solid #007bff',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Assigned to Me
          </button>
        </div>
      </div>

      <TaskList 
        tasks={tasks} 
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskUpdate}
        user={user}
      />
    </div>
  );
};

export default Dashboard;