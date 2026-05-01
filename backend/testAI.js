// backend/testAI.js — Test Gemini 2.5 Flash connection
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const test = async () => {
  console.log('🔑 GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Found' : 'MISSING!');
  console.log('🔑 Key starts with:', process.env.GEMINI_API_KEY?.substring(0, 8) + '...\n');

  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ Please add GEMINI_API_KEY to your .env file');
    console.log('👉 Get your key at: https://aistudio.google.com/app/apikey');
    return;
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const modelsToTry = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
  ];

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📡 Testing Gemini API...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  for (const modelName of modelsToTry) {
    try {
      console.log(`🧪 Trying model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Reply with only: {"status":"ok"}');
      const text = result.response.text().trim();
      console.log(`✅ SUCCESS! Model "${modelName}" works!`);
      console.log(`   Response: ${text}\n`);
      console.log('='.repeat(50));
      console.log(`🎉 USE: genAI.getGenerativeModel({ model: "${modelName}" })`);
      console.log('='.repeat(50));
      return;
    } catch (error) {
      const msg = error.message?.substring(0, 100) || 'Unknown error';
      console.log(`❌ Failed: ${msg}\n`);
    }
  }

  console.log('\n❌ No Gemini model worked.');
  console.log('👉 Get your key at: https://aistudio.google.com/app/apikey');
};

test();
