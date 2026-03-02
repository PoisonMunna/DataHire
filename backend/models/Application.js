// backend/models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },

  // Position Details
  position: {
    type: String,
    required: [true, 'Position is required'],
    enum: ['data-science', 'data-analytics', 'data-engineer']
  },
  experienceLevel: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['entry', 'mid', 'senior', 'lead']
  },

  // Skills
  skills: {
    type: [String],
    required: [true, 'At least one skill is required']
  },

  // Education
  education: {
    type: String,
    required: [true, 'Education is required'],
    enum: ['high-school', 'bachelors', 'masters', 'phd', 'bootcamp']
  },

  // Additional Information
  linkedIn: {
    type: String,
    trim: true,
    default: ''
  },
  portfolio: {
    type: String,
    trim: true,
    default: ''
  },
  coverLetter: {
    type: String,
    trim: true,
    default: ''
  },
  relocate: {
    type: String,
    enum: ['yes', 'no', 'remote'],
    required: true
  },
  startDate: {
    type: String,
    default: ''
  },

  // ===== NEW: Resume Upload Fields =====
  resumeFile: {
    originalName: { type: String, default: '' },
    savedName:    { type: String, default: '' },
    size:         { type: Number, default: 0 },
    path:         { type: String, default: '' }
  },
  resumeParsedSummary: {
    type: String,
    default: ''
  },
  wasAutofilled: {
    type: Boolean,
    default: false
  },

  // Metadata (your existing fields kept as-is)
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);