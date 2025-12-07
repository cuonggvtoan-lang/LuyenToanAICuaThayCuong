import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { chatWithTutor } from '../services/geminiService';
import { Button } from './Button';

export const ChatTutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'Chào bạn! Mình là trợ lý AI của Thầy Cường. Bạn có câu hỏi toán học nào cần giải đáp không?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await chatWithTutor(history, userMsg.text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-xl shadow-cyan-100 border border-cyan-100 overflow-hidden">
      <div className="bg-cyan-600 p-4 text-white flex items-center justify-between">
        <h2 className="font-bold flex items-center">
          <span className="text-2xl mr-2">💬</span> Gia sư AI
        </h2>
        <span className="text-xs bg-cyan-700 px-2 py-1 rounded-full text-cyan-100">Online</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-3 rounded-2xl text-sm md:text-base leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-cyan-500 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hỏi về toán học..."
          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
        />
        <Button type="submit" disabled={!input || loading} className="w-12 h-10 md:w-auto px-4">
          ➤
        </Button>
      </form>
    </div>
  );
};