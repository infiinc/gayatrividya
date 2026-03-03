import React, { useState, useEffect, useRef } from 'react';
import { Activity, Sun, Sparkles, BookOpen, ChevronRight, Menu, Feather, Atom, LayoutGrid, Sparkle, ArrowRight, Lock, X, Volume2, VolumeX, Star, Moon, Wind, Globe } from 'lucide-react';

const ORBIT = ['त','त्','स','वि','तु','र्व','रे','ण्यं','भ','र्गो','दे','व','स्य','धी','म','हि','धि','यो','यो','नः','प्र','चो','द','यात्'];
const CM = {
  amber:{bg:'bg-amber-500/20',text:'text-amber-400',border:'border-amber-500/30',glow:'hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]'},
  orange:{bg:'bg-orange-500/20',text:'text-orange-400',border:'border-orange-500/30',glow:'hover:shadow-[0_0_20px_rgba(249,115,22,0.25)]'},
  violet:{bg:'bg-violet-500/20',text:'text-violet-400',border:'border-violet-500/30',glow:'hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]'},
  rose:{bg:'bg-rose-500/20',text:'text-rose-400',border:'border-rose-500/30',glow:'hover:shadow-[0_0_20px_rgba(244,63,94,0.25)]'},
};

const LANG = {
  en:{
    brand:'GAYATRI VIDYA',toggle:'मराठी',
    nav:{philosophy:'Philosophy',science:'Science',mantra:'Mantra',meditate:'Meditate',modules:'Modules',initiate:'Initiate'},
    home:{badge:'The Science of Light',title1:'Awaken the',title2:'Solar Mind',
      desc:'Explore the biophysics of acoustic resonance. The 24 syllables of the Gayatri frequency map perfectly to human neurological awakening.',
      cta:'Begin Journey',cta2:'Meditate Now',resTitle:'Resonance Data',sync:'24 Syllables',qaTitle:'Quick Access',
      qa:[{t:'Mantra Explorer',s:'Interactive syllable breakdown',p:'mantra'},{t:'Guided Meditation',s:'Brahma Muhurta session',p:'meditate'},{t:'Curriculum Modules',s:'Phase I — IV pathway',p:'modules'}]},
    phi:{title:'The Philosophy of Light',
      paras:['Since the dawn of human consciousness, the concept of Savitr — the spiritual sun — has represented the ultimate source of illumination. Not merely the physical star, but the divine light that illuminates the intellect itself.',
        'The Gayatri Mantra is the sonic embodiment of this light. Formulated by the ancient sage Vishvamitra, it is an invocation asking divine light to inspire, awaken, and sharpen our intellect.',
        '"We meditate on the glorious splendour of the divine lifegiver. May He illuminate our intellects."',
        'Practiced during the Brahma Muhurta — the ambrosial hours just before dawn — the mind is in a natural theta-to-alpha transition, maximally receptive to the mantra\'s resonance patterns.',
        'This is not mysticism alone. It is a technology of consciousness refined over 3,500 years of empirical practice, now validated by modern neuroscience.'],
      qi:2,cta:'Explore the Science'},
    sci:{title:'Biophysics of Resonance',
      stats:[{l:'Base Frequency',v:'108',u:'Hz',s:'Harmonic alignment with cosmic ratios'},{l:'Brainwave State',v:'Gamma',u:'',s:'Heightened perception & clarity'},{l:'Syllable Count',v:'24',u:'',s:'Maps to 24-hour solar cycle'},{l:'Optimal Reps',v:'108',u:'×',s:'One complete mala cycle'}],
      paras:['Every syllable of the Gayatri is a Bija (seed) mantra. Modern cymatics suggests specific phonemes create geometric resonance patterns within the cerebral spinal fluid.',
        'When chanted with correct meter, the 24 syllables act as an acoustic keyboard, triggering micro-vibrations across the endocrine system — the pineal gland responds to frequencies in the 108–432 Hz range.',
        'EEG studies show a consistent shift to gamma states (30–100 Hz) within 11 minutes of sustained chanting — a state associated with peak cognitive performance.'],
      cta:'Explore the Mantra'},
    man:{title:'Mantra Explorer',sub:'Tap any word to reveal its meaning',full:'The Complete Gayatri Mantra'},
    med:{title:'Brahma Muhurta Session',sub:'Synchronise breath with the solar rhythm',
      ready:'Ready',cl:'Count',begin:'Begin Session',end:'End Session',
      bl:['Inhale','Hold','Exhale'],bv:['4 sec','4 sec','4 sec'],
      ph:{inhale:'Inhale',hold:'Hold',exhale:'Exhale'}},
    mod:{title:'Curriculum Map',sub:'Structured progression through the science of light',
      locked:'Locked',view:'View Module',begin:'Begin Module',ua:'Unlock after Phase',dur:'Duration',
      items:[
        {ph:'Phase I',color:'amber',icon:'book',title:'Vedic Phonetics',desc:'Master the exact pronunciation and meter of each of the 24 sacred syllables.',lessons:['Introduction to Sanskrit vowels','Consonant clusters & sandhi','Metrical patterns (Gayatri Chandas)','Breathwork & vocal resonance'],dur:'4 weeks',locked:false},
        {ph:'Phase II',color:'orange',icon:'activity',title:'Neuro Impact',desc:'Analyse the biofeedback data and understand the neurological effects of resonance.',lessons:['Brainwave entrainment basics','Gamma state induction','Endocrine system mapping','CSF resonance patterns'],dur:'6 weeks',locked:false},
        {ph:'Phase III',color:'violet',icon:'moon',title:'Brahma Muhurta',desc:'Optimise your practice with the cosmic timing of the pre-dawn ambrosial hours.',lessons:['Circadian rhythm alignment','Solar arc calculations','Transitional consciousness states','Advanced breath ratios'],dur:'3 weeks',locked:true},
        {ph:'Phase IV',color:'rose',icon:'star',title:'Solar Integration',desc:'Integrate the full practice into a living, transformative daily sadhana.',lessons:['108-repetition protocol','Mantra journaling methods','Energy body mapping','Community practice'],dur:'8 weeks',locked:true}]},
    ini:{title:'Enter the Stream',sub:'Align your frequency and begin the curriculum.',
      nl:'Designation',np:'Your Name',el:'Frequency Anchor',ep:'Email Address',submit:'Commence Sequence',
      wt:'Welcome,',wd:'Your frequency has been anchored. The path of solar illumination opens before you.',wc:'Enter the Curriculum →'},
    footer:'Gayatri Vidya • Solar Consciousness Studies • Est. 3500 BCE',
    syl:[
      {s:'ॐ',r:'Om',m:'The primordial sound of the universe'},
      {s:'भूर्',r:'Bhur',m:'The physical world, the earth plane'},
      {s:'भुवः',r:'Bhuvah',m:'The mental / astral plane'},
      {s:'स्वः',r:'Svah',m:'The celestial plane, spirit'},
      {s:'तत्',r:'Tat',m:'That — the ultimate reality'},
      {s:'सवितुर्',r:'Savitur',m:'Of Savitr, the sun deity'},
      {s:'वरेण्यं',r:'Varenyam',m:'Most adorable, most desirable'},
      {s:'भर्गो',r:'Bhargo',m:'Radiance, divine light'},
      {s:'देवस्य',r:'Devasya',m:'Of the divine, godly'},
      {s:'धीमहि',r:'Dhimahi',m:'We meditate upon'},
      {s:'धियो',r:'Dhiyo',m:'Our intellect, understanding'},
      {s:'यो',r:'Yo',m:'Who, which'},
      {s:'नः',r:'Nah',m:'Our, ours'},
      {s:'प्रचोदयात्',r:'Prachodayat',m:'May inspire, illuminate'}]
  },
  mr:{
    brand:'गायत्री विद्या',toggle:'English',
    nav:{philosophy:'तत्त्वज्ञान',science:'विज्ञान',mantra:'मंत्र',meditate:'ध्यान',modules:'अभ्यासक्रम',initiate:'प्रारंभ'},
    home:{badge:'प्रकाशाचे विज्ञान',title1:'जागृत करा',title2:'सौर मन',
      desc:'ध्वनी अनुनादाच्या जैवभौतिकीचा शोध घ्या. गायत्री मंत्राचे २४ अक्षरे मानवाच्या न्यूरोलॉजिकल जागृतीशी अचूकपणे जुळतात.',
      cta:'प्रवास सुरू करा',cta2:'आता ध्यान करा',resTitle:'अनुनाद डेटा',sync:'२४ अक्षरे',qaTitle:'जलद प्रवेश',
      qa:[{t:'मंत्र संशोधक',s:'परस्परक्रिय अक्षर विभाजन',p:'mantra'},{t:'मार्गदर्शित ध्यान',s:'ब्रह्म मुहूर्त सत्र',p:'meditate'},{t:'अभ्यासक्रम विभाग',s:'टप्पा I — IV मार्ग',p:'modules'}]},
    phi:{title:'प्रकाशाचे तत्त्वज्ञान',
      paras:['मानवी चेतनेच्या उषःकाळापासून, सवितृ — आध्यात्मिक सूर्य — हा परम प्रकाशाचे स्रोत म्हणून ओळखला जातो. केवळ भौतिक तारा नाही, तर बुद्धीला प्रकाशित करणारे दिव्य तेज.',
        'गायत्री मंत्र हा या प्रकाशाचा ध्वनी-अवतार आहे. प्राचीन ऋषी विश्वामित्र यांनी रचलेला हा मंत्र दिव्य प्रकाशाला बुद्धी प्रेरित, जागृत आणि तीक्ष्ण करण्यासाठी आवाहन करतो.',
        '"आम्ही त्या दिव्य जीवनदात्याच्या तेजस्वी वैभवावर ध्यान करतो. तो आमच्या बुद्धीला प्रकाशित करो."',
        'ब्रह्म मुहूर्त — पहाटेपूर्वीच्या अमृत घड़ियांमध्ये — मन नैसर्गिक थेटा-ते-अल्फा संक्रमणात असते आणि मंत्राच्या अनुनाद पद्धतींसाठी जास्तीत जास्त ग्रहणशील असते.',
        'हे केवळ रहस्यवाद नाही. ३,५०० वर्षांच्या अनुभवजन्य साधनेने परिष्कृत चेतनेची तंत्रज्ञान आहे, जी आता आधुनिक न्यूरोसायन्सने प्रमाणित होत आहे.'],
      qi:2,cta:'विज्ञान एक्सप्लोर करा'},
    sci:{title:'अनुनादाचे जैवभौतिकी',
      stats:[{l:'मूळ वारंवारता',v:'१०८',u:'Hz',s:'वैश्विक अनुपातांशी सुसंवाद'},{l:'मेंदू लहरी स्थिती',v:'गामा',u:'',s:'उच्च आकलन व स्पष्टता'},{l:'अक्षर संख्या',v:'२४',u:'',s:'२४ तासांच्या सौर चक्राशी संरेखित'},{l:'आदर्श पुनरावृत्ती',v:'१०८',u:'×',s:'एक पूर्ण माला चक्र'}],
      paras:['गायत्रीचे प्रत्येक अक्षर एक बीज मंत्र आहे. आधुनिक सायमॅटिक्स सुचवते की विशिष्ट ध्वनी मेरुदंड द्रवामध्ये भौमितिक अनुनाद नमुने तयार करतात.',
        'योग्य छंदात जप केल्यावर, २४ अक्षरे ध्वनिक कीबोर्डसारखे कार्य करतात, पिनियल ग्रंथीसह अंतःस्रावी प्रणालीवर सूक्ष्म कंपने निर्माण करतात.',
        'अनुभवी साधकांवरील EEG अभ्यास दाखवतो की ११ मिनिटांत गामा स्थितीत (३०–१०० Hz) स्थिर बदल होतो — उच्च संज्ञानात्मक कार्यक्षमतेशी संबंधित अवस्था.'],
      cta:'मंत्र एक्सप्लोर करा'},
    man:{title:'मंत्र संशोधक',sub:'अर्थ जाणण्यासाठी कोणत्याही शब्दावर टॅप करा',full:'संपूर्ण गायत्री मंत्र'},
    med:{title:'ब्रह्म मुहूर्त सत्र',sub:'सौर लयीशी श्वास जुळवा',
      ready:'तयार',cl:'मोजणी',begin:'सत्र सुरू करा',end:'सत्र समाप्त करा',
      bl:['श्वास घ्या','थांबा','श्वास सोडा'],bv:['४ सेकंद','४ सेकंद','४ सेकंद'],
      ph:{inhale:'श्वास घ्या',hold:'थांबा',exhale:'श्वास सोडा'}},
    mod:{title:'अभ्यासक्रम नकाशा',sub:'प्रकाशाच्या विज्ञानातून संरचित प्रगती',
      locked:'बंद',view:'विभाग पाहा',begin:'विभाग सुरू करा',ua:'टप्प्यानंतर उघडा',dur:'कालावधी',
      items:[
        {ph:'टप्पा I',color:'amber',icon:'book',title:'वैदिक स्वरशास्त्र',desc:'२४ पवित्र अक्षरांचे अचूक उच्चार आणि छंद शिका.',lessons:['संस्कृत स्वरांची ओळख','व्यंजन गट आणि संधी','मेट्रिकल नमुने (गायत्री छंद)','श्वासकार्य आणि स्वर अनुनाद'],dur:'४ आठवडे',locked:false},
        {ph:'टप्पा II',color:'orange',icon:'activity',title:'न्यूरो प्रभाव',desc:'जैवप्रतिसाद डेटाचे विश्लेषण करा आणि अनुनादाचे न्यूरोलॉजिकल परिणाम समजून घ्या.',lessons:['ब्रेनवेव्ह एन्ट्रेनमेंट मूलतत्त्वे','गामा स्थिती प्रेरण','अंतःस्रावी प्रणाली मॅपिंग','CSF अनुनाद नमुने'],dur:'६ आठवडे',locked:false},
        {ph:'टप्पा III',color:'violet',icon:'moon',title:'ब्रह्म मुहूर्त',desc:'पहाटेपूर्वीच्या अमृत घड़ियांच्या वैश्विक वेळेसह आपला सराव अनुकूल करा.',lessons:['सर्कॅडियन लय संरेखन','सौर चाप गणना','संक्रमणकालीन चेतना अवस्था','प्रगत श्वास प्रमाण'],dur:'३ आठवडे',locked:true},
        {ph:'टप्पा IV',color:'rose',icon:'star',title:'सौर एकीकरण',desc:'पूर्ण साधना दैनंदिन जीवनात परिवर्तनकारी रूपात समाकलित करा.',lessons:['१०८ पुनरावृत्ती प्रोटोकॉल','मंत्र जर्नलिंग पद्धती','उर्जा शरीर मॅपिंग','सामुदायिक साधना'],dur:'८ आठवडे',locked:true}]},
    ini:{title:'प्रवाहात प्रवेश करा',sub:'आपली वारंवारता जुळवा आणि अभ्यासक्रम सुरू करा.',
      nl:'नाव',np:'आपले नाव',el:'वारंवारता अँकर',ep:'ईमेल पत्ता',submit:'अनुक्रम सुरू करा',
      wt:'स्वागत आहे,',wd:'आपली वारंवारता जुळली आहे. सौर प्रकाशाचा मार्ग आपल्यासमोर उघडतो.',wc:'अभ्यासक्रमात प्रवेश करा →'},
    footer:'गायत्री विद्या • सौर चेतना अध्ययन • स्था. इ.पू. ३५००',
    syl:[
      {s:'ॐ',r:'ॐ',m:'विश्वाचा आद्य ध्वनी'},
      {s:'भूर्',r:'भूर्',m:'भौतिक जग, पृथ्वी तल'},
      {s:'भुवः',r:'भुवः',m:'मानसिक / सूक्ष्म तल'},
      {s:'स्वः',r:'स्वः',m:'स्वर्गीय तल, आत्मा'},
      {s:'तत्',r:'तत्',m:'ते — परम सत्य'},
      {s:'सवितुर्',r:'सवितुर्',m:'सवितृ, सूर्य देवतेचे'},
      {s:'वरेण्यं',r:'वरेण्यं',m:'सर्वाधिक वंदनीय, इष्ट'},
      {s:'भर्गो',r:'भर्गो',m:'तेज, दिव्य प्रकाश'},
      {s:'देवस्य',r:'देवस्य',m:'दिव्याचे, देवाचे'},
      {s:'धीमहि',r:'धीमहि',m:'आम्ही ध्यान करतो'},
      {s:'धियो',r:'धियो',m:'आमची बुद्धी, समज'},
      {s:'यो',r:'यो',m:'जो, जे'},
      {s:'नः',r:'नः',m:'आमचे, आमचे'},
      {s:'प्रचोदयात्',r:'प्रचोदयात्',m:'प्रेरणा द्यावी, प्रकाशित करावे'}]
  }
};

export default function App() {
  const [lang,setLang]=useState('en');
  const [mounted,setMounted]=useState(false);
  const [page,setPage]=useState('home');
  const [mob,setMob]=useState(false);
  const [modIdx,setModIdx]=useState(null);
  const [sylIdx,setSylIdx]=useState(null);
  const [form,setForm]=useState({name:'',email:''});
  const [done,setDone]=useState(false);
  const [med,setMed]=useState(false);
  const [cnt,setCnt]=useState(0);
  const [bp,setBp]=useState('inhale');
  const t1=useRef(null);const t2=useRef(null);
  const t=LANG[lang];

  useEffect(()=>{setMounted(true);},[]);
  useEffect(()=>{
    if(med){t1.current=setInterval(()=>setCnt(c=>c+1),4000);t2.current=setInterval(()=>setBp(p=>p==='inhale'?'hold':p==='hold'?'exhale':'inhale'),4000);}
    else{clearInterval(t1.current);clearInterval(t2.current);}
    return()=>{clearInterval(t1.current);clearInterval(t2.current);};
  },[med]);

  const go=(p)=>{setPage(p);setMob(false);setModIdx(null);setSylIdx(null);};
  const nc=(p)=>`cursor-pointer transition-colors duration-200 ${page===p?'text-amber-400':'text-white/55 hover:text-amber-300'}`;

  return(
    <div className="min-h-screen bg-[#060411] text-white overflow-x-hidden font-sans relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif{font-family:'Cinzel',serif}.font-sans{font-family:'Inter',sans-serif}
        .bbg{background:radial-gradient(circle at 50% 50%,#4b1b0b 0%,#1f0c24 35%,#060411 80%)}
        .ybg{background-image:url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg stroke='%23ffffff' stroke-opacity='0.04' stroke-width='1'%3E%3Cpath d='M40 0l40 80H0z'/%3E%3Cpath d='M40 80L0 0h80z'/%3E%3Ccircle cx='40' cy='40' r='30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");background-size:120px 120px}
        .gl{background:rgba(255,255,255,0.025);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);box-shadow:0 30px 60px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.07)}
        .sv{box-shadow:0 0 40px #fff7ed,0 0 100px #f59e0b,0 0 200px #ea580c,0 0 400px #9a3412,inset 0 0 50px #fffbeb}
        .gr{background:conic-gradient(from 0deg at 50% 50%,rgba(251,191,36,0) 0deg,rgba(251,191,36,0.15) 15deg,rgba(251,191,36,0) 30deg,rgba(251,191,36,0) 60deg,rgba(251,191,36,0.1) 75deg,rgba(251,191,36,0) 90deg,rgba(251,191,36,0) 120deg,rgba(251,191,36,0.2) 135deg,rgba(251,191,36,0) 150deg,rgba(251,191,36,0) 180deg,rgba(251,191,36,0.1) 195deg,rgba(251,191,36,0) 210deg,rgba(251,191,36,0) 240deg,rgba(251,191,36,0.15) 255deg,rgba(251,191,36,0) 270deg,rgba(251,191,36,0) 300deg,rgba(251,191,36,0.2) 315deg,rgba(251,191,36,0) 330deg,rgba(251,191,36,0) 360deg)}
        @keyframes scw{100%{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes sccw{100%{transform:translate(-50%,-50%) rotate(-360deg)}}
        @keyframes f1{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes f2{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes pg{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.05);opacity:1}}
        @keyframes brs{0%,100%{height:20%}50%{height:100%}}
        @keyframes fi{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bin{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.45);opacity:1}}
        @keyframes bhd{0%,100%{transform:scale(1.45);opacity:1}}
        @keyframes bot{0%{transform:scale(1.45);opacity:1}100%{transform:scale(1);opacity:.55}}
        .scw{animation:scw 80s linear infinite}.sccw{animation:sccw 120s linear infinite}
        .f1{animation:f1 8s ease-in-out infinite}.f2{animation:f2 10s ease-in-out infinite}
        .pg{animation:pg 4s ease-in-out infinite}.fi{animation:fi .6s ease-out forwards}
        .bin{animation:bin 4s ease-in-out forwards}.bhd{animation:bhd 4s ease-in-out forwards}.bot{animation:bot 4s ease-in-out forwards}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(251,191,36,.2);border-radius:10px}
      `}</style>

      <div className="fixed inset-0 bbg opacity-80 pointer-events-none z-0"/>
      <div className="fixed inset-0 ybg pointer-events-none z-0"/>
      <div className="fixed inset-0 bg-gradient-to-b from-transparent to-[#060411] pointer-events-none z-0"/>

      {/* Orb */}
      <div className={`fixed top-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square transition-all duration-1000 pointer-events-none z-0 ${mounted?'opacity-100':'opacity-0'} ${page==='home'?'left-1/2 -translate-x-1/2':'left-[88%] -translate-x-1/2 opacity-35 scale-75'}`}>
        <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] rounded-full gr sccw blur-xl"/>
        <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] rounded-full gr scw blur-md mix-blend-screen"/>
        <div className="absolute top-1/2 left-1/2 w-[80%] h-[80%] rounded-full scw">
          {ORBIT.map((s,i)=>{const r=(360/24)*i;return(<div key={i} className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 flex items-center justify-center" style={{transform:`rotate(${r}deg) translateY(-320px) rotate(-${r}deg)`}}><span className="font-serif text-xl text-amber-200/55 drop-shadow-[0_0_8px_rgba(251,191,36,.8)]">{s}</span></div>);})}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-orange-400 via-yellow-200 to-white sv pg"/>
      </div>

      {/* Mobile menu */}
      {mob&&(<div className="fixed inset-0 z-50 bg-[#060411]/96 backdrop-blur-xl flex flex-col items-center justify-center gap-6">
        <button onClick={()=>setMob(false)} className="absolute top-6 right-6 text-white/50 hover:text-white"><X className="w-7 h-7"/></button>
        {Object.entries(t.nav).map(([k,v])=>(<button key={k} onClick={()=>go(k)} className={`font-serif text-xl uppercase tracking-widest transition-colors ${page===k?'text-amber-400':'text-white/55 hover:text-amber-300'}`}>{v}</button>))}
        <button onClick={()=>setLang(l=>l==='en'?'mr':'en')} className="mt-3 flex items-center gap-2 gl px-5 py-2.5 rounded-full text-amber-300 text-sm uppercase tracking-widest"><Globe className="w-4 h-4"/>{t.toggle}</button>
      </div>)}

      {/* Syllable modal */}
      {sylIdx!==null&&(<div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/65 backdrop-blur-sm" onClick={()=>setSylIdx(null)}>
        <div className="gl rounded-3xl p-10 max-w-sm w-full fi text-center relative" onClick={e=>e.stopPropagation()}>
          <button onClick={()=>setSylIdx(null)} className="absolute top-5 right-5 text-white/35 hover:text-white"><X className="w-5 h-5"/></button>
          <div className="text-7xl font-serif text-amber-300 mb-3 drop-shadow-[0_0_20px_rgba(251,191,36,.6)]">{t.syl[sylIdx].s}</div>
          <div className="text-amber-500 text-sm mb-4 tracking-widest">{t.syl[sylIdx].r}</div>
          <p className="text-white/70 font-light text-lg leading-relaxed">{t.syl[sylIdx].m}</p>
        </div>
      </div>)}

      {/* Module modal */}
      {modIdx!==null&&(<div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/65 backdrop-blur-sm" onClick={()=>setModIdx(null)}>
        <div className="gl rounded-3xl p-8 max-w-lg w-full fi relative" onClick={e=>e.stopPropagation()}>
          <button onClick={()=>setModIdx(null)} className="absolute top-5 right-5 text-white/35 hover:text-white"><X className="w-5 h-5"/></button>
          {(()=>{const m=t.mod.items[modIdx];const c=CM[m.color];return(<>
            <div className={`inline-flex px-3 py-1 rounded-full border text-xs uppercase tracking-widest mb-4 ${c.border} ${c.text}`}>{m.ph}</div>
            <h3 className="font-serif text-2xl text-white mb-2">{m.title}</h3>
            <p className="text-white/45 text-sm mb-5 font-light">{m.desc}</p>
            <div className="space-y-2.5 mb-6">{m.lessons.map((l,i)=>(<div key={i} className="flex items-center gap-3 text-sm text-white/65"><div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.bg}`}/>{l}</div>))}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/30 uppercase tracking-widest">{t.mod.dur}: {m.dur}</span>
              {m.locked?<div className="flex items-center gap-2 text-white/30 text-xs"><Lock className="w-3.5 h-3.5"/>{t.mod.ua} {modIdx}</div>:<button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white bg-gradient-to-r from-amber-600 to-orange-500">{t.mod.begin}<ArrowRight className="w-3.5 h-3.5"/></button>}
            </div>
          </>);})()} 
        </div>
      </div>)}

      <div className="relative z-10 min-h-screen flex flex-col container mx-auto px-6 lg:px-12 py-8">

        {/* Nav */}
        <header className="flex items-center justify-between">
          <div onClick={()=>go('home')} className="flex items-center gap-3 cursor-pointer group">
            <Sun className="w-7 h-7 text-amber-400 group-hover:rotate-180 transition-transform duration-1000"/>
            <span className="font-serif text-xl lg:text-2xl tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-600 font-bold">{t.brand}</span>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-xs uppercase tracking-widest">
            {['philosophy','science','mantra','meditate','modules'].map(k=>(<a key={k} onClick={()=>go(k)} className={nc(k)}>{t.nav[k]}</a>))}
            <button onClick={()=>go('initiate')} className={`gl px-5 py-2 rounded-full hover:bg-amber-400/10 transition-all border-amber-400/30 ${page==='initiate'?'bg-amber-400/20 text-amber-200':'text-amber-300'}`}>{t.nav.initiate}</button>
            <button onClick={()=>setLang(l=>l==='en'?'mr':'en')} className="flex items-center gap-1.5 gl px-4 py-2 rounded-full text-amber-200 hover:bg-amber-400/10 transition-all font-medium"><Globe className="w-3.5 h-3.5"/>{t.toggle}</button>
          </nav>
          <button className="md:hidden text-white/60" onClick={()=>setMob(true)}><Menu className="w-6 h-6"/></button>
        </header>

        <div className="flex-1 flex flex-col justify-center py-10">

          {/* HOME */}
          {page==='home'&&(<main className="flex flex-col lg:flex-row items-center justify-between gap-10 fi w-full">
            <div className="w-full lg:w-1/3">
              <div className="gl rounded-3xl p-8 lg:p-10 f1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs uppercase tracking-widest mb-5"><Sparkles className="w-3 h-3"/>{t.home.badge}</div>
                <h1 className="font-serif text-4xl lg:text-5xl leading-tight mb-5">{t.home.title1}<br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-500">{t.home.title2}</span></h1>
                <p className="text-white/55 leading-relaxed mb-7 font-light text-sm">{t.home.desc}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={()=>go('initiate')} className="group flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-[0_0_25px_rgba(217,119,6,.45)] transition-all text-sm">{t.home.cta}<ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></button>
                  <button onClick={()=>go('meditate')} className="gl px-6 py-3 rounded-full text-amber-300 hover:bg-amber-400/10 transition-all text-sm">{t.home.cta2}</button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              <div className="gl rounded-3xl p-5 f2">
                <div className="flex items-center justify-between mb-4"><h3 className="font-serif text-sm text-amber-100">{t.home.resTitle}</h3><Activity className="w-4 h-4 text-amber-500"/></div>
                <div className="h-24 flex items-end justify-between gap-0.5 mb-2 border-b border-white/10 pb-2">
                  {[...Array(24)].map((_,i)=>(<div key={i} className="w-full bg-gradient-to-t from-amber-600/20 to-amber-300/80 rounded-t-sm" style={{height:`${Math.sin(i*.8)*35+50}%`,animation:`brs ${1.5+(i%5)*.3}s ease-in-out infinite`,animationDelay:`${i*.06}s`}}/>))}
                </div>
                <div className="flex justify-between text-xs text-white/35 uppercase tracking-widest"><span>108 Hz</span><span className="text-amber-400/50">{t.home.sync}</span><span>432 Hz</span></div>
              </div>
              <div className="gl rounded-3xl p-5 f1" style={{animationDelay:'-4s'}}>
                <h3 className="font-serif text-sm text-amber-100 mb-4">{t.home.qaTitle}</h3>
                <div className="flex flex-col gap-2.5">
                  {t.home.qa.map((item,i)=>(<div key={i} onClick={()=>go(item.p)} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-pointer group">
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">{i===0?<BookOpen className="w-3.5 h-3.5"/>:i===1?<Wind className="w-3.5 h-3.5"/>:<LayoutGrid className="w-3.5 h-3.5"/>}</div>
                    <div><div className="text-xs font-medium text-white/80">{item.t}</div><div className="text-xs text-white/30">{item.s}</div></div>
                    <ArrowRight className="w-3 h-3 text-white/15 group-hover:text-amber-400 ml-auto transition-colors"/>
                  </div>))}
                </div>
              </div>
            </div>
          </main>)}

          {/* PHILOSOPHY */}
          {page==='philosophy'&&(<main className="fi w-full lg:w-1/2">
            <div className="gl rounded-3xl p-8 lg:p-12 f1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"/>
              <Feather className="w-8 h-8 text-amber-400 mb-5"/>
              <h2 className="font-serif text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-500 mb-7">{t.phi.title}</h2>
              <div className="space-y-4 text-white/65 leading-relaxed font-light text-sm">
                {t.phi.paras.map((p,i)=>i===t.phi.qi?<blockquote key={i} className="border-l-2 border-amber-500/50 pl-6 py-1 my-1 text-amber-100/80 italic text-base font-serif">{p}</blockquote>:<p key={i}>{p}</p>)}
              </div>
              <button onClick={()=>go('science')} className="mt-7 group flex items-center gap-2 text-amber-400 text-sm hover:text-amber-300 transition-colors">{t.phi.cta}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></button>
            </div>
          </main>)}

          {/* SCIENCE */}
          {page==='science'&&(<main className="fi w-full lg:w-1/2">
            <div className="gl rounded-3xl p-8 lg:p-12 f2">
              <div className="flex items-center gap-4 mb-7"><Atom className="w-8 h-8 text-amber-400"/><h2 className="font-serif text-3xl lg:text-4xl text-amber-100">{t.sci.title}</h2></div>
              <div className="grid grid-cols-2 gap-3 mb-7">
                {t.sci.stats.map((s,i)=>(<div key={i} className="bg-black/20 rounded-2xl p-4 border border-white/5"><div className="text-amber-500 text-xs uppercase tracking-widest mb-1">{s.l}</div><div className="text-2xl font-serif text-white mb-1">{s.v} <span className="text-base text-white/35">{s.u}</span></div><div className="text-xs text-white/30">{s.s}</div></div>))}
              </div>
              <div className="text-white/60 leading-relaxed font-light space-y-3 text-sm">{t.sci.paras.map((p,i)=><p key={i}>{p}</p>)}</div>
              <button onClick={()=>go('mantra')} className="mt-6 group flex items-center gap-2 text-amber-400 text-sm hover:text-amber-300 transition-colors">{t.sci.cta}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></button>
            </div>
          </main>)}

          {/* MANTRA */}
          {page==='mantra'&&(<main className="fi w-full lg:w-[62%]">
            <div className="mb-5"><h2 className="font-serif text-3xl lg:text-4xl text-amber-100 mb-1">{t.man.title}</h2><p className="text-white/35 font-light text-xs uppercase tracking-widest">{t.man.sub}</p></div>
            <div className="gl rounded-3xl p-6 lg:p-8 mb-5 text-center">
              <div className="font-serif text-xl lg:text-2xl text-amber-100 leading-loose tracking-wide mb-3">ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं<br/>भर्गो देवस्य धीमहि<br/>धियो यो नः प्रचोदयात्</div>
              <div className="text-white/30 text-xs uppercase tracking-widest">{t.man.full}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
              {t.syl.map((item,i)=>(<button key={i} onClick={()=>setSylIdx(i)} className="gl rounded-2xl p-4 text-center hover:bg-amber-500/10 hover:border-amber-500/20 transition-all group">
                <div className="font-serif text-2xl text-amber-300 mb-1 group-hover:drop-shadow-[0_0_10px_rgba(251,191,36,.8)] transition-all">{item.s}</div>
                <div className="text-xs text-white/35 truncate">{item.r}</div>
              </button>))}
            </div>
          </main>)}

          {/* MEDITATE */}
          {page==='meditate'&&(<main className="fi w-full lg:w-1/2">
            <div className="gl rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none"/>
              <Moon className="w-7 h-7 text-amber-400 mx-auto mb-3"/>
              <h2 className="font-serif text-2xl lg:text-3xl text-amber-100 mb-1">{t.med.title}</h2>
              <p className="text-white/35 font-light text-xs uppercase tracking-widest mb-9">{t.med.sub}</p>
              <div className="relative flex items-center justify-center mb-9 h-44">
                <div className={`w-32 h-32 rounded-full bg-gradient-to-tr from-orange-600/40 via-amber-400/40 to-yellow-200/40 border border-amber-400/25 ${med?(bp==='inhale'?'bin':bp==='hold'?'bhd':'bot'):''}`} style={{boxShadow:med?'0 0 50px rgba(251,191,36,.25)':'none'}}/>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-serif text-amber-200 text-base">{med?t.med.ph[bp]:t.med.ready}</div>
                  {med&&<div className="text-amber-400/50 text-xs mt-1">{t.med.cl}: {cnt}</div>}
                </div>
              </div>
              <button onClick={()=>{setMed(a=>!a);if(med){setCnt(0);setBp('inhale');}}} className={`flex items-center gap-3 mx-auto px-8 py-3.5 rounded-full font-medium text-sm transition-all mb-7 ${med?'bg-white/10 border border-white/15 text-white/60 hover:bg-white/15':'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-[0_0_25px_rgba(217,119,6,.4)]'}`}>
                {med?<><VolumeX className="w-4 h-4"/>{t.med.end}</>:<><Volume2 className="w-4 h-4"/>{t.med.begin}</>}
              </button>
              <div className="grid grid-cols-3 gap-3">
                {t.med.bl.map((label,i)=>(<div key={i} className="bg-black/20 rounded-xl p-3 border border-white/5"><div className="text-amber-500/60 text-xs uppercase tracking-widest mb-1">{label}</div><div className="font-serif text-white text-base">{t.med.bv[i]}</div></div>))}
              </div>
            </div>
          </main>)}

          {/* MODULES */}
          {page==='modules'&&(<main className="fi w-full lg:w-[62%]">
            <div className="flex items-start justify-between mb-7"><div><h2 className="font-serif text-3xl lg:text-4xl text-amber-100 mb-1">{t.mod.title}</h2><p className="text-white/35 font-light text-xs">{t.mod.sub}</p></div><LayoutGrid className="w-7 h-7 text-amber-500/35 mt-1"/></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.mod.items.map((m,i)=>{const c=CM[m.color];return(
                <button key={i} onClick={()=>setModIdx(i)} className={`gl rounded-3xl p-6 text-left hover:bg-white/[0.03] transition-all ${c.glow} ${m.locked?'opacity-55':''} w-full`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2.5 rounded-xl ${c.bg} ${c.text}`}>{m.icon==='book'&&<BookOpen className="w-5 h-5"/>}{m.icon==='activity'&&<Activity className="w-5 h-5"/>}{m.icon==='moon'&&<Moon className="w-5 h-5"/>}{m.icon==='star'&&<Star className="w-5 h-5"/>}</div>
                    <div className="flex items-center gap-1.5">{m.locked&&<Lock className="w-3 h-3 text-white/25"/>}<span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${c.border} ${c.text}`}>{m.ph}</span></div>
                  </div>
                  <h3 className="text-base font-serif text-white mb-1">{m.title}</h3>
                  <p className="text-white/35 text-xs mb-3 font-light">{m.desc}</p>
                  <div className={`text-xs uppercase tracking-widest flex items-center gap-1.5 ${c.text}`}>{m.locked?t.mod.locked:t.mod.view}<ArrowRight className="w-3 h-3"/></div>
                </button>
              );})}
            </div>
          </main>)}

          {/* INITIATE */}
          {page==='initiate'&&(<main className="fi w-full lg:w-1/2">
            {done?(<div className="gl w-full max-w-lg rounded-3xl p-10 text-center fi border-amber-500/20">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-5"><Sun className="w-7 h-7 text-amber-400"/></div>
              <h2 className="font-serif text-2xl text-amber-100 mb-2">{t.ini.wt} {form.name}</h2>
              <p className="text-white/45 font-light text-sm mb-7">{t.ini.wd}</p>
              <button onClick={()=>go('modules')} className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-7 py-3 rounded-full font-medium text-sm hover:shadow-[0_0_20px_rgba(217,119,6,.4)] transition-all">{t.ini.wc}</button>
            </div>):(<div className="gl w-full max-w-lg rounded-3xl p-8 lg:p-11 f1 relative overflow-hidden border-amber-500/20">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-40"/>
              <div className="text-center mb-7"><Sparkle className="w-8 h-8 text-amber-400 mx-auto mb-3"/><h2 className="font-serif text-2xl lg:text-3xl text-amber-100 mb-1">{t.ini.title}</h2><p className="text-white/35 font-light text-xs">{t.ini.sub}</p></div>
              <div className="flex flex-col gap-4">
                <div className="space-y-1.5"><label className="text-xs uppercase tracking-widest text-amber-500/70 ml-1">{t.ini.nl}</label><input type="text" placeholder={t.ini.np} value={form.name} onChange={e=>setForm(d=>({...d,name:e.target.value}))} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400/50 focus:bg-white/5 transition-all placeholder:text-white/20"/></div>
                <div className="space-y-1.5"><label className="text-xs uppercase tracking-widest text-amber-500/70 ml-1">{t.ini.el}</label><input type="email" placeholder={t.ini.ep} value={form.email} onChange={e=>setForm(d=>({...d,email:e.target.value}))} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400/50 focus:bg-white/5 transition-all placeholder:text-white/20"/></div>
                <button onClick={()=>{if(form.name&&form.email)setDone(true);}} className="mt-1 group bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3.5 rounded-xl font-medium text-sm hover:shadow-[0_0_20px_rgba(217,119,6,.4)] transition-all flex items-center justify-center gap-3">{t.ini.submit}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></button>
              </div>
            </div>)}
          </main>)}

        </div>
        <footer className="text-center text-white/20 text-xs tracking-widest font-light uppercase">{t.footer}</footer>
      </div>
    </div>
  );
}
