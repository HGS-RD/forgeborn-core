import React from 'react';
import { Sparkles } from 'lucide-react';

export default function FloatingAIAssistant() {
  return (
    <button
      className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform"
      title="Ask Roger AI"
      onClick={() => alert('AI prompt helper launching...')}
    >
      <Sparkles className="w-6 h-6 inline-block mr-2" />
      <span className="hidden md:inline">Ask Roger AI</span>
    </button>
  );
}
