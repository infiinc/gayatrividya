import React, { useState, useEffect, useRef } from 'react';
import { PlayCircle, Activity, Sun, Sparkles, BookOpen, ChevronRight, Menu, Feather, Atom, LayoutGrid, Sparkle, ArrowRight, Lock, X, Volume2, VolumeX, ChevronDown, Star, Moon, Wind } from 'lucide-react';

const syllables = ['त', 'त्', 'स', 'वि', 'तु', 'र्व', 'रे', 'ण्यं', 'भ', 'र्गो', 'दे', 'व', 'स्य', 'धी', 'म', 'हि', 'धि', 'यो', 'यो', 'नः', 'प्र', 'चो', 'द', 'यात्'];

const syllableMeanings = [
  { syllable: 'ॐ', roman: 'Om', meaning: 'The primordial sound of the universe' },
  { syllable: 'भूर्', roman: 'Bhur', meaning: 'The physical world, earth plane' },
  { syllable: 'भुवः', roman: 'Bhuvah', meaning: 'The mental/astral plane' },
  { syllable: 'स्वः', roman: 'Svah', meaning: 'The celestial plane, spirit' },
  { syllable: 'तत्', roman: 'Tat', meaning: 'That — the ultimate reality' },
  { syllable: 'सवितुर्', roman: 'Savitur', meaning: 'Of Savitr, the sun deity' },
  { syllable: 'वरेण्यं', roman: 'Varenyam', meaning: 'Most adorable, most desirable' },
  { syllable: 'भर्गो', roman: 'Bhargo', meaning: 'Radiance, divine light' },
  { syllable: 'देवस्य', roman: 'Devasya', meaning: 'Of the divine, godly' },
  { syllable: 'धीमहि', roman: 'Dhimahi', meaning: 'We meditate upon' },
  { syllable: 'धियो', roman: 'Dhiyo', meaning: 'Our intellect, understanding' },
  { syllable: 'यो', roman: 'Yo', meaning: 'Who, which' },
  { syllable: 'नः', roman: 'Nah', meaning: 'Our, ours' },
  { syllable: 'प्रचोदयात्', roman: 'Prachodayat', meaning: 'May inspire, illuminate' },
];

const modules = [
  {
    phase: 'Phase I',
    icon: 'book',
    color: 'amber',
    title: 'Vedic Phonetics',
    desc: 'Master the exact pronunciation and meter of each of the 24 sacred syllables.',
    lessons: ['Introduction to Sanskrit vowels', 'Consonant clusters & sandhi', 'Metrical patterns (Gayatri Chandas)', 'Breathwork & vocal resonance'],
    duration: '4 weeks',
    locked: false,
  },
  {
    phase: 'Phase II',
    icon: 'activity',
    color: 'orange',
    title: 'Neuro Impact',
    desc: 'Analyze the biofeedback data and understand the neurological effects of resonance.',
    lessons: ['Brainwave entrainment basics', 'Gamma state induction', 'Endocrine system mapping', 'CSF resonance patterns'],
    duration: '6 weeks',
    locked: false,
  },
  {
    phase: 'Phase III',
    icon: 'moon',
    color: 'violet',
    title: 'Brahma Muhurta',
    desc: 'Optimize your practice with the cosmic timing of the pre-dawn ambrosial hours.',
    lessons: ['Circadian rhythm alignment', 'Solar arc calculations', 'Transitional consciousness states', 'Advanced breath ratios'],
    duration: '3 weeks',
    locked: true,
  },
  {
    phase: 'Phase IV',
    icon: 'star',
    color: 'rose',
    title: 'Solar Integration',
    desc: 'Integrate the full practice into a living, transformative daily sadhana.',
    lessons: ['108-repetition protocol', 'Mantra journaling methods', 'Energy body mapping', 'Community practice & accountability'],
    duration: '8 weeks',
    locked: true,
  },
];

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [activeSyllable, setActiveSyllable] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [meditationActive, setMeditationActive] = useState(false);
  const [meditationCount, setMeditationCount] = useState(0);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const meditationRef = useRef(null);
  const breathRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (meditationActive) {
      let count = 0;
      let phase = 'inhale';
      meditationRef.current = setInterval(() => {
        count++;
        setMeditationCount(count);
      }, 4000);
      const cycleBreath = () => {
        setBreathPhase(p => {
          if (p === 'inhale') return 'hold';
          if (p === 'hold') return 'exhale';
          return 'inhale';
        });
      };
      breathRef.current = setInterval(cycleBreath, 4000);
    } else {
      clearInterval(meditationRef.current);
      clearInterval(breathRef.current);
    }
    return () => {
      clearInterval(meditationRef.current);
      clearInterval(breathRef.current);
    };
  }, [meditationActive]);

  const navigate = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setActiveModule(null);
    setActiveSyllable(null);
  };

  const navLinkClass = (page) => `
    cursor-pointer transition-colors duration-300
    ${currentPage === page ? 'text-amber-400' : 'hover:text-amber-300 text-white/60'}
  `;

  const colorMap = {
    amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30', glow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]' },
    violet: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30', glow: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]' },
    rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30', glow: 'hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]' },
  };

  return (
    <div className="min-h-screen bg-[#060411] text-white overflow-x-hidden font-sans relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .brahma-bg { background: radial-gradient(circle at 50% 50%, #4b1b0b 0%, #1f0c24 35%, #060411 80%); }
        .yantra-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-opacity='0.04' stroke-width='1'%3E%3Cpath d='M40 0l40 80H0z'/%3E%3Cpath d='M40 80L0 0h80z'/%3E%3Ccircle cx='40' cy='40' r='30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          background-size: 120px 120px;
        }
        .glass-panel {
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .savitr-core {
          box-shadow: 0 0 40px #fff7ed, 0 0 100px #f59e0b, 0 0 200px #ea580c, 0 0 400px #9a3412, inset 0 0 50px #fffbeb;
        }
        .god-rays {
          background: conic-gradient(
            from 0deg at 50% 50%,
            rgba(251,191,36,0) 0deg, rgba(251,191,36,0.15) 15deg, rgba(251,191,36,0) 30deg,
            rgba(251,191,36,0) 60deg, rgba(251,191,36,0.1) 75deg, rgba(251,191,36,0) 90deg,
            rgba(251,191,36,0) 120deg, rgba(251,191,36,0.2) 135deg, rgba(251,191,36,0) 150deg,
            rgba(251,191,36,0) 180deg, rgba(251,191,36,0.1) 195deg, rgba(251,191,36,0) 210deg,
            rgba(251,191,36,0) 240deg, rgba(251,191,36,0.15) 255deg, rgba(251,191,36,0) 270deg,
            rgba(251,191,36,0) 300deg, rgba(251,191,36,0.2) 315deg, rgba(251,191,36,0) 330deg,
            rgba(251,191,36,0) 360deg
          );
        }
        @keyframes spin-slow { 100% { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes spin-reverse { 100% { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes float-1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float-2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes pulse-glow { 0%,100% { transform: scale(1); opacity:0.8; } 50% { transform: scale(1.05); opacity:1; } }
        @keyframes bars { 0%,100% { height:20%; } 50% { height:100%; } }
        @keyframes fade-in { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes breathe-in { 0% { transform:scale(1); opacity:0.6; } 100% { transform:scale(1.4); opacity:1; } }
        @keyframes breathe-hold { 0%,100% { transform:scale(1.4); opacity:1; } }
        @keyframes breathe-out { 0% { transform:scale(1.4); opacity:1; } 100% { transform:scale(1); opacity:0.6; } }
        @keyframes count-up { from { opacity:0; transform:scale(0.5); } to { opacity:1; transform:scale(1); } }
        .animate-spin-slow { animation: spin-slow 80s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 120s linear infinite; }
        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .breathe-in { animation: breathe-in 4s ease-in-out forwards; }
        .breathe-hold { animation: breathe-hold 4s ease-in-out forwards; }
        .breathe-out { animation: breathe-out 4s ease-in-out forwards; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(251,191,36,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(251,191,36,0.4); }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 brahma-bg opacity-80 pointer-events-none z-0" />
      <div className="fixed inset-0 yantra-pattern pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060411] pointer-events-none z-0" />

      {/* Savitr Orb */}
      <div className={`fixed top-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square transition-all duration-1000 pointer-events-none z-0
        ${mounted ? 'opacity-100' : 'opacity-0'}
        ${currentPage === 'home' ? 'left-1/2 -translate-x-1/2' : 'left-[88%] -translate-x-1/2 opacity-40 scale-75'}`}>
        <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] rounded-full god-rays animate-spin-reverse blur-xl" />
        <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] rounded-full god-rays animate-spin-slow blur-md mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 w-[80%] h-[80%] rounded-full animate-spin-slow">
          {syllables.map((s, i) => {
            const rot = (360 / 24) * i;
            return (
              <div key={i} className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 flex items-center justify-center"
                style={{ transform: `rotate(${rot}deg) translateY(-320px) rotate(-${rot}deg)` }}>
                <span className="font-serif text-xl text-amber-200/60 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">{s}</span>
              </div>
            );
          })}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-orange-400 via-yellow-200 to-white savitr-core animate-pulse-glow" />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#060411]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white/60 hover:text-white">
            <X className="w-7 h-7" />
          </button>
          {['philosophy','science','mantra','meditate','modules'].map(p => (
            <button key={p} onClick={() => navigate(p)}
              className={`font-serif text-2xl uppercase tracking-widest transition-colors ${currentPage === p ? 'text-amber-400' : 'text-white/60 hover:text-amber-300'}`}>
              {p}
            </button>
          ))}
          <button onClick={() => navigate('initiate')}
            className="mt-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-10 py-3 rounded-full font-serif text-lg tracking-widest">
            Initiate
          </button>
        </div>
      )}

      {/* Module Detail Modal */}
      {activeModule !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setActiveModule(null)}>
          <div className="glass-panel rounded-3xl p-8 max-w-lg w-full animate-fade-in relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveModule(null)} className="absolute top-5 right-5 text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            {(() => {
              const m = modules[activeModule];
              const c = colorMap[m.color];
              return (
                <>
                  <div className={`inline-flex px-3 py-1 rounded-full border text-xs uppercase tracking-widest mb-4 ${c.border} ${c.text}`}>{m.phase}</div>
                  <h3 className="font-serif text-3xl text-white mb-2">{m.title}</h3>
                  <p className="text-white/50 mb-6 font-light">{m.desc}</p>
                  <div className="space-y-3 mb-6">
                    {m.lessons.map((l, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <div className={`w-2 h-2 rounded-full ${c.bg.replace('/20', '')}`} />
                        {l}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30 uppercase tracking-widest">Duration: {m.duration}</span>
                    {m.locked
                      ? <div className="flex items-center gap-2 text-white/30 text-xs"><Lock className="w-4 h-4" /> Unlock after Phase {activeModule}</div>
                      : <button className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r ${m.color === 'amber' ? 'from-amber-600 to-orange-500' : 'from-orange-600 to-amber-500'} text-white`}>
                          Begin Module <ArrowRight className="w-4 h-4" />
                        </button>
                    }
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Syllable Detail Modal */}
      {activeSyllable !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={() => setActiveSyllable(null)}>
          <div className="glass-panel rounded-3xl p-10 max-w-sm w-full animate-fade-in text-center relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveSyllable(null)} className="absolute top-5 right-5 text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="text-7xl font-serif text-amber-300 mb-3 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]">
              {syllableMeanings[activeSyllable].syllable}
            </div>
            <div className="text-amber-500 uppercase tracking-widest text-sm mb-4">{syllableMeanings[activeSyllable].roman}</div>
            <p className="text-white/70 font-light text-lg leading-relaxed">{syllableMeanings[activeSyllable].meaning}</p>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="relative z-10 min-h-screen flex flex-col container mx-auto px-6 lg:px-12 py-8">

        {/* Nav */}
        <header className="flex items-center justify-between">
          <div onClick={() => navigate('home')} className="flex items-center gap-3 cursor-pointer group">
            <Sun className="w-8 h-8 text-amber-400 group-hover:rotate-180 transition-transform duration-1000" />
            <span className="font-serif text-xl lg:text-2xl tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-600 font-bold">
              GAYATRI VIDYA
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest">
            <a onClick={() => navigate('philosophy')} className={navLinkClass('philosophy')}>Philosophy</a>
            <a onClick={() => navigate('science')} className={navLinkClass('science')}>Science</a>
            <a onClick={() => navigate('mantra')} className={navLinkClass('mantra')}>Mantra</a>
            <a onClick={() => navigate('meditate')} className={navLinkClass('meditate')}>Meditate</a>
            <a onClick={() => navigate('modules')} className={navLinkClass('modules')}>Modules</a>
            <button onClick={() => navigate('initiate')}
              className={`glass-panel px-6 py-2.5 rounded-full hover:bg-amber-400/10 transition-all border-amber-400/30 ${currentPage === 'initiate' ? 'bg-amber-400/20 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.4)]' : 'text-amber-300'}`}>
              Initiate
            </button>
          </nav>
          <button className="md:hidden text-white/70" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 flex flex-col justify-center py-12">

          {/* ── HOME ── */}
          {currentPage === 'home' && (
            <main className="flex flex-col lg:flex-row items-center justify-between gap-12 animate-fade-in w-full">
              <div className="w-full lg:w-1/3 flex flex-col items-start">
                <div className="glass-panel rounded-3xl p-8 lg:p-10 animate-float-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs uppercase tracking-widest mb-6">
                    <Sparkles className="w-3 h-3" /><span>The Science of Light</span>
                  </div>
                  <h1 className="font-serif text-4xl lg:text-5xl leading-tight mb-6">
                    Awaken the<br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-600">Solar Mind</span>
                  </h1>
                  <p className="text-white/60 leading-relaxed mb-8 font-light text-sm">
                    Explore the biophysics of acoustic resonance. The 24 syllables of the Gayatri frequency map perfectly to human neurological awakening.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={() => navigate('initiate')} className="group flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-7 py-3.5 rounded-full font-medium hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] transition-all text-sm">
                      <span>Begin Journey</span><ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button onClick={() => navigate('meditate')} className="group flex items-center gap-3 glass-panel px-7 py-3.5 rounded-full text-amber-300 hover:bg-amber-400/10 transition-all text-sm">
                      <span>Meditate Now</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3 flex flex-col gap-5">
                <div className="glass-panel rounded-3xl p-6 animate-float-2">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-serif text-base text-amber-100">Resonance Data</h3>
                    <Activity className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="h-28 flex items-end justify-between gap-0.5 mb-3 border-b border-white/10 pb-2">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="w-full bg-gradient-to-t from-amber-600/20 to-amber-300/80 rounded-t-sm"
                        style={{ height: `${Math.sin(i * 0.8) * 40 + 50}%`, animation: `bars ${1.5 + (i % 5) * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.05}s` }} />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-white/40 uppercase tracking-widest">
                    <span>108 Hz</span>
                    <span className="text-amber-400/60">24 Syllables</span>
                    <span>432 Hz</span>
                  </div>
                </div>

                <div className="glass-panel rounded-3xl p-6 animate-float-1" style={{ animationDelay: '-4s' }}>
                  <h3 className="font-serif text-base text-amber-100 mb-4">Quick Access</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: <BookOpen className="w-4 h-4" />, title: 'Mantra Explorer', sub: 'Interactive syllable breakdown', page: 'mantra' },
                      { icon: <Wind className="w-4 h-4" />, title: 'Guided Meditation', sub: 'Brahma Muhurta session', page: 'meditate' },
                      { icon: <LayoutGrid className="w-4 h-4" />, title: 'Curriculum Modules', sub: 'Phase I — IV pathway', page: 'modules' },
                    ].map((item, i) => (
                      <div key={i} onClick={() => navigate(item.page)}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-pointer group">
                        <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">{item.icon}</div>
                        <div>
                          <div className="text-sm font-medium text-white/80">{item.title}</div>
                          <div className="text-xs text-white/30">{item.sub}</div>
                        </div>
                        <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-amber-400 ml-auto transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          )}

          {/* ── PHILOSOPHY ── */}
          {currentPage === 'philosophy' && (
            <main className="animate-fade-in w-full lg:w-1/2">
              <div className="glass-panel rounded-3xl p-8 lg:p-12 animate-float-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
                <Feather className="w-9 h-9 text-amber-400 mb-6" />
                <h2 className="font-serif text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-500 mb-8">The Philosophy of Light</h2>
                <div className="space-y-5 text-white/70 leading-relaxed font-light">
                  <p>Since the dawn of human consciousness, the concept of <span className="text-amber-300 font-medium">Savitr</span> — the spiritual sun — has represented the ultimate source of illumination. Not merely the physical star, but the divine light that illuminates the intellect itself.</p>
                  <p>The Gayatri Mantra is the sonic embodiment of this light. Formulated by the ancient sage <span className="text-amber-300 font-medium">Vishvamitra</span>, it is an invocation asking divine light to inspire, awaken, and sharpen our intellect.</p>
                  <blockquote className="border-l-2 border-amber-500/50 pl-6 py-2 my-6 text-amber-100/80 italic text-lg font-serif">
                    "We meditate on the glorious splendor of the divine lifegiver. May He illuminate our intellects."
                  </blockquote>
                  <p>Practiced during the <span className="text-amber-300 font-medium">Brahma Muhurta</span> — the ambrosial hours just before dawn — the mind exists in a state of natural theta-to-alpha transition, maximally receptive to the mantra's resonance patterns.</p>
                  <p>This is not mysticism alone. It is a technology of consciousness refined over 3,500 years of empirical practice, now being validated by modern neuroscience and bioacoustic research.</p>
                </div>
                <div className="mt-8 flex gap-4">
                  <button onClick={() => navigate('science')} className="group flex items-center gap-2 text-amber-400 text-sm hover:text-amber-300 transition-colors">
                    Explore the Science <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </main>
          )}

          {/* ── SCIENCE ── */}
          {currentPage === 'science' && (
            <main className="animate-fade-in w-full lg:w-1/2">
              <div className="glass-panel rounded-3xl p-8 lg:p-12 animate-float-2 w-full">
                <div className="flex items-center gap-4 mb-8">
                  <Atom className="w-9 h-9 text-amber-400" />
                  <h2 className="font-serif text-3xl lg:text-4xl text-amber-100">Biophysics of Resonance</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { label: 'Base Frequency', value: '108', unit: 'Hz', sub: 'Harmonic alignment with cosmic ratios' },
                    { label: 'Brainwave State', value: 'Gamma', unit: '', sub: 'Heightened perception & clarity' },
                    { label: 'Syllable Count', value: '24', unit: '', sub: 'Maps to 24-hour solar cycle' },
                    { label: 'Optimal Repetitions', value: '108', unit: '×', sub: 'One complete mala cycle' },
                  ].map((s, i) => (
                    <div key={i} className="bg-black/20 rounded-2xl p-5 border border-white/5">
                      <div className="text-amber-500 text-xs uppercase tracking-widest mb-2">{s.label}</div>
                      <div className="text-3xl font-serif text-white mb-1">{s.value} <span className="text-lg text-white/40">{s.unit}</span></div>
                      <div className="text-xs text-white/35">{s.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="text-white/65 leading-relaxed font-light space-y-4 text-sm">
                  <p>Every syllable of the Gayatri is a <span className="text-amber-300">Bija</span> (seed) mantra. Modern cymatics and bio-acoustic research suggest that specific phonemes create geometric resonance patterns within the cerebral spinal fluid.</p>
                  <p>When chanted with correct meter, the 24 syllables act as an acoustic keyboard, triggering micro-vibrations across the endocrine system — the pineal gland in particular responds to frequencies in the 108-432 Hz range.</p>
                  <p>EEG studies on experienced practitioners show a consistent shift to gamma states (30-100 Hz) within 11 minutes of sustained chanting — a state associated with peak cognitive performance and heightened awareness.</p>
                </div>
                <button onClick={() => navigate('mantra')} className="mt-6 group flex items-center gap-2 text-amber-400 text-sm hover:text-amber-300 transition-colors">
                  Explore the Mantra <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </main>
          )}

          {/* ── MANTRA EXPLORER ── */}
          {currentPage === 'mantra' && (
            <main className="animate-fade-in w-full lg:w-[65%]">
              <div className="mb-6">
                <h2 className="font-serif text-3xl lg:text-4xl text-amber-100 mb-2">Mantra Explorer</h2>
                <p className="text-white/40 font-light text-sm">Tap any word to reveal its meaning</p>
              </div>
              <div className="glass-panel rounded-3xl p-6 lg:p-8 mb-6">
                <div className="font-serif text-2xl lg:text-3xl text-center text-amber-100 leading-loose tracking-wide mb-4">
                  ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं<br />
                  भर्गो देवस्य धीमहि<br />
                  धियो यो नः प्रचोदयात्
                </div>
                <div className="text-center text-white/40 text-xs uppercase tracking-widest">The Complete Gayatri Mantra</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {syllableMeanings.map((item, i) => (
                  <button key={i} onClick={() => setActiveSyllable(i)}
                    className="glass-panel rounded-2xl p-4 text-center hover:bg-amber-500/10 hover:border-amber-500/20 transition-all group">
                    <div className="font-serif text-2xl text-amber-300 mb-1 group-hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] transition-all">{item.syllable}</div>
                    <div className="text-xs text-white/40 uppercase tracking-widest">{item.roman}</div>
                  </button>
                ))}
              </div>
            </main>
          )}

          {/* ── MEDITATE ── */}
          {currentPage === 'meditate' && (
            <main className="animate-fade-in w-full lg:w-1/2">
              <div className="glass-panel rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none" />
                <Moon className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                <h2 className="font-serif text-3xl lg:text-4xl text-amber-100 mb-2">Brahma Muhurta Session</h2>
                <p className="text-white/40 font-light text-sm mb-10">Synchronize breath with the solar rhythm</p>

                {/* Breathing Orb */}
                <div className="relative flex items-center justify-center mb-10 h-48">
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-tr from-orange-600/40 via-amber-400/40 to-yellow-200/40 border border-amber-400/30
                    ${meditationActive ? (breathPhase === 'inhale' ? 'breathe-in' : breathPhase === 'hold' ? 'breathe-hold' : 'breathe-out') : ''}`}
                    style={{ boxShadow: meditationActive ? '0 0 60px rgba(251,191,36,0.3)' : 'none' }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="font-serif text-amber-200 text-lg capitalize">{meditationActive ? breathPhase : 'ready'}</div>
                    {meditationActive && (
                      <div className="text-amber-400/60 text-xs uppercase tracking-widest mt-1">Count: {meditationCount}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mb-8">
                  <button onClick={() => { setMeditationActive(a => !a); if (meditationActive) { setMeditationCount(0); setBreathPhase('inhale'); } }}
                    className={`flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all text-sm ${meditationActive
                      ? 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20'
                      : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-[0_0_30px_rgba(217,119,6,0.4)]'}`}>
                    {meditationActive ? <><VolumeX className="w-4 h-4" /> End Session</> : <><Volume2 className="w-4 h-4" /> Begin Session</>}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Inhale', value: '4 sec' },
                    { label: 'Hold', value: '4 sec' },
                    { label: 'Exhale', value: '4 sec' },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/20 rounded-xl p-3 border border-white/5">
                      <div className="text-amber-500/70 text-xs uppercase tracking-widest mb-1">{item.label}</div>
                      <div className="font-serif text-white text-lg">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          )}

          {/* ── MODULES ── */}
          {currentPage === 'modules' && (
            <main className="animate-fade-in w-full lg:w-[65%]">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="font-serif text-3xl lg:text-4xl text-amber-100 mb-2">Curriculum Map</h2>
                  <p className="text-white/40 font-light text-sm">Structured progression through the science of light</p>
                </div>
                <LayoutGrid className="w-8 h-8 text-amber-500/40 mt-1" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {modules.map((m, i) => {
                  const c = colorMap[m.color];
                  return (
                    <button key={i} onClick={() => setActiveModule(i)}
                      className={`glass-panel rounded-3xl p-6 text-left hover:bg-white/5 transition-all ${c.glow} ${m.locked ? 'opacity-60' : ''} w-full`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${c.bg} ${c.text}`}>
                          {m.icon === 'book' && <BookOpen className="w-5 h-5" />}
                          {m.icon === 'activity' && <Activity className="w-5 h-5" />}
                          {m.icon === 'moon' && <Moon className="w-5 h-5" />}
                          {m.icon === 'star' && <Star className="w-5 h-5" />}
                        </div>
                        <div className="flex items-center gap-2">
                          {m.locked && <Lock className="w-3.5 h-3.5 text-white/30" />}
                          <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border ${c.border} ${c.text}`}>{m.phase}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-serif text-white mb-1">{m.title}</h3>
                      <p className="text-white/40 text-xs mb-4 font-light">{m.desc}</p>
                      <div className={`text-xs uppercase tracking-widest flex items-center gap-2 ${c.text}`}>
                        {m.locked ? 'Locked' : 'View Module'} <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </main>
          )}

          {/* ── INITIATE ── */}
          {currentPage === 'initiate' && (
            <main className="animate-fade-in w-full lg:w-1/2">
              {formSubmitted ? (
                <div className="glass-panel w-full max-w-lg rounded-3xl p-10 text-center animate-fade-in border-amber-500/20">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
                    <Sun className="w-8 h-8 text-amber-400" />
                  </div>
                  <h2 className="font-serif text-3xl text-amber-100 mb-3">Welcome, {formData.name}</h2>
                  <p className="text-white/50 font-light mb-8">Your frequency has been anchored. The path of solar illumination opens before you.</p>
                  <button onClick={() => navigate('modules')}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3.5 rounded-full font-medium text-sm hover:shadow-[0_0_25px_rgba(217,119,6,0.4)] transition-all">
                    Enter the Curriculum →
                  </button>
                </div>
              ) : (
                <div className="glass-panel w-full max-w-lg rounded-3xl p-8 lg:p-12 animate-float-1 relative overflow-hidden border-amber-500/20">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
                  <div className="text-center mb-8">
                    <Sparkle className="w-9 h-9 text-amber-400 mx-auto mb-4" />
                    <h2 className="font-serif text-3xl text-amber-100 mb-2">Enter the Stream</h2>
                    <p className="text-white/40 font-light text-sm">Align your frequency and begin the curriculum.</p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-amber-500/80 ml-1">Designation</label>
                      <input type="text" placeholder="Your Name" value={formData.name}
                        onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-400/50 focus:bg-white/5 transition-all placeholder:text-white/20 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-amber-500/80 ml-1">Frequency Anchor</label>
                      <input type="email" placeholder="Email Address" value={formData.email}
                        onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-400/50 focus:bg-white/5 transition-all placeholder:text-white/20 text-sm" />
                    </div>
                    <button
                      onClick={() => { if (formData.name && formData.email) setFormSubmitted(true); }}
                      className="mt-2 group bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-[0_0_25px_rgba(217,119,6,0.4)] transition-all flex items-center justify-center gap-3 text-sm">
                      <span className="tracking-wide">Commence Sequence</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </main>
          )}

        </div>

        {/* Footer */}
        <footer className="text-center text-white/20 text-xs tracking-widest font-light uppercase">
          Gayatri Vidya &bull; Solar Consciousness Studies &bull; Est. 3500 BCE
        </footer>
      </div>
    </div>
  );
}
