# 💼 DataHire — AI-Powered Job Application Platform

<div align="center">

![DataHire Banner](https://img.shields.io/badge/DataHire-AI%20Powered-blue?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**A modern, full-stack job application platform for data professionals.**
**Upload your resume, let AI auto-fill your application, and land your dream data career.**

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Folder Structure](#-folder-structure)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🚀 About

**DataHire** is an AI-powered job application platform built for data professionals — Data Scientists, Data Analysts, and Data Engineers. It streamlines the hiring process by allowing candidates to upload their resumes (PDF/DOCX), which are then intelligently parsed by **OpenAI GPT** to auto-fill application forms.

The platform features a bilingual interface (English/Hindi), three accessible themes (Light, Dark, High Contrast), responsive UI/UX, Firebase authentication, and MongoDB Atlas for secure cloud-based data storage.

> **300-char summary:** DataHire is an AI-powered job application platform built with React, Node.js, Express, MongoDB Atlas, and Firebase. Features smart resume parsing via OpenAI, auto-form filling, bilingual support (EN/HI), 3 themes (Light/Dark/High Contrast), responsive UI/UX, and REST API architecture.

---

## ✨ Features

### 🤖 AI-Powered Resume Parsing
- Upload PDF or DOCX resumes
- Drag & drop file upload interface
- OpenAI GPT extracts structured data automatically
- Smart fallback to keyword-based parsing if AI fails
- Auto-fills: Name, Email, Phone, Skills, Education, Experience, LinkedIn, GitHub

### 📝 Smart Application Form
- Position selection: Data Science, Data Analytics, Data Engineer
- Experience level detection (Entry/Mid/Senior/Lead)
- Skill matching against predefined skill sets
- Real-time form validation
- Cover letter & additional information fields

### 🌐 Bilingual Support
- Full English (EN) interface
- Full Hindi (हिंदी) interface
- One-click language toggle
- All labels, placeholders, errors, and messages translated

### 🎨 Three Accessible Themes
- ☀️ **Light Theme** — Clean, professional look
- 🌙 **Dark Theme** — Easy on the eyes
- 👁️ **High Contrast** — WCAG accessible with bold colors

### 🔐 Authentication
- Firebase Authentication integration
- Job Seeker login flow
- Recruiter login flow
- Persistent sessions via localStorage

### 📱 Fully Responsive
- Desktop, tablet, and mobile optimized
- Responsive navigation with mobile menu
- Touch-friendly dropzone for resume upload
- Adaptive architecture diagram

### 🏗️ Production-Ready Architecture
- RESTful API design
- MongoDB Atlas cloud database
- Multer file upload middleware
- Global error handling
- Input validation and sanitization

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) | Component-based UI with hooks |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | JavaScript runtime |
| **Framework** | ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | REST API server |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | Cloud NoSQL database (Atlas) |
| **Auth** | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black) | Authentication & cloud services |
| **AI** | ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white) | Resume parsing (GPT-4o-mini) |
| **File Upload** | ![Multer](https://img.shields.io/badge/Multer-FF6C37?style=flat) | PDF/DOCX file handling |
| **PDF Parsing** | ![PDF](https://img.shields.io/badge/pdf--parse-red?style=flat) | Text extraction from PDFs |
| **DOCX Parsing** | ![Mammoth](https://img.shields.io/badge/Mammoth-blue?style=flat) | Text extraction from DOCX |

---

## 🏗️ Architecture
┌─────────────────────────────────────────────────────────────┐
│ USER (Browser) │
└─────────────────────┬───────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ REACT FRONTEND │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │ Intro │ │ Login │ │ Form │ │ Resume │ │
│ │ Page │ │ Pages │ │ Page │ │ Upload │ │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│ │
│ 🎨 3 Themes (Light/Dark/High-Contrast) │
│ 🌐 2 Languages (English/Hindi) │
│ 📱 Fully Responsive │
└─────────────────────┬───────────────────────────────────────┘
│ REST API (HTTP)
▼
┌─────────────────────────────────────────────────────────────┐
│ EXPRESS + NODE.js BACKEND │
│ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ Application │ │ Resume │ │ Multer │ │
│ │ Routes │ │ Routes │ │ Middleware │ │
│ └──────┬───────┘ └──────┬───────┘ └──────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ ┌──────────────┐ ┌──────────────┐ │
│ │ Application │ │ Resume │ │
│ │ Controller │ │ Controller │ │
│ └──────────────┘ └──────┬───────┘ │
│ │ │
│ ┌──────┴──────┐ │
│ ▼ ▼ │
│ ┌──────────┐ ┌──────────┐ │
│ │ OpenAI │ │ Fallback │ │
│ │ GPT API │ │ Parser │ │
│ └──────────┘ └──────────┘ │
└──────────┬──────────────────────┬───────────────────────────┘
│ │
▼ ▼
┌──────────────────┐ ┌──────────────────┐
│ MongoDB Atlas │ │ Firebase │
│ ┌────────────┐ │ │ ┌────────────┐ │
│ │Applications│ │ │ │ Auth │ │
│ │ Collection│ │ │ │ Service │ │
│ └────────────┘ │ │ └────────────┘ │
│ ┌────────────┐ │ │ │
│ │ Resume │ │ └──────────────────┘
│ │ Files │ │
│ └────────────┘ │
└──────────────────┘

text


---

## 📸 Screenshots

### Landing Page (Light Theme)
┌──────────────────────────────────────────┐
│ 💼 DataHire Features | Jobs | Tech │
│ │
│ Find Your Dream │
│ Data Career │
│ │
│ [🎯 Find Jobs] [🏢 Hire Talent] │
│ │
│ 5000+ Jobs | 500+ Companies | 50K+ │
└──────────────────────────────────────────┘

text


### Resume Upload & AI Parsing
┌──────────────────────────────────────────┐
│ 📄 Upload Resume │
│ ┌────────────────────────────────────┐ │
│ │ 📤 Drag & drop here │ │
│ │ or Browse Files │ │
│ │ PDF, DOCX (Max 10MB) │ │
│ └────────────────────────────────────┘ │
│ │
│ ✅ Resume parsed successfully! │
│ 7 fields auto-filled from your resume │
│ ⚡ Review the auto-filled data │
└──────────────────────────────────────────┘

text


### Application Form (Dark Theme)
┌──────────────────────────────────────────┐
│ 🚀 Job Application Form 🌙 Dark │
│ │
│ 📋 Personal Information │
│ [First Name ✨AI] [Last Name ✨AI] │
│ [Email ✨AI] [Phone ✨AI] │
│ │
│ 💼 Position Details │
│ [🔬 Data Science] [📊 Analytics] [⚙️] │
│ │
│ 🛠️ Skills ✨AI Auto-filled │
│ ☑ Python ☑ SQL ☑ TensorFlow │
│ │
│ [Reset Form] [Submit Application →] │
└──────────────────────────────────────────┘

text


---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ → [Download](https://nodejs.org/)
- **npm** v9+ (comes with Node.js)
- **MongoDB Atlas** account → [Sign Up](https://www.mongodb.com/atlas)
- **Firebase** project → [Console](https://console.firebase.google.com/)
- **OpenAI** API key → [Get Key](https://platform.openai.com/api-keys)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/datahire.git
cd datahire

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install
Setup Environment
Bash

# 4. Create .env file in backend folder
cd ../backend
touch .env
Add your credentials to .env (see Environment Variables)
```

Create Uploads Folder
```Bash

# 5. Create uploads directory
mkdir -p backend/uploads
Run the Application
Bash

# Terminal 1 — Start Backend
cd backend
node server.js

# Terminal 2 — Start Frontend
cd frontend
npm start

Access the App
Service	URL
Frontend	http://localhost:3000
Backend API	http://localhost:5000
Test Resume Upload	http://localhost:5000/api/resume/test
🔐 Environment Variables
Create a backend/.env file:

env
```

# ===== MongoDB Atlas =====
MONGO_USERNAME=your_mongo_username
MONGO_PASSWORD=your_mongo_password
MONGO_CLUSTER=cluster0.xxxxx.mongodb.net
MONGO_DBNAME=datahire_db

# ===== OpenAI =====
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ===== Server =====
PORT=5000
How to Get Each Key
Variable	Where to Get
MONGO_USERNAME	MongoDB Atlas → Database Access → Add User
MONGO_PASSWORD	Same as above
MONGO_CLUSTER	Atlas → Connect → Copy cluster URL
MONGO_DBNAME	Your chosen database name
OPENAI_API_KEY	OpenAI Platform → Create Key
⚠️ Never commit .env to Git! It's already in .gitignore.

## 📡 API Endpoints
Applications
Method	Endpoint	Description
GET	/api/applications	Get all applications
POST	/api/applications	Submit new application
GET	/api/applications/:id	Get single application
PUT	/api/applications/:id	Update application
DELETE	/api/applications/:id	Delete application
Resume Upload
Method	Endpoint	Description
POST	/api/resume/parse	Upload & parse resume (PDF/DOCX)
GET	/api/resume/test	Test if upload endpoint is alive
Health Check
Method	Endpoint	Description
GET	/	API status check
Example: Submit Application
Bash

curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "position": "data-science",
    "experienceLevel": "mid",
    "skills": ["Python", "Machine Learning", "TensorFlow"],
    "education": "masters",
    "relocate": "yes"
  }'
Example: Upload Resume
Bash

curl -X POST http://localhost:5000/api/resume/parse \
  -F "resume=@/path/to/resume.pdf"
Example Response (Resume Parse)
JSON

{
  "success": true,
  "message": "Resume parsed (OpenAI GPT)",
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "(555) 123-4567",
    "position": "data-science",
    "experienceLevel": "senior",
    "skills": ["Python", "Machine Learning", "TensorFlow", "PyTorch"],
    "education": "masters",
    "linkedIn": "https://linkedin.com/in/johndoe",
    "portfolio": "https://github.com/johndoe",
    "yearsOfExperience": 7,
    "summary": "Senior Data Scientist with 7 years of experience in ML and deep learning."
  },
  "parseMethod": "openai",
  "resumeFile": {
    "originalName": "John_Doe_Resume.pdf",
    "savedName": "resume-1234567890.pdf",
    "size": 245000,
    "path": "/uploads/resume-1234567890.pdf"
  }
}
📁 Folder Structure
text

datahire/
│
├── frontend/                          # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Intro.js               # Landing page
│   │   │   ├── Intro.css              # Landing page styles
│   │   │   ├── Form.js                # Application form + resume upload
│   │   │   ├── Form.css               # Form styles
│   │   │   ├── JobSeekerLogin.js      # Job seeker auth
│   │   │   ├── RecruiterLogin.js      # Recruiter auth
│   │   │   └── ...
│   │   ├── App.js                     # Routes
│   │   └── index.js                   # Entry point
│   └── package.json
│
├── backend/                           # Node.js Backend
│   ├── .env                           # Environment variables (NOT in git)
│   ├── server.js                      # Express server + MongoDB connection
│   ├── package.json
│   │
│   ├── models/
│   │   └── Application.js             # Mongoose schema
│   │
│   ├── routes/
│   │   ├── applicationRoutes.js       # CRUD routes
│   │   └── resumeRoutes.js            # Resume upload route
│   │
│   ├── controllers/
│   │   └── resumeController.js        # OpenAI parsing + fallback
│   │
│   ├── middleware/
│   │   └── upload.js                  # Multer configuration
│   │
│   └── uploads/                       # Uploaded resume files
│       └── .gitkeep
│
├── .gitignore
└── README.md                          # This file
💡 Usage
For Job Seekers
🏠 Visit the landing page
🎯 Click "Job Seeker" to login
📄 Upload your resume (PDF/DOCX) — AI auto-fills the form
✅ Review the auto-filled data and make corrections
📝 Fill any remaining fields (relocate preference, cover letter, etc.)
🚀 Submit your application
📦 Data is stored securely in MongoDB Atlas
For Recruiters
🏠 Visit the landing page
🏢 Click "Recruiter" to login
📋 View submitted applications
🔍 Filter by position, skills, experience
✅ Shortlist candidates
Resume Upload Flow
text

User drops resume.pdf
        │
        ▼
Frontend sends file → POST /api/resume/parse
        │
        ▼
Multer saves file to /uploads/
        │
        ▼
pdf-parse extracts raw text from PDF
        │
        ▼
Text sent to OpenAI GPT-4o-mini
        │
        ▼
AI returns structured JSON:
{ firstName, lastName, email, skills, position, ... }
        │
        ▼
Backend validates skills against predefined lists
        │
        ▼
Frontend auto-fills form + shows "AI Auto-filled" badges
        │
        ▼
User reviews → Submits → MongoDB Atlas 💾
🧪 Testing
Test OpenAI Connection
Bash

cd backend
node testAI.js
Test API Endpoints
Bash

# Health check
curl http://localhost:5000

# Test resume endpoint
curl http://localhost:5000/api/resume/test

# Upload a test resume
curl -X POST http://localhost:5000/api/resume/parse \
  -F "resume=@./test-resume.pdf"
Expected Server Logs
text

✅ pdf-parse loaded (method 1)
✅ OpenAI client initialized
🔑 Key starts with: sk-proj-...
✅ MongoDB Atlas Connected Successfully!
📦 Database: datahire_db
🚀 Server running on http://localhost:5000

📤 Resume upload request received
📄 Processing: John_Resume.pdf
📖 PDF pages: 2
📖 PDF text length: 3456 chars
✅ Extracted 3456 characters
🤖 Sending to OpenAI...
✅ JSON parsed successfully
✅ Done (openai): { firstName: "John", ... }
🔧 Configuration
Change OpenAI Model
In backend/controllers/resumeController.js:

JavaScript

// Options (pick one):
model: 'gpt-4o-mini'     // Fast, cheap (default)
model: 'gpt-4o'          // More accurate
model: 'gpt-3.5-turbo'   // Cheapest
model: 'gpt-4-turbo'     // Most powerful
Add New Job Positions
In both Form.js (frontend) and resumeController.js (backend):

JavaScript

// Add to jobPositions array:
{ value: 'ml-engineer', label: 'ML Engineer', icon: '🤖' }

// Add to skillsOptions:
'ml-engineer': ['Python', 'TensorFlow', 'PyTorch', ...]
Add New Languages
In Intro.js and Form.js, add a new key to the translations object:

JavaScript

const translations = {
  en: { ... },
  hi: { ... },
  es: { ... }  // Add Spanish, etc.
};
🤝 Contributing
Contributions are welcome! Here's how:

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
Development Guidelines
Follow existing code style
Add translations for both EN and HI
Test all 3 themes
Test on mobile and desktop
Ensure fallback parser works when AI is unavailable
📄 License
Distributed under the MIT License. See LICENSE for more information.

📞 Contact
Your Name — your.email@example.com

Project Link: https://github.com/yourusername/datahire

🙏 Acknowledgments
React.js
Node.js
Express.js
MongoDB Atlas
Firebase
OpenAI API
Multer
pdf-parse
Mammoth.js