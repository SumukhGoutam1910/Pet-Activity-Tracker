    import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing Gemini API key...');
console.log('API Key format:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + '...' : 'Not found');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    console.log('Sending test prompt to Gemini...');
    const result = await model.generateContent('Say hello in one word');
    const response = await result.response;
    const text = response.text();
    
    console.log('SUCCESS! Gemini responded:', text);
  } catch (error) {
    console.error('ERROR:', error.message);
    console.error('Error code:', error.status || 'N/A');
    
    if (error.message.includes('API key not valid')) {
      console.log('\n🚨 DIAGNOSIS: The API key is not valid for Gemini API');
      console.log('Your key starts with:', process.env.GEMINI_API_KEY.substring(0, 5));
      console.log('Gemini keys should start with "AI..." not "AIza..."');
      console.log('Please generate a new key from https://aistudio.google.com/');
    }
  }
}

testGemini();
