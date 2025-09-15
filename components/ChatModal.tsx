
import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { MessageSender } from '../types';
import { getMiaResponse } from '../services/geminiService';
import Button from './common/Button';

interface ChatModalProps {
  onClose: () => void;
}

const supportedLanguages = [
  { code: 'English', name: 'English', flag: '🇬🇧' },
  { code: 'Polish', name: 'Polski', flag: '🇵🇱' },
  { code: 'German', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'Italian', name: 'Italiano', flag: '🇮🇹' },
  { code: 'French', name: 'Français', flag: '🇫🇷' },
  { code: 'Russian', name: 'Русский', flag: '🇷🇺' },
];

const welcomeMessages: { [key: string]: string } = {
  English: "Hello, handsome. I've been waiting for you... What's on your mind? 😉",
  Polish: "Cześć, przystojniaku. Czekałam na ciebie... O czym myślisz? 😉",
  German: "Hallo, mein Hübscher. Ich habe auf dich gewartet... Was geht dir durch den Kopf? 😉",
  Italian: "Ciao, bello. Ti stavo aspettando... A cosa pensi? 😉",
  French: "Salut, mon beau. Je t'attendais... À quoi penses-tu ? 😉",
  Russian: "Привет, красавчик. Я ждала тебя... О чём ты думаешь? 😉",
};


const TypingIndicator = () => (
  <div className="flex items-center space-x-2">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
);


const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [messages, setMessages] = useState<Message[]>([
    { sender: MessageSender.AI, text: welcomeMessages[currentLanguage] }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setCurrentLanguage(newLang);
    setMessages([{ sender: MessageSender.AI, text: welcomeMessages[newLang] }]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = { sender: MessageSender.USER, text: userInput.trim() };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    const chatHistory = [...messages, userMessage];
    const aiResponseText = await getMiaResponse(userInput.trim(), chatHistory, currentLanguage);
    
    const aiMessage: Message = { sender: MessageSender.AI, text: aiResponseText };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center animate-fade-in p-4">
      <div className="bg-brand-gray rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col relative overflow-hidden border border-brand-primary/20">
        {/* Header */}
        <div className="p-4 flex items-center justify-between bg-brand-dark/50 border-b border-brand-primary/20 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <img src="https://picsum.photos/seed/mia/40/40" alt="Mia" className="w-10 h-10 rounded-full border-2 border-brand-primary" />
            <div>
              <h2 className="font-serif text-xl font-bold text-brand-primary">Mia Taylor</h2>
              <p className="text-sm text-brand-primary flex items-center">
                <span className="w-2 h-2 bg-brand-primary rounded-full mr-2"></span>
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
                <select
                    value={currentLanguage}
                    onChange={handleLanguageChange}
                    className="bg-brand-gray border border-brand-primary/50 rounded-lg py-2 pl-3 pr-8 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                >
                    {supportedLanguages.map(lang => (
                        <option key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-3 ${msg.sender === MessageSender.USER ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === MessageSender.AI && (
                <img src="https://picsum.photos/seed/mia/32/32" alt="Mia" className="w-8 h-8 rounded-full" />
              )}
              <div className={`max-w-md p-4 rounded-2xl ${msg.sender === MessageSender.USER ? 'bg-brand-primary text-brand-dark rounded-br-none' : 'bg-brand-dark text-brand-light rounded-bl-none'}`}>
                <p className="text-base">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-3 justify-start">
              <img src="https://picsum.photos/seed/mia/32/32" alt="Mia" className="w-8 h-8 rounded-full" />
              <div className="max-w-md p-4 rounded-2xl bg-brand-dark">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-brand-dark/50 border-t border-brand-primary/20 backdrop-blur-sm">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your desires..."
              className="flex-1 bg-brand-gray border border-brand-primary/30 rounded-full py-3 px-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              disabled={isLoading}
            />
            <Button type="submit" variant="primary" className="rounded-full !p-4" disabled={isLoading}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;