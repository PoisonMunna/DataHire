import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Intro.css';

// ==================== TRANSLATIONS ====================
const translations = {
  en: {
    // Navbar
    features: 'Features',
    jobs: 'Jobs',
    howItWorks: 'How It Works',
    testimonials: 'Testimonials',
    tools: 'Tech Stack',
    jobSeeker: '🎯 Job Seeker',
    recruiter: '🏢 Recruiter',

    // Hero
    heroBadge: '#1 Data Career Platform',
    heroTitle1: 'Find Your Dream',
    heroTitle2: ' Data Career',
    heroSubtitle:
      'Connect with top companies hiring for Data Science, Analytics, and Engineering roles. Your next career breakthrough is just a click away.',
    findJobs: 'Find Jobs',
    hireTalent: 'Hire Talent',
    activeJobs: 'Active Jobs',
    companies: 'Companies',
    candidates: 'Candidates',
    placements: 'Placements',

    // Dashboard Preview
    dataAnalyst: 'Data Analyst',
    mlEngineer: 'ML Engineer',
    dataEngineer: 'Data Engineer',

    // Companies
    trustedBy: 'Trusted by leading companies worldwide',

    // Features
    featuresLabel: 'Features',
    whyChoose: 'Why Choose DataHire?',
    whyChooseDesc: 'Everything you need to find or hire the best data talent',
    feat1Title: 'Smart Job Matching',
    feat1Desc: 'Our AI-powered algorithm matches candidates with the perfect job opportunities based on skills and preferences.',
    feat2Title: 'Data-Driven Insights',
    feat2Desc: 'Get detailed analytics and insights to make informed hiring decisions and career choices.',
    feat3Title: 'Fast & Efficient',
    feat3Desc: 'Streamlined application process that saves time for both recruiters and job seekers.',
    feat4Title: 'Secure & Private',
    feat4Desc: 'Your data is protected with enterprise-grade security and privacy controls.',
    feat5Title: 'Top Companies',
    feat5Desc: 'Access opportunities from Fortune 500 companies and innovative startups.',
    feat6Title: 'Remote Opportunities',
    feat6Desc: 'Find remote, hybrid, and on-site positions that fit your lifestyle.',

    // Categories
    categoriesLabel: 'Categories',
    exploreCategories: 'Explore Job Categories',
    exploreCategoriesDesc: 'Find opportunities across various data domains',
    catDataScience: 'Data Science',
    catDataAnalytics: 'Data Analytics',
    catDataEngineering: 'Data Engineering',
    catML: 'Machine Learning',
    catCloud: 'Cloud Computing',
    catCyber: 'Cybersecurity',
    openings: 'openings',
    explore: 'Explore →',

    // How It Works
    processLabel: 'Process',
    howItWorksTitle: 'How It Works',
    howItWorksDesc: 'Simple steps to your success',
    forJobSeekers: 'For Job Seekers',
    forRecruiters: 'For Recruiters',
    or: 'OR',
    js1Title: 'Create Profile',
    js1Desc: 'Sign up and build your professional profile',
    js2Title: 'Add Skills',
    js2Desc: 'Showcase your expertise and experience',
    js3Title: 'Get Matched',
    js3Desc: 'AI matches you with perfect opportunities',
    js4Title: 'Get Hired',
    js4Desc: 'Apply, interview, and land your dream job',
    rc1Title: 'Post Jobs',
    rc1Desc: 'Create detailed job listings easily',
    rc2Title: 'Find Talent',
    rc2Desc: 'Access our pool of qualified candidates',
    rc3Title: 'Screen & Interview',
    rc3Desc: 'Use our tools to evaluate candidates',
    rc4Title: 'Hire the Best',
    rc4Desc: 'Make offers and onboard seamlessly',
    getStartedJobSeeker: 'Get Started as Job Seeker',
    getStartedRecruiter: 'Get Started as Recruiter',

    // Testimonials
    testimonialsLabel: 'Testimonials',
    whatUsersSay: 'What Our Users Say',
    whatUsersSayDesc: 'Success stories from job seekers and recruiters',
    test1Name: 'Sarah Johnson',
    test1Role: 'Data Scientist at Google',
    test1Quote: 'DataHire helped me land my dream job at Google! The platform matched me with perfect opportunities based on my ML expertise.',
    test2Name: 'Michael Chen',
    test2Role: 'Hiring Manager at Microsoft',
    test2Quote: 'As a recruiter, DataHire has transformed our hiring process. We found exceptional data talent in half the time.',
    test3Name: 'Emily Rodriguez',
    test3Role: 'Data Engineer at Netflix',
    test3Quote: 'The skill assessment feature helped me showcase my abilities. Got 5 interview calls in the first week!',

    // ===== TOOLS & TECHNOLOGIES =====
    toolsLabel: 'Tech Stack',
    toolsTitle: 'Built With Modern Technologies',
    toolsDesc: 'Powered by industry-leading tools and frameworks for performance, security, and scalability',
    toolReactName: 'React.js',
    toolReactDesc: 'Dynamic, component-based frontend with responsive UI/UX and real-time state management',
    toolReactTag: 'Frontend',
    toolNodeName: 'Node.js',
    toolNodeDesc: 'High-performance JavaScript runtime powering our scalable backend server',
    toolNodeTag: 'Runtime',
    toolExpressName: 'Express.js',
    toolExpressDesc: 'Fast, minimalist web framework for building robust REST API endpoints',
    toolExpressTag: 'Backend',
    toolMongoName: 'MongoDB Atlas',
    toolMongoDesc: 'Cloud-native NoSQL database for flexible, scalable data storage and retrieval',
    toolMongoTag: 'Database',
    toolFirebaseName: 'Firebase',
    toolFirebaseDesc: 'Google\'s platform for authentication, hosting, and real-time cloud services',
    toolFirebaseTag: 'Auth & Cloud',
    toolGeminiName: 'Gemini AI',
    toolGeminiDesc: 'Google\'s generative AI for intelligent resume parsing and smart auto-fill',
    toolGeminiTag: 'AI / ML',
    toolRestName: 'REST API',
    toolRestDesc: 'RESTful architecture ensuring clean, stateless communication between client and server',
    toolRestTag: 'Architecture',
    toolResponsiveName: 'Responsive UI/UX',
    toolResponsiveDesc: 'Fully responsive design with 3 themes (Light, Dark, High Contrast) and bilingual support (EN/HI)',
    toolResponsiveTag: 'Design',
    toolsArchTitle: 'System Architecture',
    toolsArchUser: 'User',
    toolsArchFrontend: 'React Frontend',
    toolsArchThemes: '3 Themes + 2 Languages',
    toolsArchApi: 'REST API',
    toolsArchBackend: 'Express + Node.js',
    toolsArchAi: 'Gemini AI',
    toolsArchResume: 'Resume Parsing',
    toolsArchDb: 'MongoDB Atlas',
    toolsArchDataStore: 'Data Storage',
    toolsArchFirebase: 'Firebase',
    toolsArchAuth: 'Authentication',

    // CTA
    readyToStart: 'Ready to Start Your Journey?',
    ctaDesc: 'Join thousands of professionals who found their perfect match on DataHire',
    imJobSeeker: "I'm a Job Seeker",
    imRecruiter: "I'm a Recruiter",
    findDreamJob: 'Find your dream job today',
    hireTopTalent: 'Hire top data talent',

    // Footer
    footerDesc: 'The #1 platform connecting data professionals with their dream careers. Join our community of innovators today.',
    forJobSeekersFooter: 'For Job Seekers',
    browseJobs: 'Browse Jobs',
    careerResources: 'Career Resources',
    salaryGuide: 'Salary Guide',
    resumeBuilder: 'Resume Builder',
    forRecruitersFooter: 'For Recruiters',
    postJob: 'Post a Job',
    searchCandidates: 'Search Candidates',
    pricingPlans: 'Pricing Plans',
    recruitmentTools: 'Recruitment Tools',
    company: 'Company',
    aboutUs: 'About Us',
    careers: 'Careers',
    blog: 'Blog',
    contact: 'Contact',
    support: 'Support',
    helpCenter: 'Help Center',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    faq: 'FAQ',
    footerCopyright: '© 2026 DataHire. All rights reserved.',
    secure: '🔒 Secure',
    global: '🌍 Global',
    fast: '⚡ Fast',

    // Theme & Language
    lightTheme: 'Light',
    darkTheme: 'Dark',
    highContrast: 'High Contrast',
  },
  hi: {
    // Navbar
    features: 'विशेषताएं',
    jobs: 'नौकरियां',
    howItWorks: 'कैसे काम करता है',
    testimonials: 'प्रशंसापत्र',
    tools: 'टेक स्टैक',
    jobSeeker: '🎯 नौकरी खोजें',
    recruiter: '🏢 भर्तीकर्ता',

    // Hero
    heroBadge: '#1 डेटा करियर प्लेटफॉर्म',
    heroTitle1: 'अपना सपनों का',
    heroTitle2: ' डेटा करियर खोजें',
    heroSubtitle:
      'डेटा साइंस, एनालिटिक्स और इंजीनियरिंग भूमिकाओं के लिए शीर्ष कंपनियों से जुड़ें। आपकी अगली करियर सफलता बस एक क्लिक दूर है।',
    findJobs: 'नौकरी खोजें',
    hireTalent: 'प्रतिभा नियुक्त करें',
    activeJobs: 'सक्रिय नौकरियां',
    companies: 'कंपनियां',
    candidates: 'उम्मीदवार',
    placements: 'नियुक्तियां',

    // Dashboard Preview
    dataAnalyst: 'डेटा विश्लेषक',
    mlEngineer: 'ML इंजीनियर',
    dataEngineer: 'डेटा इंजीनियर',

    // Companies
    trustedBy: 'दुनिया भर की प्रमुख कंपनियों द्वारा विश्वसनीय',

    // Features
    featuresLabel: 'विशेषताएं',
    whyChoose: 'DataHire क्यों चुनें?',
    whyChooseDesc: 'सर्वश्रेष्ठ डेटा प्रतिभा खोजने या नियुक्त करने के लिए आपको जो कुछ भी चाहिए',
    feat1Title: 'स्मार्ट जॉब मैचिंग',
    feat1Desc: 'हमारा AI-संचालित एल्गोरिथम कौशल और प्राथमिकताओं के आधार पर उम्मीदवारों को सही नौकरी के अवसरों से जोड़ता है।',
    feat2Title: 'डेटा-संचालित अंतर्दृष्टि',
    feat2Desc: 'सूचित भर्ती निर्णय और करियर विकल्प बनाने के लिए विस्तृत विश्लेषण और अंतर्दृष्टि प्राप्त करें।',
    feat3Title: 'तेज़ और कुशल',
    feat3Desc: 'सुव्यवस्थित आवेदन प्रक्रिया जो भर्तीकर्ताओं और नौकरी चाहने वालों दोनों का समय बचाती है।',
    feat4Title: 'सुरक्षित और निजी',
    feat4Desc: 'आपका डेटा एंटरप्राइज-ग्रेड सुरक्षा और गोपनीयता नियंत्रणों से सुरक्षित है।',
    feat5Title: 'शीर्ष कंपनियां',
    feat5Desc: 'Fortune 500 कंपनियों और नवीन स्टार्टअप्स से अवसर प्राप्त करें।',
    feat6Title: 'रिमोट अवसर',
    feat6Desc: 'रिमोट, हाइब्रिड और ऑन-साइट पद खोजें जो आपकी जीवनशैली में फिट हों।',

    // Categories
    categoriesLabel: 'श्रेणियां',
    exploreCategories: 'नौकरी श्रेणियां देखें',
    exploreCategoriesDesc: 'विभिन्न डेटा डोमेन में अवसर खोजें',
    catDataScience: 'डेटा साइंस',
    catDataAnalytics: 'डेटा एनालिटिक्स',
    catDataEngineering: 'डेटा इंजीनियरिंग',
    catML: 'मशीन लर्निंग',
    catCloud: 'क्लाउड कंप्यूटिंग',
    catCyber: 'साइबर सुरक्षा',
    openings: 'रिक्तियां',
    explore: 'देखें →',

    // How It Works
    processLabel: 'प्रक्रिया',
    howItWorksTitle: 'कैसे काम करता है',
    howItWorksDesc: 'आपकी सफलता के सरल कदम',
    forJobSeekers: 'नौकरी खोजने वालों के लिए',
    forRecruiters: 'भर्तीकर्ताओं के लिए',
    or: 'या',
    js1Title: 'प्रोफ़ाइल बनाएं',
    js1Desc: 'साइन अप करें और अपनी पेशेवर प्रोफ़ाइल बनाएं',
    js2Title: 'कौशल जोड़ें',
    js2Desc: 'अपनी विशेषज्ञता और अनुभव प्रदर्शित करें',
    js3Title: 'मैच पाएं',
    js3Desc: 'AI आपको सही अवसरों से मिलाता है',
    js4Title: 'नियुक्त हों',
    js4Desc: 'आवेदन करें, साक्षात्कार दें और अपनी सपनों की नौकरी पाएं',
    rc1Title: 'नौकरी पोस्ट करें',
    rc1Desc: 'आसानी से विस्तृत नौकरी सूची बनाएं',
    rc2Title: 'प्रतिभा खोजें',
    rc2Desc: 'हमारे योग्य उम्मीदवारों के पूल तक पहुंचें',
    rc3Title: 'स्क्रीन और साक्षात्कार',
    rc3Desc: 'उम्मीदवारों का मूल्यांकन करने के लिए हमारे उपकरणों का उपयोग करें',
    rc4Title: 'सर्वश्रेष्ठ को नियुक्त करें',
    rc4Desc: 'ऑफर दें और सहजता से ऑनबोर्ड करें',
    getStartedJobSeeker: 'नौकरी खोजने वाले के रूप में शुरू करें',
    getStartedRecruiter: 'भर्तीकर्ता के रूप में शुरू करें',

    // Testimonials
    testimonialsLabel: 'प्रशंसापत्र',
    whatUsersSay: 'हमारे उपयोगकर्ता क्या कहते हैं',
    whatUsersSayDesc: 'नौकरी चाहने वालों और भर्तीकर्ताओं की सफलता की कहानियां',
    test1Name: 'सारा जॉनसन',
    test1Role: 'Google में डेटा साइंटिस्ट',
    test1Quote: 'DataHire ने मुझे Google में मेरी सपनों की नौकरी पाने में मदद की! प्लेटफ़ॉर्म ने मेरी ML विशेषज्ञता के आधार पर मुझे सही अवसरों से जोड़ा।',
    test2Name: 'माइकल चेन',
    test2Role: 'Microsoft में भर्ती प्रबंधक',
    test2Quote: 'एक भर्तीकर्ता के रूप में, DataHire ने हमारी भर्ती प्रक्रिया को बदल दिया है। हमने आधे समय में असाधारण डेटा प्रतिभा पाई।',
    test3Name: 'एमिली रोड्रिगेज',
    test3Role: 'Netflix में डेटा इंजीनियर',
    test3Quote: 'कौशल मूल्यांकन सुविधा ने मुझे अपनी क्षमताओं को प्रदर्शित करने में मदद की। पहले सप्ताह में 5 साक्षात्कार कॉल मिलीं!',

    // ===== TOOLS & TECHNOLOGIES =====
    toolsLabel: 'टेक स्टैक',
    toolsTitle: 'आधुनिक तकनीकों से निर्मित',
    toolsDesc: 'प्रदर्शन, सुरक्षा और स्केलेबिलिटी के लिए उद्योग-अग्रणी टूल्स और फ्रेमवर्क द्वारा संचालित',
    toolReactName: 'React.js',
    toolReactDesc: 'रेस्पॉन्सिव UI/UX और रियल-टाइम स्टेट मैनेजमेंट के साथ डायनामिक, कम्पोनेंट-आधारित फ्रंटएंड',
    toolReactTag: 'फ्रंटएंड',
    toolNodeName: 'Node.js',
    toolNodeDesc: 'हमारे स्केलेबल बैकएंड सर्वर को पावर करने वाला हाई-परफॉर्मेंस जावास्क्रिप्ट रनटाइम',
    toolNodeTag: 'रनटाइम',
    toolExpressName: 'Express.js',
    toolExpressDesc: 'मजबूत REST API एंडपॉइंट बनाने के लिए तेज़, न्यूनतम वेब फ्रेमवर्क',
    toolExpressTag: 'बैकएंड',
    toolMongoName: 'MongoDB Atlas',
    toolMongoDesc: 'लचीले, स्केलेबल डेटा स्टोरेज और रिट्रीवल के लिए क्लाउड-नेटिव NoSQL डेटाबेस',
    toolMongoTag: 'डेटाबेस',
    toolFirebaseName: 'Firebase',
    toolFirebaseDesc: 'प्रमाणीकरण, होस्टिंग और रियल-टाइम क्लाउड सेवाओं के लिए Google का प्लेटफॉर्म',
    toolFirebaseTag: 'ऑथ और क्लाउड',
    toolGeminiName: 'Gemini AI',
    toolGeminiDesc: 'इंटेलिजेंट रिज्यूमे पार्सिंग और स्मार्ट ऑटो-फिल के लिए Google का जनरेटिव AI',
    toolGeminiTag: 'AI / ML',
    toolRestName: 'REST API',
    toolRestDesc: 'क्लाइंट और सर्वर के बीच क्लीन, स्टेटलेस कम्युनिकेशन सुनिश्चित करने वाली RESTful आर्किटेक्चर',
    toolRestTag: 'आर्किटेक्चर',
    toolResponsiveName: 'रेस्पॉन्सिव UI/UX',
    toolResponsiveDesc: '3 थीम (लाइट, डार्क, हाई कंट्रास्ट) और द्विभाषी सपोर्ट (EN/HI) के साथ पूरी तरह रेस्पॉन्सिव डिज़ाइन',
    toolResponsiveTag: 'डिज़ाइन',
    toolsArchTitle: 'सिस्टम आर्किटेक्चर',
    toolsArchUser: 'उपयोगकर्ता',
    toolsArchFrontend: 'React फ्रंटएंड',
    toolsArchThemes: '3 थीम + 2 भाषाएं',
    toolsArchApi: 'REST API',
    toolsArchBackend: 'Express + Node.js',
    toolsArchAi: 'Gemini AI',
    toolsArchResume: 'रिज्यूमे पार्सिंग',
    toolsArchDb: 'MongoDB Atlas',
    toolsArchDataStore: 'डेटा स्टोरेज',
    toolsArchFirebase: 'Firebase',
    toolsArchAuth: 'प्रमाणीकरण',

    // CTA
    readyToStart: 'अपनी यात्रा शुरू करने के लिए तैयार हैं?',
    ctaDesc: 'हजारों पेशेवरों से जुड़ें जिन्होंने DataHire पर अपना सही मैच पाया',
    imJobSeeker: 'मैं नौकरी खोज रहा हूं',
    imRecruiter: 'मैं भर्तीकर्ता हूं',
    findDreamJob: 'आज ही अपनी सपनों की नौकरी खोजें',
    hireTopTalent: 'शीर्ष डेटा प्रतिभा नियुक्त करें',

    // Footer
    footerDesc: 'डेटा पेशेवरों को उनके सपनों के करियर से जोड़ने वाला #1 प्लेटफॉर्म। आज ही हमारे नवप्रवर्तकों के समुदाय से जुड़ें।',
    forJobSeekersFooter: 'नौकरी खोजने वालों के लिए',
    browseJobs: 'नौकरियां ब्राउज़ करें',
    careerResources: 'करियर संसाधन',
    salaryGuide: 'वेतन गाइड',
    resumeBuilder: 'रिज्यूमे बिल्डर',
    forRecruitersFooter: 'भर्तीकर्ताओं के लिए',
    postJob: 'नौकरी पोस्ट करें',
    searchCandidates: 'उम्मीदवार खोजें',
    pricingPlans: 'मूल्य योजनाएं',
    recruitmentTools: 'भर्ती उपकरण',
    company: 'कंपनी',
    aboutUs: 'हमारे बारे में',
    careers: 'करियर',
    blog: 'ब्लॉग',
    contact: 'संपर्क',
    support: 'सहायता',
    helpCenter: 'सहायता केंद्र',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें',
    faq: 'अक्सर पूछे जाने वाले प्रश्न',
    footerCopyright: '© 2026 DataHire. सर्वाधिकार सुरक्षित।',
    secure: '🔒 सुरक्षित',
    global: '🌍 वैश्विक',
    fast: '⚡ तेज़',

    // Theme & Language
    lightTheme: 'लाइट',
    darkTheme: 'डार्क',
    highContrast: 'हाई कॉन्ट्रास्ट',
  },
};

const themes = ['light', 'dark', 'high-contrast'];
const themeIcons = { light: '☀️', dark: '🌙', 'high-contrast': '👁️' };
const themeLabelsKey = {
  light: 'lightTheme',
  dark: 'darkTheme',
  'high-contrast': 'highContrast',
};

const Intro = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    () => localStorage.getItem('app-theme') || 'light'
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem('app-language') || 'en'
  );
  const t = translations[language];

  const [counters, setCounters] = useState({
    jobs: 0, companies: 0, candidates: 0, placements: 0,
  });

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeToolIndex, setActiveToolIndex] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  // Animated counters
  useEffect(() => {
    const targets = { jobs: 5000, companies: 500, candidates: 50000, placements: 15000 };
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounters({
        jobs: Math.floor((targets.jobs / steps) * step),
        companies: Math.floor((targets.companies / steps) * step),
        candidates: Math.floor((targets.candidates / steps) * step),
        placements: Math.floor((targets.placements / steps) * step),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Testimonials
  const testimonials = [
    { name: t.test1Name, role: t.test1Role, image: '👩‍💼', quote: t.test1Quote, rating: 5 },
    { name: t.test2Name, role: t.test2Role, image: '👨‍💼', quote: t.test2Quote, rating: 5 },
    { name: t.test3Name, role: t.test3Role, image: '👩‍🔬', quote: t.test3Quote, rating: 5 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Features
  const features = [
    { icon: '🎯', title: t.feat1Title, description: t.feat1Desc },
    { icon: '📊', title: t.feat2Title, description: t.feat2Desc },
    { icon: '🚀', title: t.feat3Title, description: t.feat3Desc },
    { icon: '🔒', title: t.feat4Title, description: t.feat4Desc },
    { icon: '💼', title: t.feat5Title, description: t.feat5Desc },
    { icon: '🌐', title: t.feat6Title, description: t.feat6Desc },
  ];

  // Job categories
  const jobCategories = [
    { icon: '🔬', name: t.catDataScience, openings: '1,200+' },
    { icon: '📈', name: t.catDataAnalytics, openings: '980+' },
    { icon: '⚙️', name: t.catDataEngineering, openings: '850+' },
    { icon: '🤖', name: t.catML, openings: '720+' },
    { icon: '☁️', name: t.catCloud, openings: '650+' },
    { icon: '🛡️', name: t.catCyber, openings: '540+' },
  ];

  // How it works
  const howItWorks = {
    jobSeeker: [
      { step: 1, title: t.js1Title, desc: t.js1Desc },
      { step: 2, title: t.js2Title, desc: t.js2Desc },
      { step: 3, title: t.js3Title, desc: t.js3Desc },
      { step: 4, title: t.js4Title, desc: t.js4Desc },
    ],
    recruiter: [
      { step: 1, title: t.rc1Title, desc: t.rc1Desc },
      { step: 2, title: t.rc2Title, desc: t.rc2Desc },
      { step: 3, title: t.rc3Title, desc: t.rc3Desc },
      { step: 4, title: t.rc4Title, desc: t.rc4Desc },
    ],
  };

  // ===== TOOLS & TECHNOLOGIES DATA =====
  const toolsData = [
    {
      icon: '⚛️',
      name: t.toolReactName,
      description: t.toolReactDesc,
      tag: t.toolReactTag,
      color: '#61DAFB',
      bgGradient: 'linear-gradient(135deg, #61DAFB20, #61DAFB05)',
    },
    {
      icon: '🟢',
      name: t.toolNodeName,
      description: t.toolNodeDesc,
      tag: t.toolNodeTag,
      color: '#339933',
      bgGradient: 'linear-gradient(135deg, #33993320, #33993305)',
    },
    {
      icon: '🚂',
      name: t.toolExpressName,
      description: t.toolExpressDesc,
      tag: t.toolExpressTag,
      color: '#000000',
      bgGradient: 'linear-gradient(135deg, #68686820, #68686805)',
    },
    {
      icon: '🍃',
      name: t.toolMongoName,
      description: t.toolMongoDesc,
      tag: t.toolMongoTag,
      color: '#47A248',
      bgGradient: 'linear-gradient(135deg, #47A24820, #47A24805)',
    },
    {
      icon: '🔥',
      name: t.toolFirebaseName,
      description: t.toolFirebaseDesc,
      tag: t.toolFirebaseTag,
      color: '#FFCA28',
      bgGradient: 'linear-gradient(135deg, #FFCA2820, #FFCA2805)',
    },
    {
      icon: '🤖',
      name: t.toolGeminiName,
      description: t.toolGeminiDesc,
      tag: t.toolGeminiTag,
      color: '#8E75B2',
      bgGradient: 'linear-gradient(135deg, #8E75B220, #8E75B205)',
    },
    {
      icon: '🔗',
      name: t.toolRestName,
      description: t.toolRestDesc,
      tag: t.toolRestTag,
      color: '#FF6C37',
      bgGradient: 'linear-gradient(135deg, #FF6C3720, #FF6C3705)',
    },
    {
      icon: '📱',
      name: t.toolResponsiveName,
      description: t.toolResponsiveDesc,
      tag: t.toolResponsiveTag,
      color: '#E91E63',
      bgGradient: 'linear-gradient(135deg, #E91E6320, #E91E6305)',
    },
  ];

  const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple', 'Uber', 'Airbnb'];

  const handleLogin = (userType) => {
    if (userType === 'job-seeker') navigate('/job-seeker/login');
    else if (userType === 'recruiter') navigate('/recruiter/login');
  };

  return (
    <>
      {/* FLOATING CONTROLS */}
      <div className="floating-controls">
        <button className="control-btn theme-toggle-btn" onClick={cycleTheme} title="Switch theme"
          aria-label={`Current theme: ${theme}. Click to switch.`}>
          <span className="control-icon">{themeIcons[theme]}</span>
          <span className="control-label">{t[themeLabelsKey[theme]]}</span>
          <span className="theme-indicator">
            {themes.map((th) => (
              <span key={th} className={`indicator-dot ${th === theme ? 'active' : ''}`}></span>
            ))}
          </span>
        </button>
        <button className="control-btn language-toggle-btn" onClick={toggleLanguage}
          title={language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
          aria-label={`Current language: ${language === 'en' ? 'English' : 'Hindi'}`}>
          <span className="control-icon">🌐</span>
          <span className="control-label">{language === 'en' ? 'हिं' : 'EN'}</span>
          <span className="language-badge">{language === 'en' ? 'English' : 'हिंदी'}</span>
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <div className="intro-container">
        {/* Navigation — added tools link */}
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <span className="logo-icon">💼</span>
              <span className="logo-text">DataHire</span>
            </div>
            <div className="nav-links">
              <a href="#features">{t.features}</a>
              <a href="#jobs">{t.jobs}</a>
              <a href="#how-it-works">{t.howItWorks}</a>
              <a href="#tools">{t.tools}</a>
              <a href="#testimonials">{t.testimonials}</a>
            </div>
            <div className="nav-buttons">
              <button className="btn-login job-seeker" onClick={() => handleLogin('job-seeker')}>
                {t.jobSeeker}
              </button>
              <button className="btn-login recruiter" onClick={() => handleLogin('recruiter')}>
                {t.recruiter}
              </button>
            </div>
            <div className="mobile-menu-btn">
              <span></span><span></span><span></span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
            <div className="floating-shape shape-4"></div>
          </div>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🚀</span>
              <span>{t.heroBadge}</span>
            </div>
            <h1 className="hero-title">
              {t.heroTitle1}
              <span className="gradient-text">{t.heroTitle2}</span>
            </h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
            <div className="hero-buttons">
              <button className="btn-primary large" onClick={() => handleLogin('job-seeker')}>
                <span className="btn-icon">🎯</span>{t.findJobs}<span className="btn-arrow">→</span>
              </button>
              <button className="btn-secondary large" onClick={() => handleLogin('recruiter')}>
                <span className="btn-icon">🏢</span>{t.hireTalent}<span className="btn-arrow">→</span>
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{counters.jobs.toLocaleString()}+</span>
                <span className="stat-label">{t.activeJobs}</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{counters.companies.toLocaleString()}+</span>
                <span className="stat-label">{t.companies}</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{counters.candidates.toLocaleString()}+</span>
                <span className="stat-label">{t.candidates}</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{counters.placements.toLocaleString()}+</span>
                <span className="stat-label">{t.placements}</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots"><span></span><span></span><span></span></div>
              </div>
              <div className="preview-content">
                <div className="preview-card card-1">
                  <span className="card-icon">📊</span><span>{t.dataAnalyst}</span>
                  <span className="salary">$95k - $120k</span>
                </div>
                <div className="preview-card card-2">
                  <span className="card-icon">🔬</span><span>{t.mlEngineer}</span>
                  <span className="salary">$130k - $180k</span>
                </div>
                <div className="preview-card card-3">
                  <span className="card-icon">⚙️</span><span>{t.dataEngineer}</span>
                  <span className="salary">$110k - $150k</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted Companies */}
        <section className="companies-section">
          <p className="companies-title">{t.trustedBy}</p>
          <div className="companies-scroll">
            <div className="companies-track">
              {[...companies, ...companies].map((company, index) => (
                <div key={index} className="company-logo">{company}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="features-section">
          <div className="section-header">
            <span className="section-badge">{t.featuresLabel}</span>
            <h2>{t.whyChoose}</h2>
            <p>{t.whyChooseDesc}</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Job Categories */}
        <section id="jobs" className="categories-section">
          <div className="section-header">
            <span className="section-badge">{t.categoriesLabel}</span>
            <h2>{t.exploreCategories}</h2>
            <p>{t.exploreCategoriesDesc}</p>
          </div>
          <div className="categories-grid">
            {jobCategories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.openings} {t.openings}</p>
                <button className="category-btn">{t.explore}</button>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="how-it-works-section">
          <div className="section-header">
            <span className="section-badge">{t.processLabel}</span>
            <h2>{t.howItWorksTitle}</h2>
            <p>{t.howItWorksDesc}</p>
          </div>
          <div className="how-it-works-container">
            <div className="process-column">
              <div className="process-header job-seeker">
                <span className="process-icon">🎯</span>
                <h3>{t.forJobSeekers}</h3>
              </div>
              <div className="steps-container">
                {howItWorks.jobSeeker.map((item, index) => (
                  <div key={index} className="step-card">
                    <div className="step-number">{item.step}</div>
                    <div className="step-content"><h4>{item.title}</h4><p>{item.desc}</p></div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => handleLogin('job-seeker')}>
                {t.getStartedJobSeeker}
              </button>
            </div>
            <div className="process-divider"><span>{t.or}</span></div>
            <div className="process-column">
              <div className="process-header recruiter">
                <span className="process-icon">🏢</span>
                <h3>{t.forRecruiters}</h3>
              </div>
              <div className="steps-container">
                {howItWorks.recruiter.map((item, index) => (
                  <div key={index} className="step-card">
                    <div className="step-number">{item.step}</div>
                    <div className="step-content"><h4>{item.title}</h4><p>{item.desc}</p></div>
                  </div>
                ))}
              </div>
              <button className="btn-secondary" onClick={() => handleLogin('recruiter')}>
                {t.getStartedRecruiter}
              </button>
            </div>
          </div>
        </section>

        {/* ==================== TOOLS & TECHNOLOGIES SECTION ==================== */}
        <section id="tools" className="tools-section">
          <div className="section-header">
            <span className="section-badge">🛠️ {t.toolsLabel}</span>
            <h2>{t.toolsTitle}</h2>
            <p>{t.toolsDesc}</p>
          </div>

          {/* Tools Grid */}
          <div className="tools-grid">
            {toolsData.map((tool, index) => (
              <div
                key={index}
                className={`tool-card ${activeToolIndex === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveToolIndex(index)}
                onMouseLeave={() => setActiveToolIndex(null)}
                style={{ '--tool-color': tool.color, '--tool-bg': tool.bgGradient }}
              >
                <div className="tool-card-glow"></div>
                <div className="tool-card-content">
                  <div className="tool-icon-wrapper">
                    <span className="tool-icon">{tool.icon}</span>
                    <span className="tool-tag" style={{ background: tool.color }}>
                      {tool.tag}
                    </span>
                  </div>
                  <h3 className="tool-name">{tool.name}</h3>
                  <p className="tool-description">{tool.description}</p>
                  <div className="tool-pulse" style={{ background: tool.color }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Flow Diagram */}
          <div className="architecture-container">
            <h3 className="arch-title">
              <span className="arch-icon">🏗️</span>
              {t.toolsArchTitle}
            </h3>
            <div className="arch-flow">
              {/* User */}
              <div className="arch-node arch-user">
                <div className="arch-node-icon">👤</div>
                <div className="arch-node-label">{t.toolsArchUser}</div>
              </div>

              <div className="arch-connector">
                <div className="arch-line"></div>
                <div className="arch-arrow">→</div>
              </div>

              {/* Frontend */}
              <div className="arch-node arch-frontend">
                <div className="arch-node-icon">⚛️</div>
                <div className="arch-node-label">{t.toolsArchFrontend}</div>
                <div className="arch-node-sub">{t.toolsArchThemes}</div>
              </div>

              <div className="arch-connector">
                <div className="arch-line"></div>
                <div className="arch-arrow">⇄</div>
              </div>

              {/* API */}
              <div className="arch-node arch-api">
                <div className="arch-node-icon">🔗</div>
                <div className="arch-node-label">{t.toolsArchApi}</div>
              </div>

              <div className="arch-connector">
                <div className="arch-line"></div>
                <div className="arch-arrow">⇄</div>
              </div>

              {/* Backend */}
              <div className="arch-node arch-backend">
                <div className="arch-node-icon">🚂</div>
                <div className="arch-node-label">{t.toolsArchBackend}</div>
              </div>

              <div className="arch-connector-group">
                <div className="arch-branch">
                  <div className="arch-connector vertical">
                    <div className="arch-line"></div>
                    <div className="arch-arrow">↓</div>
                  </div>
                  <div className="arch-node arch-ai">
                    <div className="arch-node-icon">🤖</div>
                    <div className="arch-node-label">{t.toolsArchAi}</div>
                    <div className="arch-node-sub">{t.toolsArchResume}</div>
                  </div>
                </div>

                <div className="arch-branch">
                  <div className="arch-connector vertical">
                    <div className="arch-line"></div>
                    <div className="arch-arrow">↓</div>
                  </div>
                  <div className="arch-node arch-db">
                    <div className="arch-node-icon">🍃</div>
                    <div className="arch-node-label">{t.toolsArchDb}</div>
                    <div className="arch-node-sub">{t.toolsArchDataStore}</div>
                  </div>
                </div>

                <div className="arch-branch">
                  <div className="arch-connector vertical">
                    <div className="arch-line"></div>
                    <div className="arch-arrow">↓</div>
                  </div>
                  <div className="arch-node arch-firebase">
                    <div className="arch-node-icon">🔥</div>
                    <div className="arch-node-label">{t.toolsArchFirebase}</div>
                    <div className="arch-node-sub">{t.toolsArchAuth}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="testimonials-section">
          <div className="section-header">
            <span className="section-badge">{t.testimonialsLabel}</span>
            <h2>{t.whatUsersSay}</h2>
            <p>{t.whatUsersSayDesc}</p>
          </div>
          <div className="testimonials-container">
            <div className="testimonial-card active">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p className="quote-text">{testimonials[activeTestimonial].quote}</p>
                <div className="rating">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonials[activeTestimonial].image}</div>
                <div className="author-info">
                  <h4>{testimonials[activeTestimonial].name}</h4>
                  <p>{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button key={index}
                  className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-background">
            <div className="cta-shape cta-shape-1"></div>
            <div className="cta-shape cta-shape-2"></div>
          </div>
          <div className="cta-content">
            <h2>{t.readyToStart}</h2>
            <p>{t.ctaDesc}</p>
            <div className="cta-buttons">
              <button className="btn-cta job-seeker" onClick={() => handleLogin('job-seeker')}>
                <div className="btn-content">
                  <span className="btn-emoji">🎯</span>
                  <div className="btn-text">
                    <span className="btn-title">{t.imJobSeeker}</span>
                    <span className="btn-subtitle">{t.findDreamJob}</span>
                  </div>
                </div>
                <span className="btn-arrow">→</span>
              </button>
              <button className="btn-cta recruiter" onClick={() => handleLogin('recruiter')}>
                <div className="btn-content">
                  <span className="btn-emoji">🏢</span>
                  <div className="btn-text">
                    <span className="btn-title">{t.imRecruiter}</span>
                    <span className="btn-subtitle">{t.hireTopTalent}</span>
                  </div>
                </div>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-brand">
                <div className="logo">
                  <span className="logo-icon">💼</span>
                  <span className="logo-text">DataHire</span>
                </div>
                <p>{t.footerDesc}</p>
                <div className="social-links">
                  <a href="#" className="social-link">📘</a>
                  <a href="#" className="social-link">🐦</a>
                  <a href="#" className="social-link">💼</a>
                  <a href="#" className="social-link">📸</a>
                </div>
              </div>
              <div className="footer-links">
                <div className="footer-column">
                  <h4>{t.forJobSeekersFooter}</h4>
                  <a href="#">{t.browseJobs}</a>
                  <a href="#">{t.careerResources}</a>
                  <a href="#">{t.salaryGuide}</a>
                  <a href="#">{t.resumeBuilder}</a>
                </div>
                <div className="footer-column">
                  <h4>{t.forRecruitersFooter}</h4>
                  <a href="#">{t.postJob}</a>
                  <a href="#">{t.searchCandidates}</a>
                  <a href="#">{t.pricingPlans}</a>
                  <a href="#">{t.recruitmentTools}</a>
                </div>
                <div className="footer-column">
                  <h4>{t.company}</h4>
                  <a href="#">{t.aboutUs}</a>
                  <a href="#">{t.careers}</a>
                  <a href="#">{t.blog}</a>
                  <a href="#">{t.contact}</a>
                </div>
                <div className="footer-column">
                  <h4>{t.support}</h4>
                  <a href="#">{t.helpCenter}</a>
                  <a href="#">{t.privacyPolicy}</a>
                  <a href="#">{t.termsOfService}</a>
                  <a href="#">{t.faq}</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>{t.footerCopyright}</p>
              <div className="footer-badges">
                <span>{t.secure}</span>
                <span>{t.global}</span>
                <span>{t.fast}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Intro;