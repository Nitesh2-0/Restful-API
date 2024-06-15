# User Authentication API

This is a RESTful API for user authentication, allowing users to register, log in, and access their profile if authorized.

## Features

- User Registration
- User Login
- Access to Profile for Authorized Users Only

## Tech Stack
- Nodejs
- Expressjs
- mysql2

## Endpoints

### Register User

**URL:** `http://localhost:3000/register`  
**Method:** `POST`  

### Login User

**URL:** `http://localhost:3000/login`  
**Method:** `POST`  

### Profile

**URL:** `http://localhost:3000/profile`  
**Method:** `GET`  

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

```javascript
git clone https://github.com/Nitesh2-0/Restfull-API.git
```

```javascript
npm install 
```

