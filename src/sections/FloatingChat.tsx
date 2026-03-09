import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Loader2,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// AI Response patterns
const aiResponses: Record<string, string> = {
  'hello': 'Hello! Welcome to Crafty Jay Portfolio. How can I assist you today?',
  'hi': 'Hi there! 👋 I\'m Crafty Jay\'s AI assistant. What can I help you with?',
  'hey': 'Hey! Nice to meet you. How can I help you today?',
  'services': 'Crafty Jay offers: Web Development, Graphic Design, Logo Design, UI/UX Design, Mobile App Development, and Digital Marketing. Which service are you interested in?',
  'web': 'We create stunning, responsive websites using modern technologies like React, Next.js, and more. Would you like to discuss a project?',
  'design': 'Our design services include brand identity, logo design, UI/UX design, and graphic design. What type of design work do you need?',
  'contact': 'You can reach Crafty Jay via:\n📱 WhatsApp: +234 808 409 0236\n📧 Email: crafty23jay@gmail.com\nOr fill out the contact form on the website!',
  'price': 'Pricing depends on the project scope and requirements. Please contact us directly for a custom quote!',
  'cost': 'Pricing depends on the project scope and requirements. Please contact us directly for a custom quote!',
  'portfolio': 'You can view our portfolio in the Projects section. We\'ve worked on e-commerce sites, portfolios, brand identities, and mobile apps!',
  'about': 'Crafty Jay is a passionate Web Developer & Graphic Designer with 5+ years of experience creating beautiful digital experiences.',
  'help': 'I can help you with:\n• Information about our services\n• Pricing inquiries\n• Project discussions\n• Contact information\nWhat would you like to know?',
  'default': 'Thank you for your message! I\'m an AI assistant. For more detailed information, please contact Crafty Jay directly at crafty23jay@gmail.com or WhatsApp: +234 808 409 0236'
};

const findAIResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  for (const [keyword, response] of Object.entries(aiResponses)) {
    if (lowerInput.includes(keyword)) {
      return response;
    }
  }
  
  return aiResponses.default;
};

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 I\'m Crafty Jay\'s AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findAIResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickReplies = [
    'What services do you offer?',
    'How can I contact you?',
    'Tell me about your portfolio'
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2, ease: [0.68, -0.55, 0.265, 1.55] }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#6727aa] to-[#9d71e8] text-white shadow-lg shadow-purple-500/30 flex items-center justify-center hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </motion.div>
        
        {/* Pulse Effect */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[#6727aa]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6727aa] to-[#9d71e8] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Crafty Jay AI</h3>
                <p className="text-white/70 text-sm flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Online
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-white/80 text-xs">AI Powered</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-[#6727aa]' 
                        : 'bg-gradient-to-r from-[#6727aa] to-[#9d71e8]'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm whitespace-pre-line ${
                      message.sender === 'user'
                        ? 'bg-[#6727aa] text-white rounded-br-none'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6727aa] to-[#9d71e8] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="p-3 rounded-2xl bg-white dark:bg-gray-700 rounded-bl-none shadow-sm">
                      <Loader2 className="w-4 h-4 text-[#6727aa] animate-spin" />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickReplies.map((reply, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setInputValue(reply);
                      inputRef.current?.focus();
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-shrink-0 px-3 py-1.5 text-xs bg-[#6727aa]/10 text-[#6727aa] dark:text-[#9d71e8] rounded-full hover:bg-[#6727aa]/20 transition-colors whitespace-nowrap"
                  >
                    {reply}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#6727aa] dark:focus:ring-[#9d71e8] text-gray-800 dark:text-white text-sm"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6727aa] to-[#9d71e8] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
