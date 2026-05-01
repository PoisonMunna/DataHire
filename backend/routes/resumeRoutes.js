// backend/routes/resumeRoutes.js
const express = require('express');
const multer = require('multer');   // ✅ FIX: Added this import
const router = express.Router();
const upload = require('../middleware/upload');
const { parseResume } = require('../controllers/resumeController');

// POST /api/resume/parse
router.post('/parse', (req, res, next) => {
  console.log('\n📤 Resume upload request received');
  console.log('Content-Type:', req.headers['content-type']);

  upload.single('resume')(req, res, (err) => {
    if (err) {
      console.error('❌ Multer error:', err.message);

      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File is too large. Maximum size is 10MB.'
          });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({
            success: false,
            message: 'Only one file can be uploaded at a time.'
          });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({
            success: false,
            message: 'Unexpected field name. Use "resume" as the field name.'
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`
        });
      }

      return res.status(400).json({
        success: false,
        message: err.message || 'Invalid file type. Only PDF and DOCX are allowed.'
      });
    }

    if (!req.file) {
      console.error('❌ No file in request');
      return res.status(400).json({
        success: false,
        message: 'No file received. Please select a PDF or DOCX file.'
      });
    }

    console.log('✅ File saved:', req.file.filename);
    console.log('📁 Path:', req.file.path);
    console.log('📏 Size:', (req.file.size / 1024).toFixed(1), 'KB');

    parseResume(req, res, next);
  });
});

// Test route
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: '📄 Resume upload endpoint is working!',
    openaiKey: process.env.OPENAI_API_KEY ? 'Configured ✅' : 'MISSING ❌',
    uploadsDir: require('path').join(__dirname, '..', 'uploads')
  });
});

module.exports = router;
