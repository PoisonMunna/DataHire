// src/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validateLogin } from './database';
import { signInWithGoogle } from './firebase';
import './Login.css';

// ==================== TRANSLATIONS ====================
const translations = {
  en: {
    backToHome: 'Back to Home',
    welcomeBack: 'Welcome Back!',
    tagline: 'Your dream data career is just one login away',
    feature1: 'Access 5000+ Data Jobs',
    feature2: 'AI-Powered Job Matching',
    feature3: 'Direct Connect with Recruiters',
    feature4: 'Salary Insights & Analytics',
    demoCredentials: '🔐 Demo Credentials',
    email: 'Email',
    password: 'Password',
    jobSeekerLogin: 'Job Seeker Login',
    enterCredentials: 'Enter your credentials to access your account',
    continueWithGoogle: 'Continue with Google',
    signingIn: 'Signing in...',
    orLoginWithEmail: 'or login with email',
    emailAddress: 'Email Address',
    enterEmail: 'Enter your email',
    passwordLabel: 'Password',
    enterPassword: 'Enter your password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot Password?',
    loginToAccount: 'Login to Your Account',
    verifying: 'Verifying...',
    noAccount: "Don't have an account?",
    areYouRecruiter: 'Are you a recruiter?',
    loginAsRecruiter: 'Login as Recruiter',
    footerText: '© 2024 DataHire. All rights reserved.',
    loginSuccessful: 'Login Successful!',
    redirecting: 'Redirecting to application form...',
    emailRequired: 'Email is required',
    invalidEmail: 'Please enter a valid email',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 4 characters',
    googleFailed: 'Google sign-in failed. Please try again.',
    linkedinComingSoon: 'LinkedIn sign-in coming soon!',
    lightTheme: 'Light',
    darkTheme: 'Dark',
    highContrast: 'High Contrast',
  },
  hi: {
    backToHome: 'होम पर वापस जाएं',
    welcomeBack: 'वापसी पर स्वागत है!',
    tagline: 'आपका सपनों का डेटा करियर बस एक लॉगिन दूर है',
    feature1: '5000+ डेटा नौकरियां उपलब्ध',
    feature2: 'AI-संचालित नौकरी मिलान',
    feature3: 'भर्तीकर्ताओं से सीधा संपर्क',
    feature4: 'वेतन अंतर्दृष्टि और विश्लेषण',
    demoCredentials: '🔐 डेमो क्रेडेंशियल',
    email: 'ईमेल',
    password: 'पासवर्ड',
    jobSeekerLogin: 'नौकरी खोजने वाला लॉगिन',
    enterCredentials: 'अपने खाते तक पहुंचने के लिए अपनी साख दर्ज करें',
    continueWithGoogle: 'Google से जारी रखें',
    signingIn: 'साइन इन हो रहा है...',
    orLoginWithEmail: 'या ईमेल से लॉगिन करें',
    emailAddress: 'ईमेल पता',
    enterEmail: 'अपना ईमेल दर्ज करें',
    passwordLabel: 'पासवर्ड',
    enterPassword: 'अपना पासवर्ड दर्ज करें',
    rememberMe: 'मुझे याद रखें',
    forgotPassword: 'पासवर्ड भूल गए?',
    loginToAccount: 'अपने खाते में लॉगिन करें',
    verifying: 'सत्यापित हो रहा है...',
    noAccount: 'खाता नहीं है?',
    areYouRecruiter: 'क्या आप भर्तीकर्ता हैं?',
    loginAsRecruiter: 'भर्तीकर्ता के रूप में लॉगिन करें',
    footerText: '© 2024 DataHire. सर्वाधिकार सुरक्षित।',
    loginSuccessful: 'लॉगिन सफल!',
    redirecting: 'आवेदन फॉर्म पर पुनर्निर्देशित हो रहा है...',
    emailRequired: 'ईमेल आवश्यक है',
    invalidEmail: 'कृपया एक वैध ईमेल दर्ज करें',
    passwordRequired: 'पासवर्ड आवश्यक है',
    passwordMinLength: 'पासवर्ड कम से कम 4 अक्षरों का होना चाहिए',
    googleFailed: 'Google साइन-इन विफल। कृपया पुनः प्रयास करें।',
    linkedinComingSoon: 'LinkedIn साइन-इन जल्द आ रहा है!',
    lightTheme: 'लाइट',
    darkTheme: 'डार्क',
    highContrast: 'हाई कॉन्ट्रास्ट',
  }
};

// Theme configs
const themes = ['light', 'dark', 'high-contrast'];
const themeIcons = { light: '☀️', dark: '🌙', 'high-contrast': '👁️' };
const themeLabelsKey = { light: 'lightTheme', dark: 'darkTheme', 'high-contrast': 'highContrast' };

const Login = () => {
  const navigate = useNavigate();

  // Theme & Language state
  const [theme, setTheme] = useState(() => localStorage.getItem('app-theme') || 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('app-language') || 'en');
  const t = translations[language];

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // UI states
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  // Cycle through themes
  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  // Get next theme info for tooltip
  const getNextTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    return themes[nextIndex];
  };

  // Handle input changes
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

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.password) {
      newErrors.password = t.passwordRequired;
    } else if (formData.password.length < 4) {
      newErrors.password = t.passwordMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = validateLogin(formData.email, formData.password);

      if (result.success) {
        setLoginSuccess(true);
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginMethod', 'email');

        setTimeout(() => {
          navigate('/job-seeker/register', { state: { user: result.user } });
        }, 1500);
      } else {
        setLoginError(result.message);
        setIsLoading(false);
      }
    }, 1000);
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setLoginError('');

    try {
      const result = await signInWithGoogle();

      if (result.success) {
        setLoginSuccess(true);
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginMethod', 'google');

        setTimeout(() => {
          navigate('/job-seeker/register', { state: { user: result.user } });
        }, 1500);
      } else {
        setLoginError(result.error || t.googleFailed);
        setIsGoogleLoading(false);
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setLoginError(t.googleFailed);
      setIsGoogleLoading(false);
    }
  };

  // Go back to home
  const handleBackToHome = () => {
    navigate('/');
  };

  // Success state
  if (loginSuccess) {
    return (
      <div className="login-container" data-theme={theme}>
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>{t.loginSuccessful}</h2>
            <p>{t.redirecting}</p>
            <div className="success-loader"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container" data-theme={theme}>
      {/* Background Elements */}
      <div className="login-background">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
      </div>

      {/* ========== FLOATING CONTROLS ========== */}
      <div className="floating-controls">
        {/* Theme Toggle Button */}
        <button
          className="control-btn theme-toggle-btn"
          onClick={cycleTheme}
          title={`Switch to ${getNextTheme()} theme`}
          aria-label={`Current theme: ${theme}. Click to switch.`}
        >
          <span className="control-icon">{themeIcons[theme]}</span>
          <span className="control-label">{t[themeLabelsKey[theme]]}</span>
          <span className="theme-indicator">
            {themes.map((th) => (
              <span
                key={th}
                className={`indicator-dot ${th === theme ? 'active' : ''}`}
              ></span>
            ))}
          </span>
        </button>

        {/* Language Toggle Button */}
        <button
          className="control-btn language-toggle-btn"
          onClick={toggleLanguage}
          title={language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
          aria-label={`Current language: ${language === 'en' ? 'English' : 'Hindi'}. Click to switch.`}
        >
          <span className="control-icon">🌐</span>
          <span className="control-label">
            {language === 'en' ? 'हिं' : 'EN'}
          </span>
          <span className="language-badge">
            {language === 'en' ? 'English' : 'हिंदी'}
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
        <div className="login-branding">
          <div className="branding-content">
            <div className="brand-logo">
              <span className="logo-icon">💼</span>
              <span className="logo-text">DataHire</span>
            </div>

            <h1>{t.welcomeBack}</h1>
            <p>{t.tagline}</p>

            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>{t.feature1}</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>{t.feature2}</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>{t.feature3}</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>{t.feature4}</span>
              </div>
            </div>

            <div className="demo-credentials">
              <h4>{t.demoCredentials}</h4>
              <div className="credential-item">
                <span>{t.email}:</span>
                <code>john@example.com</code>
              </div>
              <div className="credential-item">
                <span>{t.password}:</span>
                <code>john123</code>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <div className="form-header">
            <h2>{t.jobSeekerLogin}</h2>
            <p>{t.enterCredentials}</p>
          </div>

          {/* Login Error Message */}
          {loginError && (
            <div className="login-error">
              <span className="error-icon">⚠️</span>
              <span>{loginError}</span>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="social-login">
            <button
              type="button"
              className={`social-btn google ${isGoogleLoading ? 'loading' : ''}`}
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <>
                  <span className="social-spinner"></span>
                  <span>{t.signingIn}</span>
                </>
              ) : (
                <>
                  <svg className="google-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>{t.continueWithGoogle}</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="divider">
            <span>{t.orLoginWithEmail}</span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">{t.emailAddress}</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.enterEmail}
                  className={errors.email ? 'error' : ''}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <span className="error-message">{errors.email}</span>
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
              <Link to="/forgot-password" className="forgot-password">
                {t.forgotPassword}
              </Link>
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
                  <span>{t.loginToAccount}</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="signup-link">
            <p>{t.noAccount}</p>
          </div>

          {/* Recruiter Link */}
          <div className="switch-user-type">
            <p>
              {t.areYouRecruiter}{' '}
              <Link to="/recruiter/login">{t.loginAsRecruiter}</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="login-footer">
        <p>{t.footerText}</p>
      </div>
    </div>
  );
};

export default Login;