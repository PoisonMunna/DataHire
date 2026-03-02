// backend/routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Ranking Points Configuration
const EXPERIENCE_POINTS = {
  'entry': 10,
  'mid': 25,
  'senior': 40,
  'lead': 50
};

const EDUCATION_POINTS = {
  'high-school': 5,
  'bachelors': 15,
  'masters': 25,
  'phd': 35,
  'bootcamp': 10
};

const SKILL_POINTS = 5; // Points per skill

// Calculate ranking points for a candidate
const calculateRankingPoints = (application) => {
  let points = 0;
  
  // Experience points
  points += EXPERIENCE_POINTS[application.experienceLevel] || 0;
  
  // Education points
  points += EDUCATION_POINTS[application.education] || 0;
  
  // Skills points (5 points per skill)
  points += (application.skills?.length || 0) * SKILL_POINTS;
  
  return points;
};

// @route   POST /api/applications
// @desc    Submit a new job application
router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      experienceLevel,
      skills,
      education,
      linkedIn,
      portfolio,
      coverLetter,
      relocate,
      startDate
    } = req.body;

    // Check if already applied
    const existingApplication = await Application.findOne({ 
      email: email.toLowerCase(), 
      position 
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this position'
      });
    }

    // Create new application
    const application = new Application({
      firstName,
      lastName,
      email,
      phone,
      position,
      experienceLevel,
      skills,
      education,
      linkedIn,
      portfolio,
      coverLetter,
      relocate,
      startDate
    });

    const savedApplication = await application.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: savedApplication
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/applications
// @desc    Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ appliedAt: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/applications/ranked
// @desc    Get all applications ranked by points
router.get('/ranked', async (req, res) => {
  try {
    const { position } = req.query;
    
    // Build query
    let query = {};
    if (position && position !== 'all') {
      query.position = position;
    }

    const applications = await Application.find(query);

    // Calculate points and add to each application
    const rankedApplications = applications.map(app => {
      const experiencePoints = EXPERIENCE_POINTS[app.experienceLevel] || 0;
      const educationPoints = EDUCATION_POINTS[app.education] || 0;
      const skillsPoints = (app.skills?.length || 0) * SKILL_POINTS;
      const totalPoints = experiencePoints + educationPoints + skillsPoints;

      return {
        _id: app._id,
        firstName: app.firstName,
        lastName: app.lastName,
        email: app.email,
        phone: app.phone,
        position: app.position,
        experienceLevel: app.experienceLevel,
        education: app.education,
        skills: app.skills,
        linkedIn: app.linkedIn,
        portfolio: app.portfolio,
        relocate: app.relocate,
        appliedAt: app.appliedAt,
        points: {
          experience: experiencePoints,
          education: educationPoints,
          skills: skillsPoints,
          total: totalPoints
        }
      };
    });

    // Sort by total points (highest first)
    rankedApplications.sort((a, b) => b.points.total - a.points.total);

    // Add rank
    rankedApplications.forEach((app, index) => {
      app.rank = index + 1;
    });

    res.status(200).json({
      success: true,
      count: rankedApplications.length,
      pointsSystem: {
        experience: EXPERIENCE_POINTS,
        education: EDUCATION_POINTS,
        skillsPerItem: SKILL_POINTS
      },
      data: rankedApplications
    });

  } catch (error) {
    console.error('Error fetching ranked applications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/applications/stats
// @desc    Get statistics for dashboard
router.get('/stats', async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const dataScience = await Application.countDocuments({ position: 'data-science' });
    const dataAnalytics = await Application.countDocuments({ position: 'data-analytics' });
    const dataEngineer = await Application.countDocuments({ position: 'data-engineer' });

    res.status(200).json({
      success: true,
      data: {
        total: totalApplications,
        byPosition: {
          'data-science': dataScience,
          'data-analytics': dataAnalytics,
          'data-engineer': dataEngineer
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/applications/:id
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/applications/:id
router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;