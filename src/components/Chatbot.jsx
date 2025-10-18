import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Trash2 } from 'lucide-react';
import { getApiUrl } from '@/config/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const initialMessage = {
    id: 1,
    text: "Hello! I'm the PARA! assistant. How can I help you today?",
    sender: 'bot'
  };

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('para-chatbot-messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
        setShowOptions(parsedMessages.length === 0);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
        // If parsing fails, start fresh
        setMessages([initialMessage]);
        setShowOptions(false);
      }
    } else {
      // No saved messages, show initial message when opened
      setShowOptions(true);
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('para-chatbot-messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([initialMessage]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearChat = () => {
    setMessages([]);
    setShowOptions(true);
    localStorage.removeItem('para-chatbot-messages');
  };

  const predefinedResponses = {
    "what is para?": "PARA! is a mobile app that helps you monitor public transportation like buses and jeepneys in real-time, making your commute easier and more predictable.",
    "how to download?": "You can download the app from the Google Play Store or Apple App Store. Just click the 'Download' buttons on our page! The app is coming soon, so subscribe to our newsletter to be notified.",
    "what are the features?": "PARA! offers live vehicle tracking, arrival time estimates, smart notifications, a fare calculator, and helps you find the nearest stops.",
    "contact support": "You can reach our support team by emailing hello@paraapp.ph. We're happy to help!"
  };
  
  const handleOptionClick = (optionText) => {
    const userMessage = { id: Date.now(), text: optionText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setShowOptions(false);
    
    setTimeout(() => {
      handleBotResponse(optionText.toLowerCase());
    }, 1000);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowOptions(false);

    const inputForBot = userMessage.text; // preserve original text for AI
    await respondWithAI(inputForBot);
  };

  const handleBotResponse = (userInput) => {
    let botReply = "I'm sorry, I'm not sure how to answer that. Please try one of the options, or rephrase your question.";
    
    if (predefinedResponses[userInput]) {
      botReply = predefinedResponses[userInput];
    } else if (userInput.includes("download")) {
      botReply = predefinedResponses["how to download?"];
    } else if (userInput.includes("feature")) {
        botReply = predefinedResponses["what are the features?"];
    } else if (userInput.includes("contact") || userInput.includes("support")) {
        botReply = predefinedResponses["contact support"];
    }

    const botMessage = { id: Date.now() + 1, text: botReply, sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);

    if(userInput.includes("thank")) {
        setTimeout(() => {
            const finalMessage = { id: Date.now() + 2, text: "You're welcome! Is there anything else I can help with?", sender: 'bot' };
            setMessages(prev => [...prev, finalMessage]);
            setShowOptions(true);
        }, 1000);
    }
  };

  const respondWithAI = async (userText) => {
    setIsTyping(true);

    try {
      // Build a simple history payload
      const history = messages.map(m => ({ sender: m.sender, text: m.text }));
      const apiUrl = getApiUrl();
      const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, userText }),
      });
      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Server error ${resp.status}: ${errText}`);
      }
      const data = await resp.json();
      const botMessage = { id: Date.now() + 1, text: data?.reply || 'Sorry, I could not generate a response.', sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Gemini error:', err);
      const hint = err?.message ? ` Details: ${err.message}` : '';
      const reason = 'Error contacting AI service. Please try again later.';
      const botMessage = { id: Date.now() + 1, text: `${reason}${hint}`, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isOpen ? 'x' : 'msg'}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm h-[70vh] max-h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 bg-secondary border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-secondary"></span>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-card-foreground">PARA! Assistant</p>
                    <p className="text-sm text-muted-foreground">Online</p>
                  </div>
                </div>
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="p-2 hover:bg-background/50 rounded-lg transition-colors"
                    title="Clear chat history"
                  >
                    <Trash2 size={16} className="text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-end gap-2 my-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot size={20} className="text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-secondary text-secondary-foreground rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <div className="flex items-end gap-2 my-3 justify-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={20} className="text-primary-foreground" />
                  </div>
                  <div className="max-w-[80%] p-3 rounded-2xl bg-secondary text-secondary-foreground rounded-bl-none">
                    <span className="inline-flex gap-1">
                      <span className="w-2 h-2 bg-secondary-foreground/60 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                      <span className="w-2 h-2 bg-secondary-foreground/60 rounded-full animate-bounce [animation-delay:-0.1s]"></span>
                      <span className="w-2 h-2 bg-secondary-foreground/60 rounded-full animate-bounce"></span>
                    </span>
                  </div>
                </div>
              )}
               {showOptions && messages.length > 0 && (
                <div className="flex flex-wrap gap-2 my-4">
                  {Object.keys(predefinedResponses).map(option => (
                     <button key={option} onClick={() => handleOptionClick(option.charAt(0).toUpperCase() + option.slice(1))} className="text-xs text-primary border border-primary/50 rounded-full px-3 py-1 hover:bg-primary/10 transition-colors">
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background">
              <div className="flex items-center bg-secondary rounded-xl p-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  ref={inputRef}
                  aria-label="Chat message input"
                  className="flex-1 bg-transparent px-2 text-sm focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  aria-label="Send message"
                  disabled={input.trim() === ''}
                  className={`bg-primary text-primary-foreground p-2 rounded-lg transition-colors ${
                    input.trim() === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;