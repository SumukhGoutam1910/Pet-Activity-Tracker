import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

// Helper function to log to file
const logToFile = (message) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync('chatbot-debug.log', `${timestamp}: ${message}\n`);
};

export const handleChat = async (req, res) => {
  try {
    logToFile('=== CHATBOT REQUEST START ===');
    logToFile(`Received chat request: ${JSON.stringify(req.body)}`);
    logToFile(`API Key exists: ${!!process.env.GEMINI_API_KEY}`);
    logToFile(`API Key length: ${process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0}`);
    logToFile(`API Key first 15 chars: ${process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 15) + '...' : 'Not found'}`);
    logToFile(`API Key last 10 chars: ${process.env.GEMINI_API_KEY ? '...' + process.env.GEMINI_API_KEY.slice(-10) : 'Not found'}`);
    
    console.log('=== CHATBOT REQUEST START ===');
    console.log('Received chat request:', req.body); // Debug log
    console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
    console.log('API Key format:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + '...' : 'Not found');
    const { message } = req.body;
    
    if (!message) {
      console.log('No message provided'); // Debug log
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Processing message with Gemini:', message); // Debug log

    // Trim the API key to remove any whitespace/newlines and create GoogleGenerativeAI instance
    const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : '';
    logToFile(`Trimmed API Key: ${apiKey.substring(0, 15)}...${apiKey.slice(-10)}`);
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get the generative model (using gemini-1.5-flash for faster, free responses)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Create a pet care focused prompt
    const prompt = `You are a friendly and knowledgeable pet care assistant. You help pet owners with questions about their pets' health, behavior, feeding, exercise, and general care. Keep your responses helpful, concise, and caring.

User question: ${message}

Please provide a helpful response:`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini response:', text); // Debug log
    console.log('=== CHATBOT REQUEST END ===');
    logToFile(`Gemini response: ${text}`);
    logToFile('=== CHATBOT REQUEST END ===');
    res.json({ reply: text });
  } catch (error) {
    console.log('=== CHATBOT ERROR ===');
    console.error('Gemini API error:', error);
    console.error('Error message:', error.message);
    console.error('Error status:', error.status);
    console.log('=== CHATBOT ERROR END ===');
    
    logToFile('=== CHATBOT ERROR ===');
    logToFile(`Gemini API error: ${error.message}`);
    logToFile(`Error status: ${error.status}`);
    logToFile('=== CHATBOT ERROR END ===');
    res.status(500).json({ 
      error: 'Sorry, I encountered an error. Please try again later.',
      reply: 'I\'m having trouble connecting right now. Please try asking your question again in a moment.' 
    });
  }
};
