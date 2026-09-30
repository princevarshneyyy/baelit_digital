import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import GlassCard from './GlassCard';

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Greetings. I am the BAELIT Strategic AI Assistant. How may I assist your advisory inquiry today?',
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    // Simulated intelligent response logic
    setTimeout(() => {
      let reply = 'Thank you for your message. For tailored private consultations, you can schedule a session directly through our Services page or contact our principal partners.';

      const lower = userMsg.toLowerCase();
      if (lower.includes('kundali') || lower.includes('astrology')) {
        reply = 'Our Kundali practice offers a ₹499 exhaustive 160+ page PDF report, as well as a ₹1,499 package including a 45-minute live 1-on-1 session with our senior Vedic scholar.';
      } else if (lower.includes('legal') || lower.includes('contract')) {
        reply = 'BAELIT Legal Advisory specializes in enterprise contract structuring, corporate governance, property rights, and regulatory compliance.';
      } else if (lower.includes('finance') || lower.includes('tax')) {
        reply = 'Strategic Finance focuses on capital allocation, high-net-worth portfolio preservation, tax efficiency, and estate planning.';
      } else if (lower.includes('career') || lower.includes('resume')) {
        reply = 'Our Executive Counsel practice offers C-suite interview coaching, personal branding, salary negotiation, and strategic career pathing.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-charcoal text-white shadow-xl hover:bg-stone-accent transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-charcoal"
        aria-label="Open BAELIT AI Assistant"
      >
        <Bot className="w-5 h-5 text-white" />
        <span className="hidden sm:inline text-xs uppercase tracking-wider font-semibold">
          AI Advisory
        </span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 left-6 z-50 w-full max-w-sm glass-modal rounded-2xl p-5 shadow-2xl border border-white/80 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-charcoal text-white rounded-lg">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                    BAELIT AI Assistant
                  </h3>
                  <span className="text-[10px] text-neutral-mid block">Automated Guidance</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-neutral-mid hover:text-charcoal hover:bg-neutral-light/50"
                aria-label="Close AI Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="h-64 overflow-y-auto py-3 space-y-3 pr-1 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl ${
                      m.sender === 'user'
                        ? 'bg-charcoal text-white rounded-br-none'
                        : 'bg-white/80 text-charcoal border border-neutral-light/60 rounded-bl-none shadow-xs'
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="pt-2 border-t border-charcoal/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about practices, bookings..."
                className="flex-1 px-3 py-2 bg-white/70 border border-neutral-light rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-charcoal"
              />
              <button
                type="submit"
                className="p-2 bg-charcoal text-white rounded-xl hover:bg-stone-accent transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
