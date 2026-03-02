import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RecruiterLogin.css';

// ==================== TRANSLATIONS ====================
const translations = {
  en: {
    backToHome: 'Back to Home',
    recruiterPortal: 'Recruiter Portal',
    accessDashboard: 'Access your recruitment dashboard to find top talent',
    viewCandidates: 'View All Candidates',
    aiRanking: 'AI-Powered Ranking System',
    filterPosition: 'Filter by Position & Skills',
    contactCandidates: 'Contact Candidates Directly',
    adminCredentials: 'Admin Credentials',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    recruiterLogin: 'Recruiter Login',
    enterCredentials: 'Enter your admin credentials to continue',
    enterUsername: 'Enter your username',
    enterPassword: 'Enter your password',
    rememberMe: 'Remember me',
    loginToDashboard: 'Login to Dashboard',
    verifying: 'Verifying...',
    jobSeekerQuestion: 'Are you a job seeker?',
    loginAsJobSeeker: 'Login as Job Seeker',
    securityNote: 'This is a secure admin portal. Unauthorized access is prohibited.',
    loginSuccessful: 'Login Successful!',
    welcomeAdmin: 'Welcome Admin! Redirecting to dashboard...',
    copyright: '© 2024 DataHire. All rights reserved.',
    usernameRequired: 'Username is required',
    passwordRequired: 'Password is required',
    invalidCredentials: 'Invalid username or password. Please try again.',
  },
  hi: {
    backToHome: 'होम पर वापस जाएं',
    recruiterPortal: 'भर्तीकर्ता पोर्टल',
    accessDashboard: 'शीर्ष प्रतिभा खोजने के लिए अपने भर्ती डैशबोर्ड तक पहुंचें',
    viewCandidates: 'सभी उम्मीदवारों को देखें',
    aiRanking: 'एआई-संचालित रैंकिंग प्रणाली',
    filterPosition: 'पद और कौशल के अनुसार फ़िल्टर करें',
    contactCandidates: 'उम्मीदवारों से सीधे संपर्क करें',
    adminCredentials: 'एडमिन क्रेडेंशियल',
    usernameLabel: 'उपयोगकर्ता नाम',
    passwordLabel: 'पासवर्ड',
    recruiterLogin: 'भर्तीकर्ता लॉगिन',
    enterCredentials: 'जारी रखने के लिए अपने एडमिन क्रेडेंशियल दर्ज करें',
    enterUsername: 'अपना उपयोगकर्ता नाम दर्ज करें',
    enterPassword: 'अपना पासवर्ड दर्ज करें',
    rememberMe: 'मुझे याद रखें',
    loginToDashboard: 'डैशबोर्ड में लॉगिन करें',
    verifying: 'सत्यापित हो रहा है...',
    jobSeekerQuestion: 'क्या आप नौकरी की तलाश में हैं?',
    loginAsJobSeeker: 'नौकरी खोजने वाले के रूप में लॉगिन करें',
    securityNote: 'यह एक सुरक्षित एडमिन पोर्टल है। अनधिकृत पहुंच प्रतिबंधित है।',
    loginSuccessful: 'लॉगिन सफल!',
    welcomeAdmin: 'स्वागत है एडमिन! डैशबोर्ड पर रीडायरेक्ट हो रहा है...',
    copyright: '© 2024 डेटाहायर। सर्वाधिकार सुरक्षित।',
    usernameRequired: 'उपयोगकर्ता नाम आवश्यक है',
    passwordRequired: 'पासवर्ड आवश्यक है',
    invalidCredentials: 'अमान्य उपयोगकर्ता नाम या पासवर्ड। कृपया पुन: प्रयास करें।',
  }
};

// Theme configurations
const themes = ['light', 'dark', 'high-contrast'];
const themeLabels = {
  en: { 'light': '☀️ Light', 'dark': '🌙 Dark', 'high-contrast': '👁️ High Contrast' },
  hi: { 'light': '☀️ लाइट', 'dark': '🌙 डार्क', 'high-contrast': '👁️ हाई कंट्रास्ट' }
};

const RecruiterLogin = () => {
  const navigate = useNavigate();

  const VALID_USERNAME = 'admin';
  const VALID_PASSWORD = '1234';

  // Theme & Language state
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Cycle through themes
  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = t.usernameRequired;
    }
    if (!formData.password) {
      newErrors.password = t.passwordRequired;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      if (formData.username === VALID_USERNAME && formData.password === VALID_PASSWORD) {
        setLoginSuccess(true);
        localStorage.setItem('recruiterLoggedIn', 'true');
        localStorage.setItem('recruiterUser', JSON.stringify({
          username: formData.username,
          role: 'recruiter',
          loginTime: new Date().toISOString()
        }));
        setTimeout(() => {
          navigate('/recruiter/dashboard');
        }, 1500);
      } else {
        setLoginError(t.invalidCredentials);
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // ==================== SUCCESS STATE ====================
  if (loginSuccess) {
    return (
      <div className={`recruiter-login-container theme-${currentTheme}`}>
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>{t.loginSuccessful}</h2>
            <p>{t.welcomeAdmin}</p>
            <div className="success-loader"></div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <div className={`recruiter-login-container theme-${currentTheme}`}>
      {/* Background Elements */}
      <div className="login-background">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
      </div>

      {/* ===== FLOATING TOOLBAR ===== */}
      <div className="floating-toolbar">
        {/* Theme Toggle Button */}
        <button
          className="toolbar-btn theme-toggle-btn"
          onClick={cycleTheme}
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          <span className="toolbar-btn-icon">
            {currentTheme === 'light' && '☀️'}
            {currentTheme === 'dark' && '🌙'}
            {currentTheme === 'high-contrast' && '👁️'}
          </span>
          <span className="toolbar-btn-label">
            {themeLabels[language][currentTheme]}
          </span>
        </button>

        {/* Language Toggle Button */}
        <button
          className="toolbar-btn language-toggle-btn"
          onClick={toggleLanguage}
          title="Switch Language"
          aria-label="Switch Language"
        >
          <span className="toolbar-btn-icon">🌐</span>
          <span className="toolbar-btn-label">
            {language === 'en' ? 'हिंदी' : 'English'}
          </span>
        </button>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={handleBackToHome}>
        <span className="back-arrow">←</span>
        <span>{t.backToHome}</span>
      </button>

      {/* Login Card */}
      <div className="login-card">
        {/* Left Side - Branding */}
        <div className="login-branding recruiter">
          <div className="branding-content">
            <div className="brand-logo">
              <span className="logo-icon">🏢</span>
              <span className="logo-text">DataHire</span>
            </div>

            <h1>{t.recruiterPortal}</h1>
            <p>{t.accessDashboard}</p>

            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>{t.viewCandidates}</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>{t.aiRanking}</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>{t.filterPosition}</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>{t.contactCandidates}</span>
              </div>
            </div>

            <div className="demo-credentials">
              <h4>🔐 {t.adminCredentials}</h4>
              <div className="credential-item">
                <span>{t.usernameLabel}:</span>
                <code>admin</code>
              </div>
              <div className="credential-item">
                <span>{t.passwordLabel}:</span>
                <code>1234</code>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <div className="form-header">
            <div className="recruiter-icon">🏢</div>
            <h2>{t.recruiterLogin}</h2>
            <p>{t.enterCredentials}</p>
          </div>

          {loginError && (
            <div className="login-error">
              <span className="error-icon">⚠️</span>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">{t.usernameLabel}</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={t.enterUsername}
                  className={errors.username ? 'error' : ''}
                  autoComplete="username"
                />
              </div>
              {errors.username && (
                <span className="error-message">{errors.username}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">{t.passwordLabel}</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t.enterPassword}
                  className={errors.password ? 'error' : ''}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>{t.rememberMe}</span>
              </label>
            </div>

            <button
              type="submit"
              className={`login-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>{t.verifying}</span>
                </>
              ) : (
                <>
                  <span>{t.loginToDashboard}</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="switch-user-type">
            <p>
              {t.jobSeekerQuestion}{' '}
              <Link to="/job-seeker/login">{t.loginAsJobSeeker}</Link>
            </p>
          </div>

          <div className="security-note">
            <span>🔒</span>
            <span>{t.securityNote}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="login-footer">
        <p>{t.copyright}</p>
      </div>
    </div>
  );
};

export default RecruiterLogin;