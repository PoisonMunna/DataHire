import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css';

// ==================== TRANSLATIONS ====================
const translations = {
  en: {
    welcome: 'Welcome',
    logout: 'Logout',
    formTitle: '🚀 Job Application Form',
    formSubtitle: 'Join our Data Team - Apply for your dream position',
    personalInfo: '📋 Personal Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email Address',
    phone: 'Phone Number',
    firstNamePlaceholder: 'Enter your first name',
    lastNamePlaceholder: 'Enter your last name',
    emailPlaceholder: 'your.email@example.com',
    phonePlaceholder: '(123) 456-7890',
    positionDetails: '💼 Position Details',
    selectPosition: 'Select Position',
    experienceLevel: 'Experience Level',
    selectExperience: 'Select your experience level',
    skills: '🛠️ Skills',
    skillsDescription: 'Select the skills you have for the',
    skillsDescriptionSuffix: 'role:',
    education: '🎓 Education',
    highestEducation: 'Highest Education',
    selectEducation: 'Select your education',
    additionalInfo: '📎 Additional Information',
    linkedIn: 'LinkedIn Profile',
    linkedInPlaceholder: 'https://linkedin.com/in/yourprofile',
    portfolio: 'Portfolio/GitHub',
    portfolioPlaceholder: 'https://github.com/yourusername',
    startDate: 'Earliest Start Date',
    relocate: 'Willing to Relocate?',
    yes: 'Yes',
    no: 'No',
    remoteOnly: 'Remote Only',
    coverLetter: 'Cover Letter / Message',
    coverLetterPlaceholder: 'Tell us why you\'re interested in this position...',
    resetForm: 'Reset Form',
    submitApplication: 'Submit Application',
    submitting: 'Submitting...',
    successTitle: 'Application Submitted Successfully!',
    successMessage1: 'Thank you',
    successMessage2: 'Your application for the',
    successMessage3: 'position has been saved.',
    successMessage4: 'We will review your application and get back to you soon.',
    storedInDB: '📦 Your data has been stored in MongoDB',
    submitAnother: 'Submit Another Application',
    backToHome: 'Back to Home',
    required: '*',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email',
    phoneRequired: 'Phone number is required',
    positionRequired: 'Please select a position',
    experienceRequired: 'Please select experience level',
    skillsRequired: 'Please select at least one skill',
    educationRequired: 'Education is required',
    relocateRequired: 'Please select an option',
    networkError: 'Network error. Please make sure the server is running.',
    failedSubmit: 'Failed to submit application',
    dataScience: 'Data Science',
    dataAnalytics: 'Data Analytics',
    dataEngineer: 'Data Engineer',
    entryLevel: 'Entry Level (0-2 years)',
    midLevel: 'Mid Level (2-5 years)',
    seniorLevel: 'Senior Level (5-10 years)',
    leadLevel: 'Lead/Principal (10+ years)',
    highSchool: 'High School',
    bachelors: "Bachelor's Degree",
    masters: "Master's Degree",
    phd: 'Ph.D.',
    bootcamp: 'Bootcamp/Certification',
    // ===== RESUME UPLOAD TRANSLATIONS =====
    resumeUpload: '📄 Upload Resume',
    resumeSubtitle: 'Upload your resume and let AI auto-fill the form for you!',
    dragDrop: 'Drag & drop your resume here',
    orText: 'or',
    browseFiles: 'Browse Files',
    supportedFormats: 'Supported formats: PDF, DOCX (Max 10MB)',
    parsing: '🤖 AI is scanning your resume...',
    parsingDetail: 'Extracting information using OpenAI',
    resumeParsed: '✅ Resume parsed successfully!',
    resumeParseFields: 'fields auto-filled from your resume',
    removeResume: 'Remove',
    resumeError: 'Failed to parse resume. Please fill the form manually.',
    autofilledBadge: 'AI Auto-filled',
    reviewNote: '⚡ Please review the auto-filled data and make corrections if needed.',
    orFillManually: 'Or fill the form manually below',
  },
  hi: {
    welcome: 'स्वागत है',
    logout: 'लॉगआउट',
    formTitle: '🚀 नौकरी आवेदन फॉर्म',
    formSubtitle: 'हमारी डेटा टीम से जुड़ें - अपने सपनों की पोज़ीशन के लिए आवेदन करें',
    personalInfo: '📋 व्यक्तिगत जानकारी',
    firstName: 'पहला नाम',
    lastName: 'अंतिम नाम',
    email: 'ईमेल पता',
    phone: 'फ़ोन नंबर',
    firstNamePlaceholder: 'अपना पहला नाम दर्ज करें',
    lastNamePlaceholder: 'अपना अंतिम नाम दर्ज करें',
    emailPlaceholder: 'your.email@example.com',
    phonePlaceholder: '(123) 456-7890',
    positionDetails: '💼 पद विवरण',
    selectPosition: 'पद चुनें',
    experienceLevel: 'अनुभव स्तर',
    selectExperience: 'अपना अनुभव स्तर चुनें',
    skills: '🛠️ कौशल',
    skillsDescription: 'इस भूमिका के लिए अपने कौशल चुनें:',
    skillsDescriptionSuffix: '',
    education: '🎓 शिक्षा',
    highestEducation: 'उच्चतम शिक्षा',
    selectEducation: 'अपनी शिक्षा चुनें',
    additionalInfo: '📎 अतिरिक्त जानकारी',
    linkedIn: 'लिंक्डइन प्रोफ़ाइल',
    linkedInPlaceholder: 'https://linkedin.com/in/yourprofile',
    portfolio: 'पोर्टफ़ोलियो/गिटहब',
    portfolioPlaceholder: 'https://github.com/yourusername',
    startDate: 'शुरू करने की जल्द से जल्द तारीख',
    relocate: 'क्या आप स्थानांतरित होने को तैयार हैं?',
    yes: 'हां',
    no: 'नहीं',
    remoteOnly: 'केवल रिमोट',
    coverLetter: 'कवर लेटर / संदेश',
    coverLetterPlaceholder: 'हमें बताएं कि आप इस पद में क्यों रुचि रखते हैं...',
    resetForm: 'फॉर्म रीसेट करें',
    submitApplication: 'आवेदन जमा करें',
    submitting: 'जमा हो रहा है...',
    successTitle: 'आवेदन सफलतापूर्वक जमा हो गया!',
    successMessage1: 'धन्यवाद',
    successMessage2: 'आपका आवेदन',
    successMessage3: 'पद के लिए सहेजा गया है।',
    successMessage4: 'हम आपके आवेदन की समीक्षा करेंगे और जल्द ही आपसे संपर्क करेंगे।',
    storedInDB: '📦 आपका डेटा MongoDB में संग्रहीत किया गया है',
    submitAnother: 'एक और आवेदन जमा करें',
    backToHome: 'होम पर वापस जाएं',
    required: '*',
    firstNameRequired: 'पहला नाम आवश्यक है',
    lastNameRequired: 'अंतिम नाम आवश्यक है',
    emailRequired: 'ईमेल आवश्यक है',
    emailInvalid: 'कृपया एक मान्य ईमेल दर्ज करें',
    phoneRequired: 'फ़ोन नंबर आवश्यक है',
    positionRequired: 'कृपया एक पद चुनें',
    experienceRequired: 'कृपया अनुभव स्तर चुनें',
    skillsRequired: 'कृपया कम से कम एक कौशल चुनें',
    educationRequired: 'शिक्षा आवश्यक है',
    relocateRequired: 'कृपया एक विकल्प चुनें',
    networkError: 'नेटवर्क त्रुटि। कृपया सुनिश्चित करें कि सर्वर चल रहा है।',
    failedSubmit: 'आवेदन जमा करने में विफल',
    dataScience: 'डेटा साइंस',
    dataAnalytics: 'डेटा एनालिटिक्स',
    dataEngineer: 'डेटा इंजीनियर',
    entryLevel: 'प्रवेश स्तर (0-2 वर्ष)',
    midLevel: 'मध्य स्तर (2-5 वर्ष)',
    seniorLevel: 'वरिष्ठ स्तर (5-10 वर्ष)',
    leadLevel: 'लीड/प्रिंसिपल (10+ वर्ष)',
    highSchool: 'हाई स्कूल',
    bachelors: 'स्नातक डिग्री',
    masters: 'स्नातकोत्तर डिग्री',
    phd: 'पीएच.डी.',
    bootcamp: 'बूटकैंप/प्रमाणन',
    // ===== RESUME UPLOAD TRANSLATIONS =====
    resumeUpload: '📄 रिज्यूमे अपलोड करें',
    resumeSubtitle: 'अपना रिज्यूमे अपलोड करें और AI से फॉर्म ऑटो-फिल करवाएं!',
    dragDrop: 'अपना रिज्यूमे यहां ड्रैग और ड्रॉप करें',
    orText: 'या',
    browseFiles: 'फ़ाइलें ब्राउज़ करें',
    supportedFormats: 'समर्थित प्रारूप: PDF, DOCX (अधिकतम 10MB)',
    parsing: '🤖 AI आपका रिज्यूमे स्कैन कर रहा है...',
    parsingDetail: 'OpenAI का उपयोग करके जानकारी निकाली जा रही है',
    resumeParsed: '✅ रिज्यूमे सफलतापूर्वक पार्स किया गया!',
    resumeParseFields: 'फ़ील्ड आपके रिज्यूमे से ऑटो-फिल किए गए',
    removeResume: 'हटाएं',
    resumeError: 'रिज्यूमे पार्स करने में विफल। कृपया फॉर्म मैन्युअल रूप से भरें।',
    autofilledBadge: 'AI ऑटो-फिल्ड',
    reviewNote: '⚡ कृपया ऑटो-फिल किए गए डेटा की समीक्षा करें और आवश्यकतानुसार सुधार करें।',
    orFillManually: 'या नीचे फॉर्म मैन्युअल रूप से भरें',
  }
};

const themes = ['light', 'dark', 'high-contrast'];
const themeLabels = {
  en: { 'light': '☀️ Light', 'dark': '🌙 Dark', 'high-contrast': '👁️ High Contrast' },
  hi: { 'light': '☀️ लाइट', 'dark': '🌙 डार्क', 'high-contrast': '👁️ हाई कंट्रास्ट' }
};

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  // Theme & Language state
  const [currentTheme, setCurrentTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // ===== RESUME STATES =====
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileInfo, setResumeFileInfo] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseSuccess, setParseSuccess] = useState(false);
  const [parseError, setParseError] = useState('');
  const [autofilledFields, setAutofilledFields] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [parsedSummary, setParsedSummary] = useState('');

  useEffect(() => {
    const userData = location.state?.user;
    const storedUser = localStorage.getItem('currentUser');
    if (userData) {
      setLoggedInUser(userData);
    } else if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, [location]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experienceLevel: '',
    skills: [],
    education: '',
    linkedIn: '',
    portfolio: '',
    coverLetter: '',
    relocate: '',
    startDate: ''
  });

  useEffect(() => {
    if (loggedInUser) {
      setFormData(prev => ({
        ...prev,
        firstName: loggedInUser.firstName || loggedInUser.displayName?.split(' ')[0] || '',
        lastName: loggedInUser.lastName || loggedInUser.displayName?.split(' ').slice(1).join(' ') || '',
        email: loggedInUser.email || ''
      }));
    }
  }, [loggedInUser]);

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const jobPositions = [
    { value: 'data-science', label: t.dataScience, icon: '🔬' },
    { value: 'data-analytics', label: t.dataAnalytics, icon: '📊' },
    { value: 'data-engineer', label: t.dataEngineer, icon: '⚙️' }
  ];

  const experienceLevels = [
    { value: 'entry', label: t.entryLevel },
    { value: 'mid', label: t.midLevel },
    { value: 'senior', label: t.seniorLevel },
    { value: 'lead', label: t.leadLevel }
  ];

  const educationOptions = [
    { value: 'high-school', label: t.highSchool },
    { value: 'bachelors', label: t.bachelors },
    { value: 'masters', label: t.masters },
    { value: 'phd', label: t.phd },
    { value: 'bootcamp', label: t.bootcamp }
  ];

  const skillsOptions = {
    'data-science': [
      'Python', 'R', 'Machine Learning', 'Deep Learning',
      'TensorFlow', 'PyTorch', 'Statistics', 'NLP',
      'Computer Vision', 'Scikit-learn'
    ],
    'data-analytics': [
      'SQL', 'Excel', 'Tableau', 'Power BI', 'Python',
      'R', 'Google Analytics', 'Statistical Analysis',
      'Data Visualization', 'Looker'
    ],
    'data-engineer': [
      'Python', 'SQL', 'Apache Spark', 'Hadoop', 'AWS',
      'Azure', 'GCP', 'Airflow', 'Kafka', 'Docker',
      'Kubernetes', 'ETL'
    ]
  };

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (submitError) setSubmitError('');
    if (name === 'position') {
      setFormData((prev) => ({ ...prev, position: value, skills: [] }));
    }
  };

  const handleSkillChange = (skill) => {
    setFormData((prev) => {
      const updatedSkills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: updatedSkills };
    });
  };

  // ==================== RESUME UPLOAD HANDLERS ====================

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processResumeFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) processResumeFile(file);
  };

  const processResumeFile = async (file) => {
    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowedTypes.includes(file.type)) {
      setParseError('Only PDF and DOCX files are allowed.');
      return;
    }
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setParseError('File size must be less than 10MB.');
      return;
    }

    setResumeFile(file);
    setParseError('');
    setParseSuccess(false);
    setIsParsing(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('resume', file);

      const response = await fetch('https://datahire.onrender.com/api/resume/parse', {
        method: 'POST',
        body: formDataUpload
      });

      const result = await response.json();

      if (result.success) {
        const parsed = result.data;
        const filled = [];

        // Auto-fill form fields from parsed data
        setFormData(prev => {
          const updated = { ...prev };

          if (parsed.firstName && parsed.firstName.trim()) {
            updated.firstName = parsed.firstName;
            filled.push('firstName');
          }
          if (parsed.lastName && parsed.lastName.trim()) {
            updated.lastName = parsed.lastName;
            filled.push('lastName');
          }
          if (parsed.email && parsed.email.trim()) {
            updated.email = parsed.email;
            filled.push('email');
          }
          if (parsed.phone && parsed.phone.trim()) {
            updated.phone = parsed.phone;
            filled.push('phone');
          }
          if (parsed.position) {
            updated.position = parsed.position;
            filled.push('position');
          }
          if (parsed.experienceLevel) {
            updated.experienceLevel = parsed.experienceLevel;
            filled.push('experienceLevel');
          }
          if (parsed.skills && parsed.skills.length > 0) {
            updated.skills = parsed.skills;
            filled.push('skills');
          }
          if (parsed.education) {
            updated.education = parsed.education;
            filled.push('education');
          }
          if (parsed.linkedIn && parsed.linkedIn.trim()) {
            updated.linkedIn = parsed.linkedIn;
            filled.push('linkedIn');
          }
          if (parsed.portfolio && parsed.portfolio.trim()) {
            updated.portfolio = parsed.portfolio;
            filled.push('portfolio');
          }

          return updated;
        });

        setAutofilledFields(filled);
        setResumeFileInfo(result.resumeFile);
        setParsedSummary(parsed.summary || '');
        setParseSuccess(true);
        setErrors({});
      } else {
        setParseError(result.message || t.resumeError);
      }
    } catch (error) {
      console.error('Resume upload error:', error);
      setParseError(t.networkError);
    } finally {
      setIsParsing(false);
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    setResumeFileInfo(null);
    setParseSuccess(false);
    setParseError('');
    setAutofilledFields([]);
    setParsedSummary('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // ==================== VALIDATION & SUBMIT ====================

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = t.firstNameRequired;
    if (!formData.lastName.trim()) newErrors.lastName = t.lastNameRequired;
    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.emailInvalid;
    }
    if (!formData.phone.trim()) newErrors.phone = t.phoneRequired;
    if (!formData.position) newErrors.position = t.positionRequired;
    if (!formData.experienceLevel) newErrors.experienceLevel = t.experienceRequired;
    if (formData.skills.length === 0) newErrors.skills = t.skillsRequired;
    if (!formData.education) newErrors.education = t.educationRequired;
    if (!formData.relocate) newErrors.relocate = t.relocateRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Include resume info in submission
      const submitData = {
        ...formData,
        resumeFile: resumeFileInfo || null,
        resumeParsedSummary: parsedSummary,
        wasAutofilled: autofilledFields.length > 0
      };

      const response = await fetch('https://datahire.onrender.com/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });
      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(data.message || t.failedSubmit);
      }
    } catch (error) {
      setSubmitError(t.networkError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: loggedInUser?.firstName || '',
      lastName: loggedInUser?.lastName || '',
      email: loggedInUser?.email || '',
      phone: '',
      position: '',
      experienceLevel: '',
      skills: [],
      education: '',
      linkedIn: '',
      portfolio: '',
      coverLetter: '',
      relocate: '',
      startDate: ''
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmitError('');
    removeResume();
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  // ==================== SUCCESS STATE ====================
  if (isSubmitted) {
    return (
      <div className={`form-page-wrapper theme-${currentTheme}`}>
        <div className="floating-toolbar">
          <button className="toolbar-btn theme-toggle-btn" onClick={cycleTheme}>
            <span className="toolbar-btn-icon">
              {currentTheme === 'light' && '☀️'}
              {currentTheme === 'dark' && '🌙'}
              {currentTheme === 'high-contrast' && '👁️'}
            </span>
            <span className="toolbar-btn-label">{themeLabels[language][currentTheme]}</span>
          </button>
          <button className="toolbar-btn language-toggle-btn" onClick={toggleLanguage}>
            <span className="toolbar-btn-icon">🌐</span>
            <span className="toolbar-btn-label">{language === 'en' ? 'हिंदी' : 'English'}</span>
          </button>
        </div>

        <div className="form-container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>{t.successTitle}</h2>
            <p>
              {t.successMessage1}, {formData.firstName}! {t.successMessage2}{' '}
              <strong>{formData.position.replace('-', ' ')}</strong> {t.successMessage3}
            </p>
            <p>{t.successMessage4}</p>
            {resumeFileInfo && (
              <p className="db-note">📄 Resume: {resumeFileInfo.originalName}</p>
            )}
            <p className="db-note">{t.storedInDB}</p>
            <div className="success-actions">
              <button onClick={handleReset} className="btn btn-primary">
                {t.submitAnother}
              </button>
              <button onClick={() => navigate('/')} className="btn btn-secondary">
                {t.backToHome}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <div className={`form-page-wrapper theme-${currentTheme}`}>
      {/* FLOATING TOOLBAR */}
      <div className="floating-toolbar">
        <button className="toolbar-btn theme-toggle-btn" onClick={cycleTheme}>
          <span className="toolbar-btn-icon">
            {currentTheme === 'light' && '☀️'}
            {currentTheme === 'dark' && '🌙'}
            {currentTheme === 'high-contrast' && '👁️'}
          </span>
          <span className="toolbar-btn-label">{themeLabels[language][currentTheme]}</span>
        </button>
        <button className="toolbar-btn language-toggle-btn" onClick={toggleLanguage}>
          <span className="toolbar-btn-icon">🌐</span>
          <span className="toolbar-btn-label">{language === 'en' ? 'हिंदी' : 'English'}</span>
        </button>
      </div>

      <div className="form-container">
        {/* Welcome Banner */}
        {loggedInUser && (
          <div className="welcome-banner">
            <div className="welcome-content">
              <div className="welcome-user">
                {loggedInUser.photoURL ? (
                  <img src={loggedInUser.photoURL} alt="Profile" className="user-avatar" />
                ) : (
                  <span className="user-avatar-placeholder">👋</span>
                )}
                <span>
                  {t.welcome}, {loggedInUser.firstName || loggedInUser.displayName?.split(' ')[0]}!
                </span>
              </div>
              <button onClick={handleLogout} className="logout-btn-small">
                {t.logout}
              </button>
            </div>
          </div>
        )}

        <div className="form-header">
          <h1>{t.formTitle}</h1>
          <p>{t.formSubtitle}</p>
        </div>

        {/* Submit Error */}
        {submitError && (
          <div className="submit-error">
            <span>⚠️ {submitError}</span>
          </div>
        )}

        {/* ==================== RESUME UPLOAD SECTION ==================== */}
        <section className="form-section resume-upload-section">
          <h2>{t.resumeUpload}</h2>
          <p className="section-description">{t.resumeSubtitle}</p>

          {/* Parsing State */}
          {isParsing && (
            <div className="resume-parsing-overlay">
              <div className="parsing-spinner"></div>
              <h3>{t.parsing}</h3>
              <p>{t.parsingDetail}</p>
            </div>
          )}

          {/* Success State */}
          {parseSuccess && !isParsing && (
            <div className="resume-success-banner">
              <div className="resume-success-header">
                <div className="resume-success-info">
                  <span className="resume-success-icon">✅</span>
                  <div>
                    <strong>{t.resumeParsed}</strong>
                    <p>{autofilledFields.length} {t.resumeParseFields}</p>
                  </div>
                </div>
                <button className="resume-remove-btn" onClick={removeResume}>
                  ✕ {t.removeResume}
                </button>
              </div>
              {resumeFile && (
                <div className="resume-file-tag">
                  <span className="file-icon">📄</span>
                  <span className="file-name">{resumeFile.name}</span>
                  <span className="file-size">({formatFileSize(resumeFile.size)})</span>
                </div>
              )}
              {parsedSummary && (
                <div className="parsed-summary">
                  <strong>AI Summary:</strong> {parsedSummary}
                </div>
              )}
              <p className="review-note">{t.reviewNote}</p>
            </div>
          )}

          {/* Error State */}
          {parseError && (
            <div className="resume-error-banner">
              <span>⚠️ {parseError}</span>
              <button onClick={removeResume} className="resume-retry-btn">Try Again</button>
            </div>
          )}

          {/* Dropzone — show only if no resume uploaded yet and not parsing */}
          {!resumeFile && !isParsing && (
            <>
              <div
                className={`resume-dropzone ${isDragOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
              >
                <div className="dropzone-icon">📤</div>
                <h3>{t.dragDrop}</h3>
                <p className="dropzone-or">{t.orText}</p>
                <span className="dropzone-browse-btn">{t.browseFiles}</span>
                <p className="dropzone-formats">{t.supportedFormats}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileSelect}
                  className="hidden-file-input"
                />
              </div>
              <div className="resume-divider">
                <span>{t.orFillManually}</span>
              </div>
            </>
          )}
        </section>

        {/* ==================== MAIN FORM ==================== */}
        <form onSubmit={handleSubmit} className="job-form">
          {/* Personal Information */}
          <section className="form-section">
            <h2>{t.personalInfo}</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">
                  {t.firstName} {t.required}
                  {autofilledFields.includes('firstName') && (
                    <span className="autofill-badge">{t.autofilledBadge}</span>
                  )}
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t.firstNamePlaceholder}
                  className={`${errors.firstName ? 'error' : ''} ${autofilledFields.includes('firstName') ? 'autofilled' : ''}`}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">
                  {t.lastName} {t.required}
                  {autofilledFields.includes('lastName') && (
                    <span className="autofill-badge">{t.autofilledBadge}</span>
                  )}
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t.lastNamePlaceholder}
                  className={`${errors.lastName ? 'error' : ''} ${autofilledFields.includes('lastName') ? 'autofilled' : ''}`}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">
                  {t.email} {t.required}
                  {autofilledFields.includes('email') && (
                    <span className="autofill-badge">{t.autofilledBadge}</span>
                  )}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  className={`${errors.email ? 'error' : ''} ${autofilledFields.includes('email') ? 'autofilled' : ''}`}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  {t.phone} {t.required}
                  {autofilledFields.includes('phone') && (
                    <span className="autofill-badge">{t.autofilledBadge}</span>
                  )}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                  className={`${errors.phone ? 'error' : ''} ${autofilledFields.includes('phone') ? 'autofilled' : ''}`}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>
          </section>

          {/* Position Details */}
          <section className="form-section">
            <h2>
              {t.positionDetails}
              {autofilledFields.includes('position') && (
                <span className="autofill-badge section-badge">{t.autofilledBadge}</span>
              )}
            </h2>
            <div className="form-group">
              <label>{t.selectPosition} {t.required}</label>
              <div className="position-cards">
                {jobPositions.map((position) => (
                  <div
                    key={position.value}
                    className={`position-card ${formData.position === position.value ? 'selected' : ''} ${formData.position === position.value && autofilledFields.includes('position') ? 'autofilled-card' : ''}`}
                    onClick={() => handleChange({ target: { name: 'position', value: position.value } })}
                    tabIndex={0}
                    role="button"
                    aria-pressed={formData.position === position.value}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleChange({ target: { name: 'position', value: position.value } });
                      }
                    }}
                  >
                    <div className="position-icon">{position.icon}</div>
                    <h3>{position.label}</h3>
                  </div>
                ))}
              </div>
              {errors.position && <span className="error-message">{errors.position}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="experienceLevel">
                {t.experienceLevel} {t.required}
                {autofilledFields.includes('experienceLevel') && (
                  <span className="autofill-badge">{t.autofilledBadge}</span>
                )}
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className={`${errors.experienceLevel ? 'error' : ''} ${autofilledFields.includes('experienceLevel') ? 'autofilled' : ''}`}
              >
                <option value="">{t.selectExperience}</option>
                {experienceLevels.map((level) => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
              {errors.experienceLevel && <span className="error-message">{errors.experienceLevel}</span>}
            </div>
          </section>

          {/* Skills */}
          {formData.position && (
            <section className="form-section">
              <h2>
                {t.skills}
                {autofilledFields.includes('skills') && (
                  <span className="autofill-badge section-badge">{t.autofilledBadge}</span>
                )}
              </h2>
              <p className="section-description">
                {t.skillsDescription} {formData.position.replace('-', ' ')} {t.skillsDescriptionSuffix}
              </p>
              <div className="skills-grid">
                {skillsOptions[formData.position]?.map((skill) => (
                  <label
                    key={skill}
                    className={`skill-checkbox ${formData.skills.includes(skill) && autofilledFields.includes('skills') ? 'autofilled-skill' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
              {errors.skills && <span className="error-message">{errors.skills}</span>}
            </section>
          )}

          {/* Education */}
          <section className="form-section">
            <h2>{t.education}</h2>
            <div className="form-group">
              <label htmlFor="education">
                {t.highestEducation} {t.required}
                {autofilledFields.includes('education') && (
                  <span className="autofill-badge">{t.autofilledBadge}</span>
                )}
              </label>
              <select
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className={`${errors.education ? 'error' : ''} ${autofilledFields.includes('education') ? 'autofilled' : ''}`}
              >
                <option value="">{t.selectEducation}</option>
                {educationOptions.map((edu) => (
                  <option key={edu.value} value={edu.value}>{edu.label}</option>
                ))}
              </select>
              {errors.education && <span className="error-message">{errors.education}</span>}
            </div>
          </section>

          {/* Additional Information */}
          <section className="form-section">
            <h2>{t.additionalInfo}</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="linkedIn">
                  {t.linkedIn}
                  {autofilledFields.includes('linkedIn') && (
                    <span className="autofill-badge">{t.autofilledBadge}</span>
                  )}
                </label>
                <input
                  type="url"
                  id="linkedIn"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleChange}
                  placeholder={t.linkedInPlaceholder}
                  className={autofilledFields.includes('linkedIn') ? 'autofilled' : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="portfolio">
                  {t.portfolio}
                  {autofilledFields.includes('portfolio') && (
                    <span className="autofill-badge">{t.autofilledBadge}</span>
                  )}
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder={t.portfolioPlaceholder}
                  className={autofilledFields.includes('portfolio') ? 'autofilled' : ''}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="startDate">{t.startDate}</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t.relocate} {t.required}</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="relocate" value="yes" checked={formData.relocate === 'yes'} onChange={handleChange} />
                  <span>{t.yes}</span>
                </label>
                <label className="radio-label">
                  <input type="radio" name="relocate" value="no" checked={formData.relocate === 'no'} onChange={handleChange} />
                  <span>{t.no}</span>
                </label>
                <label className="radio-label">
                  <input type="radio" name="relocate" value="remote" checked={formData.relocate === 'remote'} onChange={handleChange} />
                  <span>{t.remoteOnly}</span>
                </label>
              </div>
              {errors.relocate && <span className="error-message">{errors.relocate}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="coverLetter">{t.coverLetter}</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder={t.coverLetterPlaceholder}
                rows="4"
              />
            </div>
          </section>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" onClick={handleReset} className="btn btn-secondary">
              {t.resetForm}
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  <span>{t.submitting}</span>
                </>
              ) : (
                <>
                  <span>{t.submitApplication}</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
