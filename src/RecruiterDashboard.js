// src/RecruiterDashboard.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecruiterDashboard.css';

// =============================================
//  TRANSLATIONS DICTIONARY
// =============================================
const translations = {
  en: {
    backToHome: '← Back to Home',
    brandName: 'DataHire',
    brandBadge: 'Recruiter',
    adminLabel: '👤 Admin',
    logoutBtn: '🚪 Logout',
    themeLabel: 'Theme',
    langLabel: 'Lang',
    pageTitle: '🏆 Candidate Rankings',
    pageSubtitle: 'View and compare candidates based on their skill points',
    totalCandidates: 'Total Candidates',
    dataScience: 'Data Science',
    dataAnalytics: 'Data Analytics',
    dataEngineer: 'Data Engineer',
    filterByPosition: 'Filter by Position:',
    allPositions: 'All Positions',
    searchLabel: 'Search:',
    searchPlaceholder: 'Search by name, email, or skill...',
    refreshBtn: '🔄 Refresh',
    pointsSystem: '📊 Points System',
    experienceLabel: 'Experience:',
    experienceValues: 'Entry: 10 | Mid: 25 | Senior: 40 | Lead: 50',
    educationLabel: 'Education:',
    educationValues: "High School: 5 | Bachelor's: 15 | Master's: 25 | Ph.D: 35 | Bootcamp: 10",
    skillsLabel: 'Skills:',
    skillsValues: '5 points per skill',
    tryAgain: 'Try Again',
    loadingCandidates: 'Loading candidates...',
    noCandidatesTitle: 'No Candidates Found',
    noCandidatesSearch: 'No candidates match your search criteria',
    noCandidatesEmpty: 'No applications have been submitted yet',
    thRank: 'Rank',
    thName: 'Name',
    thContact: 'Contact',
    thPosition: 'Position',
    thExperience: 'Experience',
    thEducation: 'Education',
    thSkills: 'Skills',
    thTotalPoints: 'Total Points',
    thActions: 'Actions',
    viewDetails: 'View Details',
    showingResults: (filtered, total) => `Showing ${filtered} of ${total} candidates`,
    skills: 'skills',
    pts: 'pts',
    rankLabel: 'Rank',
    contactInfo: '📞 Contact Information',
    emailLabel: 'Email:',
    phoneLabel: 'Phone:',
    linkedInLabel: 'LinkedIn:',
    portfolioLabel: 'Portfolio:',
    pointsBreakdown: '🏆 Points Breakdown',
    experienceCard: 'Experience',
    educationCard: 'Education',
    skillsCard: 'Skills',
    totalScore: 'Total Score',
    skillsSection: '🛠️ Skills',
    additionalInfo: '📋 Additional Information',
    willingToRelocate: 'Willing to Relocate:',
    relocateYes: '✅ Yes',
    relocateNo: '❌ No',
    relocateRemote: '🏠 Remote Only',
    appliedOn: 'Applied On:',
    closeBtn: 'Close',
    contactCandidate: '📧 Contact Candidate',
    positionNames: {
      'data-science': 'Data Science',
      'data-analytics': 'Data Analytics',
      'data-engineer': 'Data Engineer'
    },
    experienceNames: {
      'entry': 'Entry Level',
      'mid': 'Mid Level',
      'senior': 'Senior Level',
      'lead': 'Lead/Principal'
    },
    educationNames: {
      'high-school': 'High School',
      'bachelors': "Bachelor's Degree",
      'masters': "Master's Degree",
      'phd': 'Ph.D.',
      'bootcamp': 'Bootcamp/Certification'
    },
    toastThemeLight: '☀️ Light Professional theme activated',
    toastThemeDark: '🌙 Dark Professional theme activated',
    toastThemeHC: '👁️ High Contrast theme activated',
    toastLangSwitch: '🌐 Language changed to English',
    themeBadgeLight: 'Light',
    themeBadgeDark: 'Dark',
    themeBadgeHC: 'HC',
    langBadge: 'EN',
    failedToFetch: 'Failed to fetch candidates',
    serverError: 'Failed to connect to server. Make sure backend is running.',
    interviewSubject: (pos) => `Interview Invitation - ${pos} Position at DataHire`,
  },
  hi: {
    backToHome: '← होम पर वापस जाएं',
    brandName: 'डेटाहायर',
    brandBadge: 'रिक्रूटर',
    adminLabel: '👤 एडमिन',
    logoutBtn: '🚪 लॉगआउट',
    themeLabel: 'थीम',
    langLabel: 'भाषा',
    pageTitle: '🏆 उम्मीदवार रैंकिंग',
    pageSubtitle: 'उम्मीदवारों को उनके कौशल अंकों के आधार पर देखें और तुलना करें',
    totalCandidates: 'कुल उम्मीदवार',
    dataScience: 'डेटा साइंस',
    dataAnalytics: 'डेटा एनालिटिक्स',
    dataEngineer: 'डेटा इंजीनियर',
    filterByPosition: 'पद के अनुसार फ़िल्टर करें:',
    allPositions: 'सभी पद',
    searchLabel: 'खोजें:',
    searchPlaceholder: 'नाम, ईमेल या कौशल से खोजें...',
    refreshBtn: '🔄 रिफ्रेश',
    pointsSystem: '📊 अंक प्रणाली',
    experienceLabel: 'अनुभव:',
    experienceValues: 'प्रवेश: 10 | मध्य: 25 | वरिष्ठ: 40 | लीड: 50',
    educationLabel: 'शिक्षा:',
    educationValues: 'हाई स्कूल: 5 | स्नातक: 15 | परास्नातक: 25 | पीएचडी: 35 | बूटकैंप: 10',
    skillsLabel: 'कौशल:',
    skillsValues: 'प्रति कौशल 5 अंक',
    tryAgain: 'पुनः प्रयास करें',
    loadingCandidates: 'उम्मीदवार लोड हो रहे हैं...',
    noCandidatesTitle: 'कोई उम्मीदवार नहीं मिला',
    noCandidatesSearch: 'आपके खोज मानदंड से कोई उम्मीदवार मेल नहीं खाता',
    noCandidatesEmpty: 'अभी तक कोई आवेदन जमा नहीं किया गया है',
    thRank: 'रैंक',
    thName: 'नाम',
    thContact: 'संपर्क',
    thPosition: 'पद',
    thExperience: 'अनुभव',
    thEducation: 'शिक्षा',
    thSkills: 'कौशल',
    thTotalPoints: 'कुल अंक',
    thActions: 'कार्रवाई',
    viewDetails: 'विवरण देखें',
    showingResults: (filtered, total) => `${total} में से ${filtered} उम्मीदवार दिखाए जा रहे हैं`,
    skills: 'कौशल',
    pts: 'अंक',
    rankLabel: 'रैंक',
    contactInfo: '📞 संपर्क जानकारी',
    emailLabel: 'ईमेल:',
    phoneLabel: 'फ़ोन:',
    linkedInLabel: 'लिंक्डइन:',
    portfolioLabel: 'पोर्टफोलियो:',
    pointsBreakdown: '🏆 अंक विवरण',
    experienceCard: 'अनुभव',
    educationCard: 'शिक्षा',
    skillsCard: 'कौशल',
    totalScore: 'कुल स्कोर',
    skillsSection: '🛠️ कौशल',
    additionalInfo: '📋 अतिरिक्त जानकारी',
    willingToRelocate: 'स्थानांतरण के लिए तैयार:',
    relocateYes: '✅ हाँ',
    relocateNo: '❌ नहीं',
    relocateRemote: '🏠 केवल रिमोट',
    appliedOn: 'आवेदन तिथि:',
    closeBtn: 'बंद करें',
    contactCandidate: '📧 उम्मीदवार से संपर्क करें',
    positionNames: {
      'data-science': 'डेटा साइंस',
      'data-analytics': 'डेटा एनालिटिक्स',
      'data-engineer': 'डेटा इंजीनियर'
    },
    experienceNames: {
      'entry': 'प्रवेश स्तर',
      'mid': 'मध्य स्तर',
      'senior': 'वरिष्ठ स्तर',
      'lead': 'लीड/प्रमुख'
    },
    educationNames: {
      'high-school': 'हाई स्कूल',
      'bachelors': 'स्नातक डिग्री',
      'masters': 'परास्नातक डिग्री',
      'phd': 'पीएचडी',
      'bootcamp': 'बूटकैंप/प्रमाणपत्र'
    },
    toastThemeLight: '☀️ लाइट प्रोफेशनल थीम सक्रिय',
    toastThemeDark: '🌙 डार्क प्रोफेशनल थीम सक्रिय',
    toastThemeHC: '👁️ हाई कॉन्ट्रास्ट थीम सक्रिय',
    toastLangSwitch: '🌐 भाषा हिंदी में बदली गई',
    themeBadgeLight: 'लाइट',
    themeBadgeDark: 'डार्क',
    themeBadgeHC: 'HC',
    langBadge: 'हिं',
    failedToFetch: 'उम्मीदवारों को लाने में विफल',
    serverError: 'सर्वर से कनेक्ट करने में विफल। सुनिश्चित करें कि बैकएंड चल रहा है।',
    interviewSubject: (pos) => `साक्षात्कार निमंत्रण - डेटाहायर में ${pos} पद`,
  }
};

// =============================================
//  THEME CONFIG
// =============================================
const THEMES = ['light', 'dark', 'high-contrast'];
const THEME_ICONS = {
  'light': '☀️',
  'dark': '🌙',
  'high-contrast': '👁️'
};

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  // =============================================
  //  AUTH CHECK
  // =============================================
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('recruiterLoggedIn');
    if (!isLoggedIn) {
      navigate('/recruiter/login');
    }
  }, [navigate]);

  // =============================================
  //  STATE
  // =============================================
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [pointsSystem, setPointsSystem] = useState(null);

  // Theme & Language state
  const [currentTheme, setCurrentTheme] = useState(
    () => localStorage.getItem('app-theme') || 'light'
  );
  const [currentLang, setCurrentLang] = useState(
    () => localStorage.getItem('app-lang') || 'en'
  );
  const [toast, setToast] = useState({ show: false, message: '' });
  const toastTimer = useRef(null);

  // Current translations shortcut
  const t = translations[currentLang];

  // =============================================
  //  THEME MANAGEMENT
  // =============================================
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('app-theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', currentLang);
    localStorage.setItem('app-lang', currentLang);
  }, [currentLang]);

  const showToast = useCallback((message) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ show: true, message });
    toastTimer.current = setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2500);
  }, []);

  const handleThemeToggle = useCallback(() => {
    setCurrentTheme(prev => {
      const idx = THEMES.indexOf(prev);
      const next = THEMES[(idx + 1) % THEMES.length];
      // Use the NEXT language's translations for the toast
      const toastMsg = next === 'light'
        ? translations[currentLang].toastThemeLight
        : next === 'dark'
          ? translations[currentLang].toastThemeDark
          : translations[currentLang].toastThemeHC;
      showToast(toastMsg);
      return next;
    });
  }, [currentLang, showToast]);

  const handleLangToggle = useCallback(() => {
    setCurrentLang(prev => {
      const next = prev === 'en' ? 'hi' : 'en';
      showToast(translations[next].toastLangSwitch);
      return next;
    });
  }, [showToast]);

  // Keyboard shortcuts: Alt+T for theme, Alt+L for language
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        handleThemeToggle();
      }
      if (e.altKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        handleLangToggle();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleThemeToggle, handleLangToggle]);

  // Get theme badge text
  const getThemeBadge = () => {
    if (currentTheme === 'light') return t.themeBadgeLight;
    if (currentTheme === 'dark') return t.themeBadgeDark;
    return t.themeBadgeHC;
  };

  // =============================================
  //  DATA FETCHING
  // =============================================
  const handleLogout = () => {
    localStorage.removeItem('recruiterLoggedIn');
    localStorage.removeItem('recruiterUser');
    navigate('/recruiter/login');
  };

  useEffect(() => {
    fetchCandidates();
    fetchStats();
  }, [selectedPosition]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCandidates(candidates);
    } else {
      const filtered = candidates.filter(candidate =>
        candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredCandidates(filtered);
    }
  }, [searchTerm, candidates]);

  const fetchCandidates = async () => {
    setLoading(true);
    setError('');

    try {
      const url = selectedPosition === 'all'
        ? 'https://datahire.onrender.com/api/applications/ranked'
        : `https://datahire.onrender.com/api/applications/ranked?position=${selectedPosition}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setCandidates(data.data);
        setFilteredCandidates(data.data);
        setPointsSystem(data.pointsSystem);
      } else {
        setError(data.message || t.failedToFetch);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(t.serverError);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('https://datahire.onrender.com/api/applications/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // =============================================
  //  HELPERS
  // =============================================
  const getPositionName = (position) => t.positionNames[position] || position;
  const getExperienceName = (level) => t.experienceNames[level] || level;
  const getEducationName = (edu) => t.educationNames[edu] || edu;

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return 'bronze';
    return 'default';
  };

  const getPointsClass = (points) => {
    if (points >= 80) return 'excellent';
    if (points >= 60) return 'good';
    if (points >= 40) return 'average';
    return 'basic';
  };

  const handleBackToHome = () => navigate('/');
  const viewCandidate = (candidate) => setSelectedCandidate(candidate);
  const closeModal = () => setSelectedCandidate(null);

  const formatDate = (dateStr) => {
    const locale = currentLang === 'hi' ? 'hi-IN' : 'en-US';
    return new Date(dateStr).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // =============================================
  //  RENDER
  // =============================================
  return (
    <div className="recruiter-dashboard">
      {/* ===== TOAST ===== */}
      <div
        className={`toast-notification theme-toast ${toast.show ? 'show' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast.message}
      </div>

      {/* ===== HEADER ===== */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-btn" onClick={handleBackToHome}>
              {t.backToHome}
            </button>
            <div className="brand">
              <span className="brand-icon">💼</span>
              <span className="brand-text">{t.brandName}</span>
              <span className="brand-badge">{t.brandBadge}</span>
            </div>
          </div>
          <div className="header-right">
            {/* ===== 2 BUTTONS: THEME + LANGUAGE ===== */}
            <div className="toolbar-buttons">
              {/* BUTTON 1: THEME TOGGLE */}
              <button
                className="theme-toggle-btn"
                onClick={handleThemeToggle}
                aria-label="Toggle theme"
                title="Alt+T"
              >
                <span className="btn-icon">{THEME_ICONS[currentTheme]}</span>
                <span className="btn-text">{t.themeLabel}</span>
                <span className="btn-badge">{getThemeBadge()}</span>
              </button>

              {/* BUTTON 2: LANGUAGE SWITCH */}
              <button
                className="lang-toggle-btn"
                onClick={handleLangToggle}
                aria-label="Switch language"
                title="Alt+L"
              >
                <span className="btn-icon">🌐</span>
                <span className="btn-text">{t.langLabel}</span>
                <span className="btn-badge">{t.langBadge}</span>
              </button>
            </div>

            <span className="header-user">{t.adminLabel}</span>
            <button className="logout-btn" onClick={handleLogout}>
              {t.logoutBtn}
            </button>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="dashboard-main">
        {/* Page Title */}
        <div className="page-title">
          <h1>{t.pageTitle}</h1>
          <p>{t.pageSubtitle}</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="stats-grid">
            <div className="stat-card total">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <span className="stat-number">{stats.total}</span>
                <span className="stat-label">{t.totalCandidates}</span>
              </div>
            </div>
            <div className="stat-card science">
              <div className="stat-icon">🔬</div>
              <div className="stat-info">
                <span className="stat-number">{stats.byPosition['data-science']}</span>
                <span className="stat-label">{t.dataScience}</span>
              </div>
            </div>
            <div className="stat-card analytics">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <span className="stat-number">{stats.byPosition['data-analytics']}</span>
                <span className="stat-label">{t.dataAnalytics}</span>
              </div>
            </div>
            <div className="stat-card engineer">
              <div className="stat-icon">⚙️</div>
              <div className="stat-info">
                <span className="stat-number">{stats.byPosition['data-engineer']}</span>
                <span className="stat-label">{t.dataEngineer}</span>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label>{t.filterByPosition}</label>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              <option value="all">{t.allPositions}</option>
              <option value="data-science">{t.dataScience}</option>
              <option value="data-analytics">{t.dataAnalytics}</option>
              <option value="data-engineer">{t.dataEngineer}</option>
            </select>
          </div>

          <div className="filter-group search">
            <label>{t.searchLabel}</label>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="refresh-btn" onClick={fetchCandidates}>
            {t.refreshBtn}
          </button>
        </div>

        {/* Points System Info */}
        {pointsSystem && (
          <div className="points-info">
            <h3>{t.pointsSystem}</h3>
            <div className="points-breakdown">
              <div className="points-category">
                <strong>{t.experienceLabel}</strong>
                <span>{t.experienceValues}</span>
              </div>
              <div className="points-category">
                <strong>{t.educationLabel}</strong>
                <span>{t.educationValues}</span>
              </div>
              <div className="points-category">
                <strong>{t.skillsLabel}</strong>
                <span>{t.skillsValues}</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={fetchCandidates}>{t.tryAgain}</button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading-container">
            <div className="loader"></div>
            <p>{t.loadingCandidates}</p>
          </div>
        )}

        {/* Candidates Table */}
        {!loading && !error && (
          <>
            {filteredCandidates.length === 0 ? (
              <div className="no-data">
                <span className="no-data-icon">📭</span>
                <h3>{t.noCandidatesTitle}</h3>
                <p>
                  {searchTerm
                    ? t.noCandidatesSearch
                    : t.noCandidatesEmpty}
                </p>
              </div>
            ) : (
              <div className="candidates-table-container">
                <table className="candidates-table">
                  <thead>
                    <tr>
                      <th>{t.thRank}</th>
                      <th>{t.thName}</th>
                      <th>{t.thContact}</th>
                      <th>{t.thPosition}</th>
                      <th>{t.thExperience}</th>
                      <th>{t.thEducation}</th>
                      <th>{t.thSkills}</th>
                      <th>{t.thTotalPoints}</th>
                      <th>{t.thActions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates.map((candidate) => (
                      <tr key={candidate._id}>
                        <td>
                          <div className={`rank-badge ${getRankBadgeClass(candidate.rank)}`}>
                            {candidate.rank === 1 && '🥇'}
                            {candidate.rank === 2 && '🥈'}
                            {candidate.rank === 3 && '🥉'}
                            {candidate.rank > 3 && `#${candidate.rank}`}
                          </div>
                        </td>
                        <td>
                          <div className="candidate-name">
                            <span className="name">{candidate.firstName} {candidate.lastName}</span>
                          </div>
                        </td>
                        <td>
                          <div className="contact-info">
                            <span className="email">📧 {candidate.email}</span>
                            <span className="phone">📱 {candidate.phone}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`position-badge ${candidate.position}`}>
                            {getPositionName(candidate.position)}
                          </span>
                        </td>
                        <td>
                          <div className="points-cell">
                            <span>{getExperienceName(candidate.experienceLevel)}</span>
                            <span className="points-value">+{candidate.points.experience}</span>
                          </div>
                        </td>
                        <td>
                          <div className="points-cell">
                            <span>{getEducationName(candidate.education)}</span>
                            <span className="points-value">+{candidate.points.education}</span>
                          </div>
                        </td>
                        <td>
                          <div className="points-cell">
                            <span>{candidate.skills.length} {t.skills}</span>
                            <span className="points-value">+{candidate.points.skills}</span>
                          </div>
                        </td>
                        <td>
                          <div className={`total-points ${getPointsClass(candidate.points.total)}`}>
                            {candidate.points.total}
                            <span className="points-label">{t.pts}</span>
                          </div>
                        </td>
                        <td>
                          <button
                            className="view-btn"
                            onClick={() => viewCandidate(candidate)}
                          >
                            {t.viewDetails}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Results Count */}
        {!loading && filteredCandidates.length > 0 && (
          <div className="results-count">
            {t.showingResults(filteredCandidates.length, candidates.length)}
          </div>
        )}
      </main>

      {/* ===== CANDIDATE DETAIL MODAL ===== */}
      {selectedCandidate && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>

            <div className="modal-header">
              <div className={`modal-rank ${getRankBadgeClass(selectedCandidate.rank)}`}>
                {t.rankLabel} #{selectedCandidate.rank}
              </div>
              <h2>{selectedCandidate.firstName} {selectedCandidate.lastName}</h2>
              <span className={`position-badge ${selectedCandidate.position}`}>
                {getPositionName(selectedCandidate.position)}
              </span>
            </div>

            <div className="modal-body">
              {/* Contact Section */}
              <div className="detail-section">
                <h3>{t.contactInfo}</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">{t.emailLabel}</span>
                    <span className="value">{selectedCandidate.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">{t.phoneLabel}</span>
                    <span className="value">{selectedCandidate.phone}</span>
                  </div>
                  {selectedCandidate.linkedIn && (
                    <div className="detail-item">
                      <span className="label">{t.linkedInLabel}</span>
                      <a href={selectedCandidate.linkedIn} target="_blank" rel="noopener noreferrer">
                        {selectedCandidate.linkedIn}
                      </a>
                    </div>
                  )}
                  {selectedCandidate.portfolio && (
                    <div className="detail-item">
                      <span className="label">{t.portfolioLabel}</span>
                      <a href={selectedCandidate.portfolio} target="_blank" rel="noopener noreferrer">
                        {selectedCandidate.portfolio}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Points Breakdown */}
              <div className="detail-section">
                <h3>{t.pointsBreakdown}</h3>
                <div className="points-grid">
                  <div className="point-card">
                    <span className="point-label">{t.experienceCard}</span>
                    <span className="point-detail">{getExperienceName(selectedCandidate.experienceLevel)}</span>
                    <span className="point-score">+{selectedCandidate.points.experience}</span>
                  </div>
                  <div className="point-card">
                    <span className="point-label">{t.educationCard}</span>
                    <span className="point-detail">{getEducationName(selectedCandidate.education)}</span>
                    <span className="point-score">+{selectedCandidate.points.education}</span>
                  </div>
                  <div className="point-card">
                    <span className="point-label">{t.skillsCard}</span>
                    <span className="point-detail">{selectedCandidate.skills.length} {t.skills}</span>
                    <span className="point-score">+{selectedCandidate.points.skills}</span>
                  </div>
                  <div className="point-card total">
                    <span className="point-label">{t.totalScore}</span>
                    <span className="point-score">{selectedCandidate.points.total}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="detail-section">
                <h3>{t.skillsSection}</h3>
                <div className="skills-list">
                  {selectedCandidate.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="detail-section">
                <h3>{t.additionalInfo}</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">{t.willingToRelocate}</span>
                    <span className="value">
                      {selectedCandidate.relocate === 'yes' ? t.relocateYes :
                        selectedCandidate.relocate === 'no' ? t.relocateNo : t.relocateRemote}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">{t.appliedOn}</span>
                    <span className="value">
                      {formatDate(selectedCandidate.appliedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>{t.closeBtn}</button>
              <a
                href={`mailto:${selectedCandidate.email}?subject=${t.interviewSubject(getPositionName(selectedCandidate.position))}`}
                className="btn-primary"
              >
                {t.contactCandidate}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
