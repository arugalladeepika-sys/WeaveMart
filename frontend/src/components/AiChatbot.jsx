import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User, CornerDownLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function AiChatbot() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your WeaveMart AI Assistant. Ask me about order tracking, UPI payments, fabric care, or weaver product uploads!'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await axios.post('/api/chat', {
        message: userMsg,
        language: i18n.language || 'en'
      });

      setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Sorry, I had trouble connecting to the WeaveMart assistant server. Please try again!' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white p-4 rounded-full shadow-2xl transition hover:scale-105 flex items-center gap-2 group border-2 border-amber-300/40"
        >
          <Bot className="w-6 h-6 animate-bounce" />
          <span className="text-xs font-bold font-serif hidden sm:inline pr-1">WeaveBot AI</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-amber-200 flex flex-col h-[480px] animate-fadeIn">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-800 to-amber-950 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-700/80 rounded-xl">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm">WeaveBot AI Support</h4>
                <p className="text-[10px] text-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Multi-Lingual Assistant
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-amber-800 transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-amber-50/30 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-amber-800 text-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-800 text-white rounded-tr-none shadow-sm'
                      : 'bg-white text-slate-800 rounded-tl-none border border-amber-200 shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start items-center text-slate-400 text-xs pl-8 italic">
                <span>WeaveBot is typing...</span>
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-amber-50/80 border-t border-amber-100 flex gap-1.5 overflow-x-auto text-[10px]">
            {['Track Order', 'How to sell as Weaver?', 'UPI Payments'].map((chip) => (
              <button
                key={chip}
                onClick={() => { setInput(chip); }}
                className="bg-white hover:bg-amber-100 text-amber-900 border border-amber-300/60 px-2 py-1 rounded-md shrink-0 transition"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Type your query..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-800 hover:bg-amber-900 text-white p-2 rounded-xl transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
