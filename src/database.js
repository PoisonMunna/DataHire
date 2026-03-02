// src/database.js - Simulated User Database

export const usersDatabase = [
  {
    id: 1,
    firstName: 'Triyesh',
    lastName: 'Pun',
    email: 'Trez@gmail.com',
    password: 'trez123',
    role: 'job-seeker',
    phone: '1234567890',
    skills: ['Python', 'Machine Learning', 'SQL'],
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    firstName: 'Mayank',
    lastName: 'Raj',
    email: 'mayank@gmail.com',
    password: 'mayank123',
    role: 'job-seeker',
    phone: '9876543210',
    skills: ['Data Analytics', 'Tableau', 'Excel'],
    createdAt: '2024-02-20'
  },
  {
    id: 3,
    firstName: 'Aditya',
    lastName: 'Deshwal',
    email: 'aditya@gmail.com',
    password: 'aditya123',
    role: 'job-seeker',
    phone: '5555555555',
    skills: ['Data Engineering', 'Spark', 'AWS'],
    createdAt: '2024-03-10'
  },
  {
    id: 4,
    firstName: 'Drishti',
    lastName: 'Tripathi',
    email: 'drishti@gmail.com',
    password: 'drishti123',
    role: 'recruiter',
    company: 'DataHire Inc.',
    createdAt: '2024-01-01'
  }
];

// Function to find user by email
export const findUserByEmail = (email) => {
  return usersDatabase.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};

// Function to validate login
export const validateLogin = (email, password) => {
  const user = findUserByEmail(email);
  
  if (!user) {
    return {
      success: false,
      message: 'No account found with this email address',
      user: null
    };
  }
  
  if (user.password !== password) {
    return {
      success: false,
      message: 'Incorrect password. Please try again.',
      user: null
    };
  }
  
  return {
    success: true,
    message: 'Login successful!',
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      skills: user.skills || [],
      company: user.company || null
    }
  };
};

// Function to check if email exists
export const emailExists = (email) => {
  return usersDatabase.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};

// Function to add new user (for registration)
export const addUser = (userData) => {
  const newUser = {
    id: usersDatabase.length + 1,
    ...userData,
    createdAt: new Date().toISOString().split('T')[0]
  };
  usersDatabase.push(newUser);
  return newUser;
};