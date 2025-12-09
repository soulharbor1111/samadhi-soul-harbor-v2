"use client";

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, ShoppingBag, PenTool, Waves, Clock, 
  Menu, X, Trash2, ChevronRight, Lock, Star
} from 'lucide-react';

// --- 元件：漂浮符號 (背景特效) ---
const FloatingSymbols = () => {
  const symbols = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    isStar: Math.random() > 0.9,
    size: Math.random() * 8 + 4 + 'px',
    delay: Math.random() * 5 + 's',
    duration: Math.random() * 20 + 20 + 's',
    opacity: Math.random() * 0.4 + 0.1
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes float-drift {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-30px, -50px); }
          100% { transform: translate(0, 0); }
        }
        .animate-drift {
          animation: float-drift infinite ease-in-out;
        }
      `}</style>
      
      {symbols.map((s) => (
        <div 
          key={s.id}
          className="absolute animate-drift transition-all duration-1000"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            animationDuration: s.duration,
            opacity: s.opacity
          }}
        >
          {s.isStar ? (
            <div className="relative text-[#E2852E]/60 drop-shadow-[0_0_8px_rgba(226,133,46,0.6)] animate-pulse">
              <Star size={16} strokeWidth={1.5} />
            </div>
          ) : (
            <div 
              className="rounded-full bg-amber-50/40 blur-[1px] animate-pulse"
              style={{ 
                width: s.size, 
                height: s.size, 
                boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.2)',
                animationDuration: '4s'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// --- 元件：開場動畫 ---
const IntroAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // === 重新編排的時間軸 ===
    setTimeout(() => setStage(1), 500);   // 光點 -> 光絲
    setTimeout(() => setStage(2), 2000);  // 光絲 -> 光幕
    setTimeout(() => setStage(3), 4500);  // 光幕淡去 (Logo 此時不出現)
    
    // --- 詩句階段 ---
    setTimeout(() => setStage(4), 7000);  // 閉上眼...
    setTimeout(() => setStage(4.1), 10000); // 時間/空間...
    setTimeout(() => setStage(4.2), 13000); // 穿越...
    
    // --- 核心轉化 (文字) ---
    setTimeout(() => setStage(5), 17000); // 金色核心文字
    
    // --- 覺醒時刻 (戲劇性轉折) ---
    setTimeout(() => setStage(6), 22000); // 所有文字消失，Logo 浮現
    setTimeout(() => setStage(7), 25000); // 按鈕浮現
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-2000 bg-black">
      
      <style>{`
        @keyframes earthPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-earth-pulse {
          animation: earthPulse 8s infinite ease-in-out;
        }
      `}</style>
      
      {/* 背景特效 */}
      <div className="absolute inset-0 z-0 animate-earth-pulse pointer-events-none">
         <FloatingSymbols />
      </div>

      {/* --- 光的儀式 --- */}
      <div 
        className={`absolute bg-white/90 transition-all duration-[1500ms] ease-in-out z-10 rounded-full
          ${stage === 0 ? 'w-1 h-1 opacity-0 blur-[2px]' : ''}
          ${stage === 1 ? 'w-[90vw] h-[1px] opacity-70 blur-[1px]' : ''} 
          ${stage >= 2 ? 'opacity-0' : ''} 
        `}
        style={{ 
          boxShadow: stage === 1 ? '0 0 15px 2px rgba(255, 255, 255, 0.6)' : 'none',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      <div 
        className={`absolute w-full bg-gradient-to-b from-transparent via-white/15 to-transparent transition-all duration-[2000ms] ease-in-out z-10
          ${stage === 2 ? 'h-[120vh] opacity-100' : 'h-0 opacity-0'}
          ${stage >= 3 ? 'opacity-0' : ''}
        `}
        style={{ 
          top: '50%',
          transform: 'translateY(-50%)',
          backdropFilter: 'blur(5px)'
        }}
      />

      {/* --- 內容區域 (Flex 置中) --- */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-lg h-screen animate-earth-pulse">
        
        {/* 舞台區：Logo 與文字的切換 */}
        <div className="relative w-full h-80 flex flex-col items-center justify-center">
          
          {/* A. 文字組：包含詩句與金色字 (在 stage 6 消失) */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-[3000ms]
            ${stage >= 4 && stage < 6 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-sm pointer-events-none'}`}>
            
            {/* 詩句 */}
            <div className="flex flex-col items-center font-serif text-stone-300 text-base md:text-lg leading-loose tracking-[0.2em] mb-12">
              <p className={`transition-all duration-[2000ms] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                閉上眼，深呼吸...
              </p>
              <div className={`mt-4 flex flex-col items-center gap-2 transition-all duration-[2000ms] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] ${stage >= 4.1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p>時間在此彎曲</p>
                <p>空間在此融合</p>
              </div>
              <p className={`mt-4 transition-all duration-[2000ms] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] ${stage >= 4.2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                穿越光與影的邊界...
              </p>
            </div>

            {/* 金色核心文字 */}
            <div className={`flex flex-col items-center font-serif text-sm md:text-base tracking-[0.4em] leading-relaxed transition-all duration-[3000ms]
              ${stage === 5 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-sm'}`}
              style={{ color: '#E2852E' }}
            >
              <p className="mb-4 drop-shadow-[0_0_20px_rgba(226,133,46,0.9)]">收束一切</p>
              <p className="drop-shadow-[0_0_20px_rgba(226,133,46,0.9)]">回歸我的內在核心意識</p>
            </div>
          </div>

          {/* B. Logo 組：在 stage 6 浮現 */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-[4000ms] ease-out
            ${stage >= 6 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-90 blur-md pointer-events-none'}`}>
            <img 
              src="/logo.png" 
              alt="Samadhi Soul Harbor" 
              className="w-40 h-40 md:w-64 md:h-64 object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.5)]"
            />
          </div>

        </div>

        {/* 按鈕組：在 stage 7 浮現於舞台下方 */}
        <div className={`mt-12 transition-all duration-[3000ms] ${stage >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          <button 
            onClick={onComplete}
            className="group relative px-16 py-4 text-base tracking-[0.3em] text-white border border-amber-200/20 rounded-full 
              bg-transparent hover:bg-white/5 transition-all duration-1000 overflow-visible"
          >
            <span className="relative z-10 group-hover:text-amber-100 transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] font-serif">我醒了</span>
            <div className="absolute inset-0 rounded-full bg-[#E2852E]/30 blur-2xl animate-breathe z-0 mix-blend-screen"></div>
          </button>
        </div>

      </div>
      
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        .animate-breathe {
          animation: breathe 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

// --- 元件：部落格 ---
const Blog = () => (
  <div className="max-w-4xl mx-auto p-6 animate-fade-in relative z-10">
    <h2 className="text-3xl font-serif text-amber-50 mb-8 border-b border-amber-500/30 pb-4">靈性旅程 Blog</h2>
    <div className="grid gap-8">
      {[1, 2, 3].map(i => (
        <article key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
          <div className="flex justify-between text-xs text-stone-400 mb-2">
            <span className="bg-amber-500/20 px-2 py-1 rounded text-amber-200">靈性旅程</span>
            <span>2023-10-15</span>
          </div>
          <h3 className="text-xl font-medium text-amber-50 mb-2">意識擴張的旅程：從內在開始 #{i}</h3>
          <p className="text-stone-300 mb-4 font-light">這是一篇範例文章，當我們連結了資料庫後，這裡將會顯示您真實撰寫的靈性智慧...</p>
          <button className="text-amber-400 text-sm flex items-center gap-1 hover:text-amber-300">閱讀更多 <ChevronRight size={14}/></button>
        </article>
      ))}
    </div>
  </div>
);

// --- 元件：商店 ---
const Shop = ({ addToCart }) => (
  <div className="max-w-6xl mx-auto p-6 animate-fade-in relative z-10">
    <h2 className="text-3xl font-serif text-amber-50 mb-8 border-b border-amber-500/30 pb-4">靈魂選物 Shop</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {['水晶能量組', '覺醒課程', '捕夢網', '精油'].map((item, i) => (
        <div key={i} className="bg-white/5 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all group cursor-pointer">
          <div className="h-48 bg-black/40 flex items-center justify-center text-stone-500">
            [商品圖片]
          </div>
          <div className="p-4">
            <h3 className="font-medium text-lg text-amber-50 mb-2">{item}</h3>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-amber-200/80">NT$ 1,280</span>
              <button onClick={() => addToCart(item)} className="bg-amber-600/80 text-white px-3 py-1.5 rounded text-sm hover:bg-amber-600 transition-all">加入</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- 主程式 ---
export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`已將 ${item} 加入靈魂行囊`);
  };

  const NavItem = ({ target, icon: Icon, label }) => (
    <button 
      onClick={() => { setView(target); setIsMenuOpen(false); }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${view === target ? 'bg-white/10 text-amber-50' : 'text-stone-400 hover:text-amber-100'}`}
    >
      <Icon size={16} /> <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-stone-200 font-sans selection:bg-amber-900/50">
      
      {showIntro ? (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      ) : (
        <div className="animate-[fadeIn_2s_ease-out] relative z-10">
          <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain invert brightness-200" />
                <span className="font-serif font-bold text-lg hidden md:block text-amber-50 tracking-widest">SAMADHI SOUL HARBOR</span>
              </div>

              <div className="hidden md:flex items-center gap-2">
                <NavItem target="blog" icon={BookOpen} label="部落格" />
                <NavItem target="shop" icon={ShoppingBag} label="商店" />
                <div className="h-4 w-px bg-white/20 mx-2"></div>
                <NavItem target="diary" icon={PenTool} label="日記" />
                <NavItem target="drift" icon={Waves} label="漂流瓶" />
                <NavItem target="capsule" icon={Clock} label="平行時空" />
              </div>

              <div className="flex items-center gap-4">
                <div className="relative p-2 text-stone-300">
                  <ShoppingBag size={20} />
                  {cart.length > 0 && <span className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>}
                </div>
                <button className="md:hidden text-stone-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </nav>

          {isMenuOpen && (
            <div className="md:hidden bg-stone-900 border-b border-white/10 p-4 flex flex-col gap-2">
              <NavItem target="blog" icon={BookOpen} label="部落格" />
              <NavItem target="shop" icon={ShoppingBag} label="商店" />
            </div>
          )}

          <main className="min-h-[80vh] relative">
            {view === 'home' && (
              <div className="relative h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden">
                 <div className="relative z-10 max-w-2xl animate-[fadeInUp_1.5s_ease-out]">
                   <style>{`
                     @keyframes deepBreath {
                       0%, 100% { transform: scale(1); opacity: 0.9; }
                       50% { transform: scale(1.05); opacity: 1; filter: drop-shadow(0 0 15px rgba(226,133,46,0.5)); }
                     }
                   `}</style>
                   <img 
                     src="/logo.png" 
                     alt="Logo" 
                     className="w-32 h-32 mx-auto mb-8 object-contain"
                     style={{ animation: 'deepBreath 6s infinite ease-in-out' }} 
                   />
                   <h1 className="text-4xl md:text-6xl font-serif text-amber-50 mb-8 leading-tight tracking-wider drop-shadow-lg">
                     在寧靜中<br/>找回靈魂的頻率
                   </h1>
                   <div className="flex gap-4 justify-center">
                     <button onClick={() => setView('blog')} className="px-8 py-3 border border-amber-500/50 text-amber-100 rounded-full hover:bg-amber-500/10 transition-all tracking-widest">開始旅程</button>
                   </div>
                 </div>
              </div>
            )}
            
            {view === 'blog' && <Blog />}
            {view === 'shop' && <Shop addToCart={addToCart} />}
            
            {['diary', 'drift', 'capsule'].includes(view) && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-stone-500">
                <Lock size={48} className="mb-4 opacity-50" />
                <h3 className="text-xl font-medium mb-2 text-stone-400">功能建置中</h3>
                <p>我們將在第三章連結 Firebase 資料庫後解鎖此功能。</p>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}