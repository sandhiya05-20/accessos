import React from 'react';

const S = {
  page: { minHeight:'100vh', background:'#060810', color:'#e8eef4', fontFamily:'system-ui,sans-serif' },
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 48px', borderBottom:'1px solid rgba(255,255,255,0.08)' },
  logo: { fontSize:'22px', fontWeight:900, color:'#fff', letterSpacing:'-1px' },
  logoSpan: { color:'#00d4ff' },
  navTag: { fontSize:'12px', color:'#5a6a7a', letterSpacing:'2px' },
  hero: { display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'80px 24px 60px' },
  eyebrow: { display:'flex', alignItems:'center', gap:'8px', fontSize:'11px', letterSpacing:'3px', color:'#00d4ff', marginBottom:'28px', fontWeight:600 },
  dot: { width:'8px', height:'8px', background:'#00d4ff', borderRadius:'50%', display:'inline-block' },
  h1: { fontSize:'clamp(40px,7vw,80px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-2px', color:'#fff', marginBottom:'20px' },
  h1em: { fontStyle:'normal', color:'#00d4ff' },
  desc: { fontSize:'18px', color:'#5a6a7a', lineHeight:1.7, maxWidth:'520px', marginBottom:'40px' },
  compare: { display:'flex', alignItems:'center', gap:'20px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', padding:'24px 36px' },
  cmpBad: { textAlign:'center' },
  cmpGood: { textAlign:'center' },
  cmpLabel: { fontSize:'11px', letterSpacing:'2px', color:'#5a6a7a', marginBottom:'6px' },
  cmpValBad: { fontSize:'36px', fontWeight:900, color:'#ff4d6d' },
  cmpValGood: { fontSize:'36px', fontWeight:900, color:'#00ff88' },
  cmpNote: { fontSize:'12px', color:'#5a6a7a', marginTop:'4px' },
  cmpDiv: { fontSize:'13px', color:'#5a6a7a', fontWeight:700, letterSpacing:'2px' },
  modes: { padding:'60px 48px' },
  modesLabel: { textAlign:'center', fontSize:'12px', letterSpacing:'3px', color:'#5a6a7a', marginBottom:'32px' },
  grid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', maxWidth:'900px', margin:'0 auto' },
  card: { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'24px', padding:'36px 28px', cursor:'pointer', transition:'transform 0.3s' },
  cardTop: { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' },
  icon: { fontSize:'36px' },
  tagEye: { fontSize:'11px', letterSpacing:'2px', padding:'4px 12px', borderRadius:'20px', background:'rgba(0,212,255,0.1)', border:'1px solid rgba(0,212,255,0.2)', color:'#00d4ff' },
  tagTremor: { fontSize:'11px', letterSpacing:'2px', padding:'4px 12px', borderRadius:'20px', background:'rgba(0,255,136,0.1)', border:'1px solid rgba(0,255,136,0.2)', color:'#00ff88' },
  cardH2: { fontSize:'26px', fontWeight:800, marginBottom:'10px', color:'#fff' },
  cardP: { fontSize:'14px', color:'#5a6a7a', lineHeight:1.7, marginBottom:'20px' },
  feats: { display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'24px' },
  feat: { fontSize:'11px', padding:'4px 10px', borderRadius:'20px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#8899aa' },
  btnEye: { width:'100%', padding:'14px', border:'none', borderRadius:'12px', background:'linear-gradient(135deg,#00d4ff,#0088ff)', color:'#000', fontWeight:700, fontSize:'15px', cursor:'pointer' },
  btnTremor: { width:'100%', padding:'14px', border:'none', borderRadius:'12px', background:'linear-gradient(135deg,#00ff88,#00cc66)', color:'#000', fontWeight:700, fontSize:'15px', cursor:'pointer' },
  howSection: { padding:'60px 48px', textAlign:'center' },
  sectionTitle: { fontSize:'28px', fontWeight:800, marginBottom:'40px', color:'#fff' },
  steps: { display:'flex', alignItems:'center', justifyContent:'center', gap:'0', flexWrap:'wrap', maxWidth:'800px', margin:'0 auto' },
  step: { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', padding:'28px 20px', width:'200px', textAlign:'center' },
  stepNum: { fontSize:'11px', color:'#00d4ff', letterSpacing:'2px', marginBottom:'12px' },
  stepIcon: { fontSize:'32px', marginBottom:'12px' },
  stepText: { fontSize:'13px', color:'#5a6a7a', lineHeight:1.6 },
  stepLine: { width:'40px', height:'1px', background:'rgba(255,255,255,0.08)' },
  strip: { display:'flex', gap:'1px', background:'rgba(255,255,255,0.08)', borderTop:'1px solid rgba(255,255,255,0.08)', borderBottom:'1px solid rgba(255,255,255,0.08)' },
  stat: { flex:1, padding:'28px', textAlign:'center', background:'#060810' },
  statNum: { fontSize:'32px', fontWeight:900, color:'#00d4ff', marginBottom:'6px' },
  statLabel: { fontSize:'12px', color:'#5a6a7a', letterSpacing:'1px' },
  footer: { textAlign:'center', padding:'40px 24px' },
  footerQ: { fontSize:'15px', color:'#445566', fontStyle:'italic', marginBottom:'10px' },
  footerS: { fontSize:'12px', color:'#5a6a7a', letterSpacing:'1px' },
};

export default function LandingPage({ setMode }) {
  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <div style={S.logo}>Access<span style={S.logoSpan}>OS</span></div>
        <div style={S.navTag}>Assistive Tech · India · Free Forever</div>
      </nav>

      <section style={S.hero}>
        <div style={S.eyebrow}><span style={S.dot}/> LIVE DEMO AVAILABLE</div>
        <h1 style={S.h1}>Control your computer<br/><em style={S.h1em}>without your hands.</em></h1>
        <p style={S.desc}>Whether you have full paralysis or uncontrollable tremors — AccessOS works for you. Free. In your browser. Right now.</p>
        <div style={S.compare}>
          <div style={S.cmpBad}>
            <div style={S.cmpLabel}>Competitor</div>
            <div style={S.cmpValBad}>₹70,000</div>
            <div style={S.cmpNote}>Hardware required</div>
          </div>
          <div style={S.cmpDiv}>VS</div>
          <div style={S.cmpGood}>
            <div style={S.cmpLabel}>AccessOS</div>
            <div style={S.cmpValGood}>₹0</div>
            <div style={S.cmpNote}>Just open Chrome</div>
          </div>
        </div>
      </section>

      <section style={S.modes}>
        <p style={S.modesLabel}>— Choose your mode —</p>
        <div style={S.grid}>
          <div style={S.card} onClick={() => setMode('eye')}>
            <div style={S.cardTop}><span style={S.icon}>👁️</span><span style={S.tagEye}>For Paralysis</span></div>
            <h2 style={S.cardH2}>Eye Control</h2>
            <p style={S.cardP}>Look at the screen to move your cursor. Open your mouth to click. Zero hand movement required.</p>
            <div style={S.feats}><span style={S.feat}>Eye tracking</span><span style={S.feat}>Mouth-click</span><span style={S.feat}>Dwell click</span></div>
            <button style={S.btnEye}>Enter Eye Mode →</button>
          </div>
          <div style={S.card} onClick={() => setMode('tremor')}>
            <div style={S.cardTop}><span style={S.icon}>🤝</span><span style={S.tagTremor}>For Tremors</span></div>
            <h2 style={S.cardH2}>Tremor Filter</h2>
            <p style={S.cardP}>Real-time AI filter removes shaky movements. Cursor snaps to targets. Hover to click.</p>
            <div style={S.feats}><span style={S.feat}>Stabilization</span><span style={S.feat}>Snap-to-target</span><span style={S.feat}>Dwell click</span></div>
            <button style={S.btnTremor}>Enter Tremor Mode →</button>
          </div>
        </div>
      </section>

      <section style={S.howSection}>
        <h3 style={S.sectionTitle}>How it works</h3>
        <div style={S.steps}>
          <div style={S.step}><div style={S.stepNum}>01</div><div style={S.stepIcon}>🌐</div><div style={S.stepText}>Open AccessOS in Chrome — no install, no account needed</div></div>
          <div style={S.stepLine}/>
          <div style={S.step}><div style={S.stepNum}>02</div><div style={S.stepIcon}>🎯</div><div style={S.stepText}>Choose your mode based on your disability type</div></div>
          <div style={S.stepLine}/>
          <div style={S.step}><div style={S.stepNum}>03</div><div style={S.stepIcon}>✅</div><div style={S.stepText}>Use your computer independently — no hands needed</div></div>
        </div>
      </section>

      <div style={S.strip}>
        {[['₹0','Cost forever'],['0','Installs needed'],['2','Disability types'],['Chrome','All you need']].map(([n,l]) => (
          <div key={l} style={S.stat}><div style={S.statNum}>{n}</div><div style={S.statLabel}>{l}</div></div>
        ))}
      </div>

      <footer style={S.footer}>
        <div style={S.footerQ}>"Whether you can't move your hands — or they won't stop moving — AccessOS works for you."</div>
        <div style={S.footerS}>Built for India · Free for everyone · Powered by WebGazer + MediaPipe</div>
      </footer>
    </div>
  );
}