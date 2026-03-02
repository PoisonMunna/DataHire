// backend/testAI.js
require('dotenv').config();
const OpenAI = require('openai');

// Models to try (newest first)
const modelsToTry = [
  'gpt-4o-mini',
  'gpt-4o',
  'gpt-4-turbo',
  'gpt-3.5-turbo',
];

const test = async () => {
  console.log('🔑 OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Found' : 'MISSING!');
  console.log('🔑 Key starts with:', process.env.OPENAI_API_KEY?.substring(0, 8) + '...\n');

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  // ===== Test 1: Try Responses API (New) =====
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📡 Testing NEW Responses API...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  for (const modelName of modelsToTry) {
    try {
      console.log(`🧪 Responses API → ${modelName}...`);
      const response = await client.responses.create({
        model: modelName,
        input: 'Reply with only: {"status":"ok"}'
      });
      console.log(`✅ SUCCESS! Responses API + "${modelName}" works!`);
      console.log(`   Response: ${response.output_text}\n`);
      console.log('='.repeat(50));
      console.log(`🎉 USE: client.responses.create({ model: "${modelName}" })`);
      console.log('='.repeat(50));
      return;
    } catch (error) {
      const msg = error.message?.substring(0, 80) || 'Unknown error';
      console.log(`❌ Failed: ${msg}\n`);
    }
  }

  // ===== Test 2: Try Chat Completions API (Old) =====
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📡 Testing OLD Chat Completions API...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  for (const modelName of modelsToTry) {
    try {
      console.log(`🧪 Chat Completions → ${modelName}...`);
      const response = await client.chat.completions.create({
        model: modelName,
        messages: [
          { role: 'user', content: 'Reply with only: {"status":"ok"}' }
        ],
        temperature: 0.1,
        max_tokens: 50
      });
      console.log(`✅ SUCCESS! Chat Completions + "${modelName}" works!`);
      console.log(`   Response: ${response.choices[0].message.content}\n`);
      console.log('='.repeat(50));
      console.log(`🎉 USE: client.chat.completions.create({ model: "${modelName}" })`);
      console.log('='.repeat(50));
      return;
    } catch (error) {
      const msg = error.message?.substring(0, 80) || 'Unknown error';
      console.log(`❌ Failed: ${msg}\n`);
    }
  }

  console.log('\n❌ No API + model combination worked.');
  console.log('👉 Check your key at: https://platform.openai.com/api-keys');
  console.log('👉 Check billing at: https://platform.openai.com/account/billing');
};

test();