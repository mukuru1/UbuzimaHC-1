import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User, AlertTriangle, Heart, Thermometer } from 'lucide-react';
import { commonConditions } from '../data/mockData';
import { SymptomCheckerResponse } from '../types';

const SymptomChecker: React.FC = () => {
  const [messages, setMessages] = useState<Array<{
    id: string;
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
  }>>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI health assistant. I can help you understand your symptoms and provide guidance. Please describe how you\'re feeling today.',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Sore throat', 'Fatigue',
    'Nausea', 'Abdominal pain', 'Diarrhea', 'Runny nose', 'Chest pain'
  ];

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Process the message and generate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(currentMessage);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot' as const,
        content: botResponse.content,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setCurrentMessage('');
  };

  const generateBotResponse = (userInput: string): { content: string } => {
    const input = userInput.toLowerCase();
    
    // Check for specific symptoms
    if (input.includes('fever') || input.includes('temperature')) {
      if (input.includes('headache') || input.includes('chills')) {
        return {
          content: `Based on your symptoms (fever and headache), this could indicate several conditions including malaria, which is common in Rwanda. I recommend:

• Visit a healthcare facility immediately for malaria testing
• Keep yourself hydrated
• Monitor your temperature regularly

**This is serious and requires immediate medical attention.**

Would you like me to help you find the nearest clinic?`
        };
      }
      return {
        content: `Fever can be a sign of various conditions. How long have you had the fever? Any other symptoms like headache, chills, or body pain?`
      };
    }

    if (input.includes('cough') && input.includes('cold')) {
      return {
        content: `It sounds like you might have a common cold. Here's what I recommend:

• Get plenty of rest
• Drink lots of fluids (water, tea, soup)
• Consider honey for throat relief
• Monitor symptoms for worsening

**See a doctor if:**
- Fever develops or persists
- Difficulty breathing
- Symptoms worsen after 7-10 days

Would you like me to help you find a doctor nearby?`
      };
    }

    if (input.includes('pain') && (input.includes('stomach') || input.includes('abdominal'))) {
      return {
        content: `Abdominal pain can have various causes. To help better, can you tell me:

• Where exactly is the pain? (Upper, lower, left, right side)
• How long have you had it?
• Any nausea, vomiting, or fever?
• Any changes in bowel movements?

Based on your answers, I can provide more specific guidance.`
      };
    }

    // Default response
    return {
      content: `I understand you're experiencing some symptoms. To provide the best guidance, could you please tell me:

• What specific symptoms are you feeling?
• How long have you had these symptoms?
• How severe are they on a scale of 1-10?

You can also click on the common symptoms below if they match what you're experiencing.`
    };
  };

  const handleSymptomClick = (symptom: string) => {
    setCurrentMessage(symptom);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Symptom Checker</h1>
          <p className="text-gray-600">Get instant health guidance based on your symptoms</p>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
            <div className="text-sm">
              <p className="text-yellow-800 font-medium mb-1">Important Disclaimer</p>
              <p className="text-yellow-700">
                This tool provides general health information only and is not a substitute for professional medical advice. 
                Always consult with a healthcare professional for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-sky-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                
                <div className={`max-w-sm lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-sky-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-sky-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Symptoms */}
          <div className="border-t border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-3">Common symptoms (click to select):</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => handleSymptomClick(symptom)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Describe your symptoms..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim()}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center mb-3">
            <Heart className="h-6 w-6 text-red-500 mr-3" />
            <h3 className="text-lg font-semibold text-red-900">Emergency Situations</h3>
          </div>
          <p className="text-red-800 mb-4">
            If you're experiencing any of these symptoms, seek immediate medical attention:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-red-700">
            <div>• Difficulty breathing</div>
            <div>• Chest pain</div>
            <div>• Severe abdominal pain</div>
            <div>• High fever with confusion</div>
            <div>• Severe bleeding</div>
            <div>• Loss of consciousness</div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a
              href="tel:912"
              className="flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold"
            >
              Call Emergency: 912
            </a>
            <button className="flex items-center justify-center px-6 py-3 border border-red-300 text-red-700 rounded-xl hover:bg-red-50 transition-colors">
              Find Nearest Hospital
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;