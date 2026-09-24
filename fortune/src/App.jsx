import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Scroll, RefreshCw, Flame, Award, Heart, Briefcase, BookOpen, Volume2, VolumeX, History, Sun, Moon } from 'lucide-react';

const FORTINES = [
  {
    id: 1,
    number: "第一番",
    luck: "大吉",
    luckColor: "text-red-700 bg-red-50 border-red-300 shadow-red-200",
    poem: "春風吹くれば 花ぞ咲きぬる 神の恵みの一番札",
    general: "身に余る光栄と幸福が訪れる時です。何事も誠心誠意取り組めば、必ず大きな実を結びます。",
    wishes: "思いのままに叶うでしょう。ただし油断大敵、謙虚さを忘れないこと。",
    business: "大いに繁盛します。新しい挑戦も吉と出ます。",
    love: "良縁に恵まれます。今いる大切な人とさらに絆が深まります。",
    health: "気力充実し、心身ともに健やかに過ごせます。"
  },
  {
    id: 2,
    number: "第二番",
    luck: "吉",
    luckColor: "text-amber-700 bg-amber-50 border-amber-300 shadow-amber-200",
    poem: "雲のまから 月の光のさし出づるごとく、心晴れゆく運なり",
    general: "これまでの苦労が報われ、徐々に運気が上昇します。焦らず着実に歩みを進めましょう。",
    wishes: "叶うまでに少し時間を要しますが、焦らなければ成就します。",
    business: "着実な進展が見込めます。地道な努力が評価されるでしょう。",
    love: "誠実な態度が相手の心を打ちます。焦らずゆっくり育んで。",
    health: "無理は禁物ですが、休養をとれば快方に向かいます。"
  },
  {
    id: 3,
    number: "第三番",
    luck: "中吉",
    luckColor: "text-emerald-700 bg-emerald-50 border-emerald-300 shadow-emerald-200",
    poem: "青柳に うぐいす鳴きて 春の日の のどけき里の心地こそすれ",
    general: "平穏無事で穏やかな幸運に満ちた時期です。日常の小さな幸せに感謝しましょう。",
    wishes: "思わぬところから協力者が現れ、スムーズに叶います。",
    business: "現状維持を大切にしつつ、安定した成果を上げられます。",
    love: "穏やかで温かい関係が続きます。感謝の言葉を伝えましょう。",
    health: "バランスの良い食事と適度な運動でさらに調子が上がります。"
  },
  {
    id: 4,
    number: "第四番",
    luck: "小吉",
    luckColor: "text-blue-700 bg-blue-50 border-blue-300 shadow-blue-200",
    poem: "舟を浮けて 風を待つ身の しずけさに 岸の柳も緑そふなり",
    general: "準備を万全にしてチャンスを待つ時です。急がば回れの精神が幸運を呼び込みます。",
    wishes: "時機を待てば叶います。今は下準備に徹しましょう。",
    business: "大きな投資や変更は控え、足元を固めるのが吉です。",
    love: "相手の気持ちに寄り添うことで、距離がグッと縮まります。",
    health: "睡眠をしっかりと取り、疲れを溜めないようにしましょう。"
  },
  {
    id: 5,
    number: "第五番",
    luck: "末吉",
    luckColor: "text-purple-700 bg-purple-50 border-purple-300 shadow-purple-200",
    poem: "冬枯れの 木の間に見ゆる 梅の花 ほのかに香りて 春を告ぐるも",
    general: "苦難の後に希望の光が見えてきます。困難を恐れず、前向きな心を保ち続けましょう。",
    wishes: "遅れはしますが、誠実に取り組めばやがて叶います。",
    business: "忍耐が必要な場面がありますが、誠実さが信頼を生みます。",
    love: "小さなすれ違いに注意。優しく包み込む心を持ちましょう。",
    health: "冷えや季節の変わり目の体調管理に十分注意してください。"
  },
  {
    id: 6,
    number: "第六番",
    luck: "凶",
    luckColor: "text-slate-700 bg-slate-100 border-slate-400 shadow-slate-200",
    poem: "あらし吹く 世にも動かぬ 岩の上の 松の緑のいろ変らぬかな",
    general: "思わぬ障壁や試練が訪れるかもしれません。しかし、これに屈せず心を強く持てば吉に転じます。",
    wishes: "今は叶いにくい時期です。計画の練り直しをおすすめします。",
    business: "慎重な判断が求められます。軽率な行動は慎みましょう。",
    love: "相手を思いやる気持ちを忘れずに。言葉選びに気を配って。",
    health: "無理をせず、早めの休息とリフレッシュを心がけましょう。"
  }
];

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }
  playWoodShake() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }
  playBell() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gain.gain.setValueAtTime(0.15, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 1.2);
    });
  }
}
const sfx = new SoundEffects();

export default function App() {
  const [step, setStep] = useState('idle'); // 'idle' | 'shaking' | 'revealing' | 'revealed'
  const [drawnFortune, setDrawnFortune] = useState(null);
  const [drawnStickNumber, setDrawnStickNumber] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ambientLight, setAmbientLight] = useState('night'); // 'night' | 'sunset' | 'lantern'
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    sfx.enabled = soundEnabled;
  }, [soundEnabled]);

  // Daikichi particle shower trigger
  useEffect(() => {
    if (step === 'revealed' && drawnFortune?.luck === '大吉') {
      const newParticles = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 50,
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * 3 + 2,
        color: ['#fef08a', '#fde047', '#eab308', '#ffffff'][Math.floor(Math.random() * 4)],
        rotation: Math.random() * 360
      }));
      setParticles(newParticles);
      sfx.playBell();
    }
  }, [step, drawnFortune]);

  const drawOmikuji = () => {
    if (step === 'shaking' || step === 'revealing') return;
    setStep('shaking');
    setDrawnStickNumber(null);
    setDrawnFortune(null);

    // Simulate rhythmic shaking sound & movement
    let shakes = 0;
    const shakeInterval = setInterval(() => {
      sfx.playWoodShake();
      shakes++;
      if (shakes > 12) {
        clearInterval(shakeInterval);
        setStep('revealing');
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * FORTINES.length);
          const selected = FORTINES[randomIndex];
          setDrawnStickNumber(selected.number);
          setDrawnFortune(selected);
          setStep('revealed');
          setHistory(prev => [selected, ...prev.slice(0, 14)]);
        }, 800);
      }
    }, 180);
  };

  const resetApp = () => {
    setStep('idle');
    setDrawnFortune(null);
    setDrawnStickNumber(null);
    setParticles([]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 flex flex-col items-center justify-between p-4 sm:p-6 font-serif relative overflow-x-hidden selection:bg-amber-700 selection:text-white ${
      ambientLight === 'night' ? 'bg-stone-950 text-stone-100' :
      ambientLight === 'sunset' ? 'bg-[#2b1810] text-amber-50' : 'bg-[#1c1917] text-stone-200'
    }`}>
      {/* Background Shrine Atmosphere Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px]"></div>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
        ambientLight === 'night' ? 'bg-indigo-950/30' :
        ambientLight === 'sunset' ? 'bg-amber-900/30' : 'bg-yellow-600/20'
      }`}></div>

      {/* Daikichi Particles */}
      {particles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {particles.map(p => (
            <div
              key={p.id}
              className="absolute animate-ping rounded-full opacity-80"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                animationDuration: `${Math.random() * 2 + 1}s`
              }}
            />
          ))}
        </div>
      )}

      {}
      <header className="w-full max-w-xl py-3 z-20 flex items-center justify-between border-b border-stone-800/80">
        <div className="flex items-center gap-2 text-amber-400">
          <Scroll className="w-5 h-5" />
          <span className="text-xs tracking-widest uppercase font-semibold">鎮守神社・おみくじ授与所</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full bg-stone-900 border border-stone-700 hover:border-amber-500 text-amber-400 transition-all cursor-pointer"
            title={soundEnabled ? "音声ON" : "音声OFF"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          </button>
          <button 
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-amber-300 bg-stone-900 border border-stone-700 hover:border-amber-500 px-3 py-1.5 rounded-full transition-all cursor-pointer shadow"
          >
            <History className="w-3.5 h-3.5 text-amber-400" />
            <span>神籤帳 ({history.length})</span>
          </button>
        </div>
      </header>

      {}
      <main className="w-full max-w-xl flex-1 flex flex-col items-center justify-center py-6 z-10">
        
        {/* State 1: Idle - Ready to draw */}
        {step === 'idle' && (
          <div className="flex flex-col items-center text-center animate-fade-in w-full">
            <div className="mb-8 relative group cursor-pointer" onClick={drawOmikuji}>
              {/* 3D Styled Wooden Hexagonal Cylinder */}
              <div className="w-52 h-72 sm:w-60 sm:h-80 bg-gradient-to-r from-amber-950 via-amber-900 to-yellow-950 rounded-2xl shadow-2xl border-4 border-amber-700/80 flex flex-col items-center justify-between py-6 relative overflow-hidden transition-transform duration-300 hover:scale-[1.03]">
                {/* Brass Gold Seal / Emblem */}
                <div className="w-16 h-16 rounded-full border-2 border-amber-400/80 bg-amber-950 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-amber-300 text-xs font-bold">参拝</span>
                  <span className="text-amber-400 text-lg font-black tracking-widest">神籤</span>
                </div>

                {/* Stick openings with protruding wooden sticks */}
                <div className="w-36 h-8 bg-stone-950 rounded-lg border border-amber-800 flex justify-around items-center px-3 shadow-inner">
                  <div className="w-2.5 h-14 bg-amber-200 rounded-t transform -rotate-12 shadow-md"></div>
                  <div className="w-2.5 h-16 bg-amber-100 rounded-t transform rotate-6 shadow-md -mt-2"></div>
                  <div className="w-2.5 h-12 bg-amber-300 rounded-t shadow-md"></div>
                  <div className="w-2.5 h-15 bg-amber-200 rounded-t transform rotate-12 shadow-md -mt-1"></div>
                </div>

                <div className="text-amber-400/80 text-xs tracking-widest font-medium bg-amber-950/60 px-3 py-1 rounded border border-amber-800/50">
                  筒を振っておみくじを引く
                </div>
              </div>
            </div>

            <p className="text-stone-300 text-sm sm:text-base mb-6 tracking-wide max-w-md px-4">
              心を無にし、本日の運命の御神籤をお引きください。
            </p>

            <button
              onClick={drawOmikuji}
              className="px-9 py-4 bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-700 hover:from-amber-600 hover:to-yellow-600 text-amber-50 font-bold rounded-xl shadow-xl border border-amber-400/50 tracking-widest text-lg transition-all duration-300 transform active:scale-95 flex items-center gap-3 cursor-pointer group"
            >
              <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
              おみくじを引く
            </button>
          </div>
        )}

        {/* State 2 & 3: Shaking / Revealing Cylinder Animation */}
        {(step === 'shaking' || step === 'revealing') && (
          <div className="flex flex-col items-center text-center animate-fade-in w-full">
            <div className="mb-8 relative">
              <div className={`w-52 h-72 sm:w-60 sm:h-80 bg-gradient-to-r from-amber-950 via-amber-900 to-yellow-950 rounded-2xl shadow-2xl border-4 border-amber-700/80 flex flex-col items-center justify-between py-6 relative overflow-hidden ${
                step === 'shaking' ? 'animate-[bounce_0.25s_infinite]' : 'animate-pulse'
              }`}>
                <div className="w-16 h-16 rounded-full border-2 border-amber-400/80 bg-amber-950 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-amber-300 text-xs font-bold">祈願</span>
                  <span className="text-amber-400 text-lg font-black tracking-widest">神籤</span>
                </div>
                {/* Popping Stick */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-4 h-32 bg-amber-200 rounded-t-md shadow-2xl border border-amber-400 flex flex-col items-center justify-end pb-2 animate-bounce">
                  <span className="text-[10px] text-amber-950 font-bold">籤</span>
                </div>
                <div className="w-36 h-8 bg-stone-950 rounded-lg border border-amber-800 flex justify-around items-center px-3">
                  <div className="w-2.5 h-16 bg-amber-100 rounded-t shadow-md animate-pulse"></div>
                  <div className="w-2.5 h-14 bg-amber-300 rounded-t shadow-md"></div>
                </div>
              </div>
            </div>
            <p className="text-amber-300 text-lg font-medium tracking-widest animate-pulse">
              {step === 'shaking' ? 'しゃかしゃか…… 神職が筒を振っています…' : 'おみくじの籤が出てきました…！'}
            </p>
          </div>
        )}

        {/* State 4: Revealed - Gorgeous Parchment Slip with Folding effect */}
        {step === 'revealed' && drawnFortune && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            {/* Drawn Stick Badge */}
            <div className="mb-4 inline-flex items-center gap-2 bg-amber-950/90 border border-amber-500/60 px-5 py-2 rounded-full text-amber-200 text-sm tracking-widest shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              お引き当て： <strong className="text-white text-base font-bold">{drawnStickNumber}</strong>
            </div>

            {/* Antique Omikuji Paper Scroll Container */}
            <div className="w-full max-w-md bg-[#fefbe9] text-stone-900 rounded-2xl shadow-2xl border-[6px] border-[#3b2716] p-6 sm:p-8 relative overflow-hidden my-2 transform transition-all duration-700 animate-fade-in">
              {/* Corner ornamental decorations */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-amber-900"></div>
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-amber-900"></div>
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-amber-900"></div>
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-amber-900"></div>

              {/* Top Banner: Number and Luck Type */}
              <div className="flex justify-between items-center border-b-2 border-stone-800 pb-4 mb-4">
                <span className="text-xl sm:text-2xl font-black tracking-widest text-stone-900 font-serif">
                  {drawnFortune.number}
                </span>
                <div className={`px-6 py-2 rounded-xl border-2 text-2xl sm:text-3xl font-black tracking-widest shadow-md ${drawnFortune.luckColor}`}>
                  {drawnFortune.luck}
                </div>
              </div>

              {/* Poetic Blessing */}
              <div className="bg-amber-100/70 border-l-4 border-amber-700 p-3.5 my-4 rounded-r-lg text-sm sm:text-base italic text-stone-900 leading-relaxed font-semibold shadow-inner">
                「 {drawnFortune.poem} 」
              </div>

              {/* General Luck Description */}
              <div className="mb-6 text-sm sm:text-base leading-relaxed text-stone-800 border-b border-stone-300 pb-4">
                <h3 className="text-xs uppercase tracking-widest text-amber-950 font-bold mb-1 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-700" /> 総運（お告げ）
                </h3>
                {drawnFortune.general}
              </div>

              {/* Categorized Fortunes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6 text-xs sm:text-sm">
                <div className="bg-stone-100/90 p-3 rounded-lg border border-stone-300 shadow-sm">
                  <span className="font-bold text-amber-950 flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" /> 願望（ねがいごと）
                  </span>
                  <p className="text-stone-700">{drawnFortune.wishes}</p>
                </div>

                <div className="bg-stone-100/90 p-3 rounded-lg border border-stone-300 shadow-sm">
                  <span className="font-bold text-amber-950 flex items-center gap-1 mb-1">
                    <Briefcase className="w-3.5 h-3.5 text-amber-700" /> 仕事・商売
                  </span>
                  <p className="text-stone-700">{drawnFortune.business}</p>
                </div>

                <div className="bg-stone-100/90 p-3 rounded-lg border border-stone-300 shadow-sm">
                  <span className="font-bold text-amber-950 flex items-center gap-1 mb-1">
                    <Heart className="w-3.5 h-3.5 text-amber-700" /> 恋愛・縁談
                  </span>
                  <p className="text-stone-700">{drawnFortune.love}</p>
                </div>

                <div className="bg-stone-100/90 p-3 rounded-lg border border-stone-300 shadow-sm">
                  <span className="font-bold text-amber-950 flex items-center gap-1 mb-1">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" /> 健康・病気
                  </span>
                  <p className="text-stone-700">{drawnFortune.health}</p>
                </div>
              </div>

              {/* Shrine footer stamp */}
              <div className="text-center pt-3 border-t border-dashed border-stone-300 text-stone-500 text-xs tracking-wider">
                〜 鎮守神社・授与所発行 〜
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={resetApp}
                className="px-8 py-3 bg-gradient-to-r from-stone-800 to-stone-900 hover:from-stone-700 hover:to-stone-800 text-stone-100 border border-stone-600 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer text-sm font-bold tracking-wider"
              >
                <RefreshCw className="w-4 h-4 text-amber-400" />
                もう一度おみくじを引く
              </button>
            </div>
          </div>
        )}

      </main>

      {/* History Modal / Drawer */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-md w-full max-h-[82vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-stone-800 flex justify-between items-center bg-stone-950">
              <div className="flex items-center gap-2 text-amber-400 font-bold tracking-widest">
                <History className="w-4 h-4" />
                <span>過去に引いた神籤一覧</span>
              </div>
              <button 
                onClick={() => setShowHistory(false)}
                className="text-stone-400 hover:text-white px-3 py-1 text-xs rounded-lg bg-stone-800 border border-stone-700 transition-colors cursor-pointer"
              >
                閉じる
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto flex-1 space-y-3">
              {history.length === 0 ? (
                <p className="text-center text-stone-500 py-12 text-sm">まだおみくじの履歴がありません。<br />今日のお告げを引いてみましょう。</p>
              ) : (
                history.map((item, idx) => (
                  <div key={idx} className="bg-stone-800/80 border border-stone-700/80 p-3.5 rounded-xl flex justify-between items-center shadow">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-amber-400 font-bold">{item.number}</span>
                        <span className="text-xs text-stone-400">({item.id === 1 ? '一番札' : '吉兆'})</span>
                      </div>
                      <p className="text-xs text-stone-200 mt-1 italic">「 {item.poem.substring(0, 18)}... 」</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-black border shadow-sm ${item.luckColor}`}>
                      {item.luck}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full text-center text-stone-500 text-xs py-4 border-t border-stone-800/80 z-10 flex flex-col sm:flex-row justify-center items-center gap-2">
        <span>© 古風おみくじ神社 All Rights Reserved.</span>
        <span className="hidden sm:inline">•</span>
        <span className="text-amber-500/80">心願成就・開運招福</span>
      </footer>
    </div>
  );
}