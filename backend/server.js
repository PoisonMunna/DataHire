// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Load .env FIRST
require('dotenv').config();

const app = express();

// MongoDB Atlas
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas Connected Successfully!');
    console.log(`📦 Database: ${process.env.MONGO_DBNAME}`);
  })
  .catch((error) => {
    console.error('❌ MongoDB Atlas Connection Error:', error.message);
  });

// CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));

// Home route
app.get('/', (req, res) => {
  res.json({ message: '🚀 DataHire API is running!' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Global error:', err.message);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📄 Resume upload: POST http://localhost:${PORT}/api/resume/parse`);
  console.log(`🧪 Test upload:   GET  http://localhost:${PORT}/api/resume/test`);
});