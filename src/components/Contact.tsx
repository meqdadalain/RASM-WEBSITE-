import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Cpu, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import { SectionLabel } from './ui/MagneticButton';

type Message = {
  id: number;
  role: 'ai' | 'user';
  text: string;
  typing?: boolean;
};

const AI_REPLIES = [
  'I can analyze water treatment plants, oil refineries, power stations, and more. Which facility would you like RASM to evaluate?',
  'Excellent. Upload your IFC, RVT, or DWG model and I will run a full engineering analysis — geometry, topology, clashes, and compliance.',
  'I have identified 3 critical risks and 17 warnings in your model. The most severe is a maintenance clearance violation on the primary treatment train. Shall I generate a full report?',
  'Understood. I will prepare a complete engineering report with traceable references to ISO-16739 and your project specifications. You will receive it within minutes.',
];

const SUGGESTIONS = [
  'Analyze a water treatment plant',
  'Detect design clashes in my BIM model',
  'Estimate constructability risks',
  'Generate an engineering report',
];

export default function Contact() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'ai',
      text: 'Hello. I am RASM — your AI engineering intelligence. What would you like me to analyze?',
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const replyIndex = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply = AI_REPLIES[replyIndex.current % AI_REPLIES.length];
      replyIndex.current += 1;
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: 'ai', text: reply },
      ]);
    }, 1600);
  };

  return (
    <section id="contact" className="relative min-h-screen w-full py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 flex flex-col gap-4">
          <SectionLabel index="07">Contact</SectionLabel>
          <h2 className="max-w-3xl font-sans text-4xl font-bold tracking-tight text-cyan-50 md:text-6xl">
            Talk to <span className="gradient-text">RASM.</span>
          </h2>
          <p className="max-w-2xl text-lg font-light text-cyan-100/60">
            No forms. Just a conversation with the AI that will understand your
            engineering project.
          </p>
        </div>

        {/* Conversation */}
        <div className="overflow-hidden rounded-3xl glass-strong">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-400/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full glass">
                <Cpu className="h-5 w-5 text-cyan-300" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-safe" />
              </div>
              <div>
                <p className="font-sans text-sm font-semibold text-cyan-50">RASM</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-safe">
                  Online · Engineering Intelligence
                </p>
              </div>
            </div>
            <Sparkles className="h-4 w-4 text-cyan-300/40" />
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="no-scrollbar h-[400px] space-y-4 overflow-y-auto px-6 py-6"
          >
            <AnimatePresence>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      m.role === 'user'
                        ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 text-ink-950'
                        : 'glass text-cyan-100/80'
                    }`}
                  >
                    {m.role === 'ai' && (
                      <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/40">
                        RASM
                      </span>
                    )}
                    <p className="text-sm leading-relaxed">{m.text}</p>
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glass flex items-center gap-1.5 rounded-2xl px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 px-6 pb-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full glass px-3.5 py-1.5 font-mono text-[10px] text-cyan-100/60 transition-colors hover:text-cyan-100"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 border-t border-cyan-400/10 px-6 py-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Describe your project…"
              className="w-full bg-transparent text-sm text-cyan-100/80 placeholder:text-cyan-300/30 focus:outline-none"
            />
            <button
              onClick={() => send(input)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 text-ink-950 transition-transform hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Contact details */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <a
            href="mailto:meqdad@i3dmonitoring.com"
            className="group flex items-center gap-4 rounded-2xl glass px-5 py-5 transition-colors hover:border-cyan-400/30"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl glass">
              <Mail className="h-5 w-5 text-cyan-300" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/40">
                Email
              </p>
              <p className="truncate text-sm text-cyan-100/80 transition-colors group-hover:text-cyan-100">
                meqdad@i3dmonitoring.com
              </p>
            </div>
          </a>
          <a
            href="tel:+33652914657"
            className="group flex items-center gap-4 rounded-2xl glass px-5 py-5 transition-colors hover:border-cyan-400/30"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl glass">
              <Phone className="h-5 w-5 text-cyan-300" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/40">
                Téléphone
              </p>
              <p className="text-sm text-cyan-100/80 transition-colors group-hover:text-cyan-100">
                +33 6 52 91 46 57
              </p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-2xl glass px-5 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl glass">
              <MapPin className="h-5 w-5 text-cyan-300" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/40">
                Adresse
              </p>
              <p className="text-sm text-cyan-100/80">Lyon, France</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-cyan-400/10 pt-12 text-center">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="RASM"
              className="h-8 w-8 rounded-md object-contain"
            />
            <span className="font-sans text-base font-bold tracking-tight text-cyan-50">
              RASM
            </span>
          </div>
          <p className="max-w-md text-sm font-light text-cyan-100/40">
            The world's first AI Design Intelligence Platform. The next engineer
            will work with AI.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/30">
            © 2026 RASM · Built for the future of engineering
          </p>
        </div>
      </div>
    </section>
  );
}
