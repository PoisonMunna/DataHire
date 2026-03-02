// backend/controllers/resumeController.js
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const mammoth = require('mammoth');

// Load .env
require('dotenv').config();

// ==================== PDF PARSE FIX ====================
let pdfParse;
try {
  pdfParse = require('pdf-parse/lib/pdf-parse');
  console.log('✅ pdf-parse loaded (method 1)');
} catch (e) {
  try {
    const pdfModule = require('pdf-parse');
    pdfParse = typeof pdfModule === 'function' ? pdfModule : pdfModule.default;
    console.log('✅ pdf-parse loaded (method 2)');
  } catch (e2) {
    console.error('❌ pdf-parse failed to load');
  }
}

// ==================== INITIALIZE OPENAI ====================
let client;
try {
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  console.log('✅ OpenAI client initialized');
  console.log('🔑 Key starts with:', process.env.OPENAI_API_KEY?.substring(0, 8) + '...');
} catch (error) {
  console.error('❌ OpenAI init error:', error.message);
}

// ==================== EXTRACT TEXT ====================
const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  console.log('📖 PDF buffer size:', dataBuffer.length, 'bytes');

  if (!pdfParse || typeof pdfParse !== 'function') {
    throw new Error('pdf-parse module not loaded properly');
  }

  const data = await pdfParse(dataBuffer);
  console.log('📖 PDF pages:', data.numpages);
  console.log('📖 PDF text length:', data.text.length, 'chars');
  return data.text;
};

const extractTextFromDOCX = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  console.log('📖 DOCX text length:', result.value.length, 'chars');
  return result.value;
};

// ==================== SKILLS LISTS ====================
const allSkillsByPosition = {
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

const allSkillsFlat = [
  'Python', 'R', 'Machine Learning', 'Deep Learning',
  'TensorFlow', 'PyTorch', 'Statistics', 'NLP',
  'Computer Vision', 'Scikit-learn', 'SQL', 'Excel',
  'Tableau', 'Power BI', 'Google Analytics',
  'Statistical Analysis', 'Data Visualization', 'Looker',
  'Apache Spark', 'Hadoop', 'AWS', 'Azure', 'GCP',
  'Airflow', 'Kafka', 'Docker', 'Kubernetes', 'ETL'
];

// ==================== FALLBACK MANUAL PARSER ====================
const parseResumeManually = (resumeText) => {
  console.log('🔧 Using fallback manual parser...');
  const text = resumeText.toLowerCase();
  const lines = resumeText.split('\n').map(l => l.trim()).filter(l => l);

  // Extract email
  const emailMatch = resumeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // Extract phone
  const phoneMatch = resumeText.match(/[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // Extract name
  let firstName = '';
  let lastName = '';
  for (const line of lines) {
    if (line.match(/^(resume|cv|curriculum|profile|summary|objective|email|phone|address)/i)) continue;
    if (line.includes('@') || line.match(/^\d/)) continue;
    const nameParts = line.split(/\s+/).filter(p => p.length > 1 && !p.includes('@'));
    if (nameParts.length >= 2 && nameParts[0].length < 20) {
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(' ');
      break;
    } else if (nameParts.length === 1 && nameParts[0].length < 20) {
      firstName = nameParts[0];
      break;
    }
  }

  // Extract LinkedIn
  const linkedInMatch = resumeText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  const linkedIn = linkedInMatch ? linkedInMatch[0] : '';

  // Extract GitHub
  const githubMatch = resumeText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+/i);
  const portfolio = githubMatch ? githubMatch[0] : '';

  // Detect skills
  const foundSkills = allSkillsFlat.filter(skill =>
    text.includes(skill.toLowerCase())
  );

  // Detect position
  let position = 'data-analytics';
  if (text.includes('machine learning') || text.includes('deep learning') || text.includes('data scien')) {
    position = 'data-science';
  } else if (text.includes('data engineer') || text.includes('etl') || text.includes('pipeline') || text.includes('spark')) {
    position = 'data-engineer';
  }

  // Detect education
  let education = 'bachelors';
  if (text.includes('ph.d') || text.includes('phd') || text.includes('doctorate')) {
    education = 'phd';
  } else if (text.includes('master') || text.includes('m.s.') || text.includes('m.tech')) {
    education = 'masters';
  } else if (text.includes('bootcamp') || text.includes('certification')) {
    education = 'bootcamp';
  } else if (text.includes('high school') || text.includes('diploma')) {
    education = 'high-school';
  }

  // Detect experience
  let experienceLevel = 'entry';
  const yearMatch = text.match(/(\d+)\+?\s*(?:years?|yrs?)\s*(?:of)?\s*(?:experience|exp)/i);
  if (yearMatch) {
    const years = parseInt(yearMatch[1]);
    if (years >= 10) experienceLevel = 'lead';
    else if (years >= 5) experienceLevel = 'senior';
    else if (years >= 2) experienceLevel = 'mid';
  }

  return {
    firstName,
    lastName,
    email,
    phone,
    position,
    experienceLevel,
    skills: foundSkills,
    education,
    linkedIn,
    portfolio,
    yearsOfExperience: 0,
    summary: `Candidate with skills in ${foundSkills.slice(0, 3).join(', ')}. Applied for ${position.replace('-', ' ')} role.`
  };
};

// ==================== OPENAI RESPONSES API PARSER ====================
const parseResumeWithOpenAI = async (resumeText) => {
  const truncatedText = resumeText.substring(0, 5000);

  const prompt = `You are a precise resume parser. Parse this resume and return ONLY a raw JSON object.
No markdown. No code blocks. No backticks. No explanation. ONLY the JSON.

JSON format:
{"firstName":"","lastName":"","email":"","phone":"","position":"data-science or data-analytics or data-engineer","experienceLevel":"entry or mid or senior or lead","skills":[],"education":"high-school or bachelors or masters or phd or bootcamp","linkedIn":"","portfolio":"","yearsOfExperience":0,"summary":""}

Skills only from this list: Python, R, Machine Learning, Deep Learning, TensorFlow, PyTorch, Statistics, NLP, Computer Vision, Scikit-learn, SQL, Excel, Tableau, Power BI, Google Analytics, Statistical Analysis, Data Visualization, Looker, Apache Spark, Hadoop, AWS, Azure, GCP, Airflow, Kafka, Docker, Kubernetes, ETL

experienceLevel: entry=0-2yrs, mid=2-5yrs, senior=5-10yrs, lead=10+yrs

Resume:
${truncatedText}`;

  console.log('🤖 Sending to OpenAI (Responses API)...');

  // ===== NEW: Responses API =====
  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    input: prompt
  });

  // ===== NEW: output_text instead of choices[0].message.content =====
  let content = response.output_text.trim();

  console.log('🤖 Raw response length:', content.length);
  console.log('🤖 Raw response preview:', content.substring(0, 300));

  if (!content || content.trim().length === 0) {
    throw new Error('Empty response from OpenAI');
  }

  // Clean markdown formatting
  content = content.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

  // Extract JSON
  const jsonStart = content.indexOf('{');
  const jsonEnd = content.lastIndexOf('}');

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('No JSON object found in response');
  }

  const jsonString = content.substring(jsonStart, jsonEnd + 1);
  const parsed = JSON.parse(jsonString);
  console.log('✅ JSON parsed successfully');
  return parsed;
};

// ==================== MAIN CONTROLLER ====================
const parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No resume file uploaded'
      });
    }

    const filePath = req.file.path;
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    console.log(`\n${'='.repeat(50)}`);
    console.log(`📄 Processing: ${req.file.originalname}`);
    console.log(`📄 Extension: ${fileExt}`);
    console.log(`📄 Size: ${(req.file.size / 1024).toFixed(1)} KB`);
    console.log(`${'='.repeat(50)}`);

    if (!fs.existsSync(filePath)) {
      return res.status(400).json({
        success: false,
        message: 'File upload failed. Please try again.'
      });
    }

    // Step 1: Extract text
    let resumeText = '';
    try {
      if (fileExt === '.pdf') {
        resumeText = await extractTextFromPDF(filePath);
      } else if (fileExt === '.docx') {
        resumeText = await extractTextFromDOCX(filePath);
      } else {
        return res.status(400).json({
          success: false,
          message: 'Unsupported format. Upload PDF or DOCX.'
        });
      }
    } catch (extractError) {
      return res.status(400).json({
        success: false,
        message: `Failed to read file: ${extractError.message}`
      });
    }

    if (!resumeText || resumeText.trim().length < 30) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract enough text from resume.'
      });
    }

    console.log(`✅ Extracted ${resumeText.length} characters`);
    console.log(`📝 Preview: "${resumeText.substring(0, 200)}..."`);

    // Step 2: Parse — OpenAI first, fallback to manual
    let parsedData;
    let parseMethod = 'openai';

    try {
      if (!client) throw new Error('OpenAI client not initialized');
      if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set in .env');
      parsedData = await parseResumeWithOpenAI(resumeText);
      console.log('✅ OpenAI parsing complete');
    } catch (aiError) {
      console.error('⚠️ OpenAI failed:', aiError.message);
      console.log('🔧 Using fallback parser...');
      parsedData = parseResumeManually(resumeText);
      parseMethod = 'manual';
      console.log('✅ Manual parsing complete');
    }

    // Step 3: Validate skills
    if (parsedData.position && allSkillsByPosition[parsedData.position]) {
      const validSkills = allSkillsByPosition[parsedData.position];
      parsedData.skills = (parsedData.skills || []).filter(skill =>
        validSkills.some(vs => vs.toLowerCase() === skill.toLowerCase())
      );
      parsedData.skills = parsedData.skills.map(skill => {
        const match = validSkills.find(vs => vs.toLowerCase() === skill.toLowerCase());
        return match || skill;
      });
    }

    // Step 4: Response
    console.log(`✅ Done (${parseMethod}):`, JSON.stringify(parsedData, null, 2));

    res.json({
      success: true,
      message: `Resume parsed (${parseMethod === 'openai' ? 'OpenAI GPT' : 'Keyword Matching'})`,
      data: parsedData,
      parseMethod,
      resumeFile: {
        originalName: req.file.originalname,
        savedName: req.file.filename,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`
      }
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing resume'
    });
  }
};

module.exports = { parseResume };