// Test script that mimics exactly what the controller does
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

// Note: NOT calling dotenv.config() here, just like in the controller

console.log('Testing Gemini API without dotenv.config()...');
console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
console.log('API Key format:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + '...' : 'Not found');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testExactController() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `You are a friendly and knowledgeable pet care assistant. You help pet owners with questions about their pets' health, behavior, feeding, exercise, and general care. Keep your responses helpful, concise, and caring.

User question: Hello

Please provide a helpful response:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('SUCCESS! Gemini responded:', text);
  } catch (error) {
    console.error('ERROR:', error.message);
    console.error('Error status:', error.status);
  }
}

testExactController();
