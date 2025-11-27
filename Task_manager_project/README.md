# Task Manager - Backend Developer Assignment

A secure, scalable task management system with JWT authentication and role-based access control.

## Features

- **User Authentication**: JWT-based registration and login
- **Role-Based Access**: User and Admin roles with different permissions
- **Task Management**: Full CRUD operations for tasks
- **API Documentation**: Swagger UI for API exploration
- **React Frontend**: Simple UI to interact with the backend

## Tech Stack

### Backend
- Django & Django REST Framework
- MySQL Database
- JWT Authentication
- Swagger Documentation

### Frontend
- React.js
- Axios for API calls
- React Router

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- MySQL 8.0+

### Backend Setup
1. Navigate to backend directory
2. Create virtual environment: `python -m venv venv`
3. Activate virtual environment
4. Install dependencies: `pip install -r requirements.txt`
5. Configure MySQL database in `settings.py`
6. Run migrations: `python manage.py migrate`
7. Create superuser: `python manage.py createsuperuser`
8. Start server: `python manage.py runserver`

### Frontend Setup
1. Navigate to frontend directory
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## API Endpoints

- `POST /api/v1/auth/register/` - User registration
- `POST /api/v1/auth/login/` - User login
- `GET /api/v1/auth/profile/` - User profile
- `GET/POST /api/v1/tasks/` - List/Create tasks
- `GET/PUT/DELETE /api/v1/tasks/{id}/` - Task operations

## Access Points

- Backend API: http://localhost:8000
- Frontend App: http://localhost:3000
- Admin Panel: http://localhost:8000/admin
- API Docs: http://localhost:8000/swagger

## Assignment Requirements Check

- [x] User registration & login with JWT
- [x] Role-based access control
- [x] CRUD APIs for tasks
- [x] API versioning & validation
- [x] Swagger documentation
- [x] MySQL database
- [x] React frontend integration
- [x] Secure JWT handling
- [x] Input validation
- [x] Scalable project structure




## superuser
   user : paras
   password:pass123