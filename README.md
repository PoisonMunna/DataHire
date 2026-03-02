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

