// backend/middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ===== Create uploads folder if it doesn't exist =====
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

// ===== Storage Configuration =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Clean the original filename
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `resume-${uniqueSuffix}${ext}`);
  }
});

// ===== File Filter — Only PDF and DOCX =====
const fileFilter = (req, file, cb) => {
  console.log('📎 Received file:', file.originalname);
  console.log('📎 MIME type:', file.mimetype);

  const allowedMimeTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // Some systems send these MIME types instead
    'application/x-pdf',
    'application/acrobat',
    'application/vnd.pdf',
    'text/pdf',
    'text/x-pdf'
  ];

  const allowedExtensions = ['.pdf', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
    console.log('✅ File accepted');
    cb(null, true);
  } else {
    console.log('❌ File rejected');
    cb(new Error(`Invalid file type: ${file.mimetype}. Only PDF and DOCX are allowed.`), false);
  }
};

// ===== Multer Instance =====
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
    files: 1                     // Only 1 file at a time
  }
});

module.exports = upload;