import React, { useState, useEffect, useRef } from 'react';
import {
  Wrench,
  Bot,
  Send,
  X,
  Phone,
  Calendar,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Flame,
  Droplets,
  HelpCircle,
  Clock,
  ArrowRight,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  MessageSquare
} from 'lucide-react';
import { JBLogo } from './JBLogo';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedService?: {
    id: string;
    title: string;
    price: number;
    category?: string;
  };
  isEmergency?: boolean;
}

interface VirtualPlumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (serviceId?: string, customQuote?: { title: string; price: number }) => void;
  highLegibilityMode?: boolean;
  initialPrompt?: string;
}

const QUICK_PROMPTS = [
  { label: '💧 Water Heater popping & no hot water', prompt: 'My water heater is making a rumbling popping sound and the water is barely warm. What is wrong?' },
  { label: '🛑 Sewer backing up into shower', prompt: 'When we flush the toilet, water and bubbles gurgle up in the master bathroom shower. Is my main sewer line clogged?' },
  { label: '🔍 Warm spot on floor (Slab leak?)', prompt: 'I felt a warm spot on my tile floor near the hallway and my water bill jumped $80. Could this be a slab leak?' },
  { label: '⚡ Banging pipes / High pressure (PRV)', prompt: 'Every time a faucet closes, the pipes bang loudly in the walls and the toilet fill valve hisses continuously.' },
  { label: '🚿 White crust & hard water damage', prompt: 'Our shower glass has heavy white calcium scale and our skin feels dry. What water softener size do I need in Phoenix?' },
  { label: '🗑️ Garbage disposal humming & stuck', prompt: 'My garbage disposal is making a low humming hum but the blades do not spin at all when I flip the switch.' },
  { label: '🚽 Toilet won\'t stop running', prompt: 'My toilet keeps running every 10 minutes even when no one used it. How do I fix the leak?' },
];

export const VirtualPlumberModal: React.FC<VirtualPlumberModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  highLegibilityMode = false,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `### 👨‍🔧 Hello! I'm your Virtual Plumber\n\nI'm Judai Brothers' AI plumbing specialist (**AZ ROC #354554**), powered by master plumbing codes and Phoenix Metro water conditions.\n\n**How I can help right now:**\n- 🔍 **Diagnose symptoms**: Leaks, rumbling water heaters, sewer backups, slab leaks, or noisy pipes.\n- 🚨 **Emergency guidance**: Fast instructions to shut off water supplies and prevent home flooding.\n- 💰 **Transparent pricing**: Instant upfront cost checks from our **86 published flat rates** with **$0 trip fees**.\n\n*What plumbing issue are you experiencing today?*`,
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Phoenix Metro');
  const [isMinimized, setIsMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  // Handle initial prompt when passed
  useEffect(() => {
    if (isOpen && initialPrompt && initialPrompt.trim().length > 0) {
      handleSendMessage(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/virtual-plumber/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
          userContext: {
            city: selectedCity,
            highLegibility: highLegibilityMode,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.reply || "I've analyzed your situation. For a guaranteed fix with $0 trip fees, our team is ready to help.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedService: data.recommendedService,
        isEmergency: data.isEmergency,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.warn('Virtual Plumber fetch error, using built-in diagnostic rule engine:', err);

      // Smart local fallback in case network issues happen
      let fallbackReply = `### 🔧 Plumber Diagnostic Assessment\n\nThank you for sharing your symptoms. Based on standard residential plumbing protocols in the Phoenix area:\n\n1. **Likely Cause**: Hard water mineral scale or pressure regulator fluctuations are the most common culprits.\n2. **Recommended Action**: Have a licensed technician inspect the unit and test incoming static water pressure.\n3. **Judai Brothers Guarantee**: We offer **$0 trip fees** and upfront flat rates with a **1-Year Workmanship Warranty**.\n\nCall our 24/7 master plumbing dispatch at **(480) 938-3803** or book an appointment online!`;
      
      let recommendedService: any = undefined;
      const lower = messageContent.toLowerCase();
      if (lower.includes('water heater') || lower.includes('hot water')) {
        recommendedService = { id: 'wh-01', title: 'Standard Tank Water Heater Replacement (40/50 Gal)', price: 1489, category: 'water-heaters' };
      } else if (lower.includes('drain') || lower.includes('clog')) {
        recommendedService = { id: 'dr-01', title: 'Standard Drain Snaking & Cleanout', price: 139, category: 'drains' };
      }

      const aiMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedService,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: `### 👨‍🔧 Chat Reset\n\nI'm ready for your next plumbing diagnostic or pricing question. What can I help you inspect?`,
        timestamp: 'Just now',
      },
    ]);
  };

  const renderFormattedMarkdown = (text: string) => {
    // Simple markdown renderer for headers, bold, bullet points, and code blocks
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-slate-900 text-sm sm:text-base mt-2 mb-1.5 flex items-center gap-1.5 text-amber-950">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="font-extrabold text-slate-900 text-base sm:text-lg mt-2.5 mb-1.5 text-slate-900">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const content = line.substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-slate-700 text-xs sm:text-sm my-0.5 leading-relaxed">
            {formatBoldText(content)}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        const content = line.replace(/^\d+\.\s/, '');
        return (
          <div key={idx} className="flex items-start gap-2 text-slate-700 text-xs sm:text-sm my-1 leading-relaxed">
            <span className="font-bold text-amber-700 shrink-0">{line.match(/^\d+/)?.[0]}.</span>
            <span>{formatBoldText(content)}</span>
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="text-slate-700 text-xs sm:text-sm leading-relaxed my-0.5">
          {formatBoldText(line)}
        </p>
      );
    });
  };

  const formatBoldText = (str: string) => {
    // Splits by **bold** text
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div
      id="virtual-plumber-modal-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="virtual-plumber-modal-container"
        className={`w-full max-w-2xl bg-white sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[92vh] sm:h-[84vh] max-h-[820px]'
        }`}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#07172C] via-[#0B2545] to-[#0D3B66] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-blue-900/60 shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-[#0B2545] shadow-md">
                <Wrench className="w-5 h-5 text-[#0B2545]" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0B2545]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm sm:text-base text-white tracking-tight flex items-center gap-1.5">
                  <span>Virtual Plumber</span>
                  <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-amber-400/25 text-amber-300 border border-amber-400/40">
                    AI Diagnostic
                  </span>
                </h3>
              </div>
              <p className="text-[11px] text-blue-200 flex items-center gap-2">
                <span>Judai Brothers (AZ ROC #354554)</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">$0 Trip Fees</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Call Button */}
            <a
              href="tel:4809383803"
              id="virtual-plumber-header-call-btn"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0B2545] font-black text-xs shadow transition-all active:scale-95"
              title="Speak with live master plumber dispatch"
            >
              <Phone className="w-3.5 h-3.5 text-[#0B2545]" />
              <span>(480) 938-3803</span>
            </a>

            {/* Minimize / Expand */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/60 transition-colors"
              title={isMinimized ? 'Expand Chat' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              id="virtual-plumber-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/60 transition-colors"
              title="Close Virtual Plumber"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Content Body (when not minimized) */}
        {!isMinimized && (
          <>
            {/* Sub-bar with Valley City filter and quick tools */}
            <div className="bg-blue-50/70 border-b border-blue-100 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-blue-900/70 font-medium">Valley Location:</span>
                <select
                  id="virtual-plumber-city-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-white border border-blue-200 rounded-lg px-2.5 py-1 text-blue-950 font-semibold text-xs focus:ring-2 focus:ring-amber-500 outline-hidden"
                >
                  <option value="Phoenix Metro">Phoenix Metro (All Areas)</option>
                  <option value="Scottsdale">Scottsdale (16–22 GPG Hardness)</option>
                  <option value="Mesa / Gilbert">Mesa & Gilbert (18–25 GPG Hardness)</option>
                  <option value="Chandler / Tempe">Chandler & Tempe (15–20 GPG Hardness)</option>
                  <option value="Glendale / Peoria">Glendale & Peoria (17–23 GPG Hardness)</option>
                  <option value="Surprise / Buckeye">Surprise & Buckeye (20–26 GPG Hardness)</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleClearChat}
                  className="text-blue-700 hover:text-blue-900 flex items-center gap-1 text-[11px] font-medium"
                  title="Clear diagnostic history"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Chat</span>
                </button>
              </div>
            </div>

            {/* Message Stream */}
            <div
              id="virtual-plumber-chat-scroll"
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/60"
            >
              {messages.map((message) => {
                const isAi = message.role === 'assistant';

                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAi && (
                      <div className="w-8 h-8 rounded-xl bg-[#0B2545] text-amber-300 flex items-center justify-center shrink-0 shadow-xs border border-blue-800 mt-1">
                        <Bot className="w-4 h-4 text-amber-300" />
                      </div>
                    )}

                    <div
                      className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm shadow-xs ${
                        isAi
                          ? 'bg-white text-slate-800 border border-slate-200'
                          : 'bg-gradient-to-r from-blue-700 via-blue-800 to-[#0B2545] text-white font-medium rounded-br-xs'
                      }`}
                    >
                      {/* Message Content */}
                      <div className="space-y-1">
                        {isAi ? renderFormattedMarkdown(message.text) : <p>{message.text}</p>}
                      </div>

                      {/* Interactive Service Card if Recommended */}
                      {message.recommendedService && (
                        <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-300 text-slate-900">
                          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-amber-200/70">
                            <span className="text-[11px] uppercase font-bold tracking-wider text-amber-900 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                              Official Judai Brothers Flat Rate
                            </span>
                            <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                              $0 Trip Fee
                            </span>
                          </div>

                          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="font-bold text-slate-900 text-xs sm:text-sm">
                                {message.recommendedService.title}
                              </div>
                              <div className="text-amber-800 font-extrabold text-sm sm:text-base">
                                ${message.recommendedService.price.toLocaleString()}{' '}
                                <span className="text-[11px] font-normal text-slate-600">upfront flat rate</span>
                              </div>
                            </div>

                            <button
                              id={`book-rec-service-${message.recommendedService.id}`}
                              onClick={() => {
                                onOpenBooking(message.recommendedService?.id, {
                                   title: message.recommendedService!.title,
                                   price: message.recommendedService!.price,
                                });
                              }}
                              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 shrink-0"
                            >
                              <Calendar className="w-3.5 h-3.5 text-slate-950" />
                              <span>Book at This Price</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Emergency Warning Card if Detected */}
                      {message.isEmergency && (
                        <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 animate-bounce" />
                            <div className="text-xs font-medium">
                              <strong className="block text-red-900 font-bold">Urgent Water Containment:</strong>
                              Shut off your main valve immediately to stop flooding.
                            </div>
                          </div>

                          <a
                            href="tel:4809383803"
                            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-sm"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call 24/7 Dispatch</span>
                          </a>
                        </div>
                      )}

                      <div
                        className={`text-[10px] mt-2 text-right ${
                          isAi ? 'text-slate-400' : 'text-blue-100'
                        }`}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2.5 justify-start">
                  <div className="w-8 h-8 rounded-xl bg-[#0B2545] text-amber-300 flex items-center justify-center shrink-0 shadow-xs border border-blue-800">
                    <Bot className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xs flex items-center gap-2 text-slate-500 text-xs">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-75" />
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-150" />
                    <span className="font-medium text-slate-600 pl-1">Virtual Plumber is diagnosing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Diagnostic Suggestions Slider */}
            <div className="px-4 py-2 bg-white border-t border-slate-200 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                Quick Diagnose:
              </span>
              {QUICK_PROMPTS.map((item, i) => (
                <button
                  key={i}
                  id={`quick-prompt-${i}`}
                  onClick={() => handleSendMessage(item.prompt)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-lg bg-blue-50/80 hover:bg-amber-50 hover:text-[#0B2545] hover:border-amber-300 text-[#0B2545] text-[11px] font-semibold border border-blue-100 transition-colors shrink-0 disabled:opacity-50"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef}
                    id="virtual-plumber-input-textarea"
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Describe what's leaking, making noise, or acting up..."
                    className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm rounded-2xl px-4 py-3 border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-hidden resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  id="virtual-plumber-send-btn"
                  disabled={!input.trim() || isLoading}
                  className="p-3 rounded-2xl bg-gradient-to-r from-blue-700 to-[#0B2545] hover:from-blue-800 hover:to-blue-950 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all active:scale-95 flex items-center justify-center shrink-0 border border-blue-600/40"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 text-amber-300" />
                </button>
              </form>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>Judai Brothers Master AI Plumber • Zero Commission Pressure</span>
                <span className="hidden sm:inline">Press Enter to send</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
