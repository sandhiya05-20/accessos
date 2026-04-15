import React, { useState, useRef } from 'react';

const S = {
  page: { minHeight:'100vh', background:'#060810', color:'#e8eef4', fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column' },
  topbar: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 32px', borderBottom:'1px solid rgba(255,255,255,0.08)', background:'rgba(6,8,16,0.9)' },
  backBtn: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#e8eef4', padding:'8px 18px', borderRadius:'8px', cursor:'pointer', fontSize:'13px' },
  badge: { fontSize:'13px', fontWeight:700, padding:'8px 20px', borderRadius:'50px', background:'rgba(0,255,136,0.1)', border:'1px solid rgba(0,255,136,0.3)', color:'#00ff88' },
  switchBtn: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#5a6a7a', padding:'8px 18px', borderRadius:'8px', cursor:'pointer', fontSize:'13px' },
  body: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', padding:'32px', flex:1 },
  demoPanel: { display:'flex', flexDirection:'column', gap:'16px' },
  demoLabel: { fontSize:'11px', letterSpacing:'3px', color:'#5a6a7a' },
  arena: { background:'#0a0d14', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', height:'200px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px' },
  cursorStable: { fontSize:'36px', color:'#00d4ff' },
  statusGood: { fontSize:'13px', color:'#00ff88' },
  statusBad: { fontSize:'13px', color:'#ff4d6d' },
  baRow: { display:'flex', alignItems:'center', gap:'12px' },
  baBad: { flex:1, borderRadius:'14px', padding:'16px', textAlign:'center', background:'rgba(255,77,109,0.07)', border:'1px solid rgba(255,77,109,0.2)' },
  baGood: { flex:1, borderRadius:'14px', padding:'16px', textAlign:'center', background:'rgba(0,255,136,0.07)', border:'1px solid rgba(0,255,136,0.2)' },
  baLabel: { fontSize:'10px', letterSpacing:'2px', color:'#5a6a7a', marginBottom:'10px' },
  baNote: { fontSize:'11px', color:'#5a6a7a' },
  baArrow: { fontSize:'20px', color:'rgba(255,255,255,0.08)' },
  sensRow: { display:'flex', alignItems:'center', gap:'12px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px', padding:'14px 16px' },
  sensLabel: { fontSize:'13px', color:'#5a6a7a', flexShrink:0 },
  sensVal: { fontSize:'13px', color:'#00ff88', fontWeight:700, width:'30px', textAlign:'right' },
  ctrlPanel: { display:'flex', flexDirection:'column', gap:'20px' },
  ctrlTitle: { fontSize:'24px', fontWeight:800, color:'#fff' },
  mainBtnStart: { width:'100%', padding:'18px', border:'none', borderRadius:'14px', background:'linear-gradient(135deg,#00ff88,#00cc66)', color:'#000', fontWeight:700, fontSize:'16px', cursor:'pointer' },
  mainBtnActive: { width:'100%', padding:'18px', border:'2px solid #00ff88', borderRadius:'14px', background:'rgba(0,255,136,0.1)', color:'#00ff88', fontWeight:700, fontSize:'16px', cursor:'pointer' },
  toggleCard: { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', padding:'16px', display:'flex', flexDirection:'column', gap:'12px' },
  toggleRow: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.08)' },
  toggleLabel: { fontSize:'13px', color:'#e8eef4', marginBottom:'2px' },
  toggleDesc: { fontSize:'11px', color:'#5a6a7a' },
  togOn: { padding:'6px 16px', borderRadius:'20px', fontSize:'12px', fontWeight:700, cursor:'pointer', background:'rgba(0,255,136,0.12)', border:'1px solid #00ff88', color:'#00ff88' },
  togOff: { padding:'6px 16px', borderRadius:'20px', fontSize:'12px', fontWeight:700, cursor:'pointer', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', color:'#5a6a7a' },
  statsCard: { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', padding:'20px' },
  statsHead: { fontSize:'11px', letterSpacing:'3px', color:'#5a6a7a', marginBottom:'16px' },
  statItem: { display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px', fontSize:'13px' },
  statName: { width:'130px', color:'#5a6a7a', flexShrink:0 },
  statBar: { flex:1, height:'5px', background:'rgba(255,255,255,0.06)', borderRadius:'3px', overflow:'hidden' },
  statFillGreen: { height:'100%', borderRadius:'3px', background:'linear-gradient(90deg,#00ff88,#00cc66)', transition:'width 0.3s' },
  statFillEye: { height:'100%', borderRadius:'3px', background:'linear-gradient(90deg,#00d4ff,#0088ff)', transition:'width 0.3s' },
  statPct: { fontSize:'12px', color:'#e8eef4', width:'34px', textAlign:'right' },
  aiCard: { display:'flex', gap:'14px', alignItems:'flex-start', background:'rgba(0,212,255,0.04)', border:'1px solid rgba(0,212,255,0.12)', borderRadius:'14px', padding:'16px' },
  aiIcon: { fontSize:'24px', flexShrink:0 },
  aiTitle: { fontSize:'14px', fontWeight:700, marginBottom:'4px', color:'#fff' },
  aiDesc: { fontSize:'12px', color:'#5a6a7a', lineHeight:1.6 },
  techCard: { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'14px', padding:'16px' },
  techTitle: { fontSize:'10px', letterSpacing:'3px', color:'#5a6a7a', marginBottom:'10px' },
  techTags: { display:'flex', gap:'8px', flexWrap:'wrap' },
  techTag: { fontSize:'11px', padding:'4px 10px', borderRadius:'20px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#8899aa' },
};

const shakeKeyframes = `@keyframes shake{0%{transform:translate(0,0)}10%{transform:translate(-5px,3px)}20%{transform:translate(6px,-4px)}30%{transform:translate(-4px,6px)}40%{transform:translate(7px,-3px)}50%{transform:translate(-3px,7px)}60%{transform:translate(5px,4px)}70%{transform:translate(-7px,-3px)}80%{transform:translate(4px,5px)}90%{transform:translate(-5px,-4px)}100%{transform:translate(0,0)}}`;

export default function TremorMode({ setMode }) {
  const [filterOn, setFilterOn] = useState(false);
  const [snapOn, setSnapOn] = useState(true);
  const [dwellOn, setDwellOn] = useState(true);
  const [reduction, setReduction] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [sensitivity, setSensitivity] = useState(5);
  const intervalRef = useRef(null);

  const toggleFilter = () => {
    if (!filterOn) {
      setFilterOn(true);
      let r = 0, a = 0;
      intervalRef.current = setInterval(() => {
        r = Math.min(r + Math.floor(Math.random() * 4) + 1, 87);
        a = Math.min(a + Math.floor(Math.random() * 3) + 1, 92);
        setReduction(r); setAccuracy(a);
        if (r >= 87 && a >= 92) clearInterval(intervalRef.current);
      }, 80);
    } else {
      setFilterOn(false);
      clearInterval(intervalRef.current);
      setReduction(0); setAccuracy(0);
    }
  };

  return (
    <div style={S.page}>
      <style>{shakeKeyframes}</style>
      <div style={S.topbar}>
        <button style={S.backBtn} onClick={() => setMode('landing')}>← Back</button>
        <div style={S.badge}>🤝 Tremor Filter Mode — ACTIVE</div>
        <button style={S.switchBtn} onClick={() => setMode('eye')}>Switch to Eye →</button>
      </div>
      <div style={S.body}>
        <div style={S.demoPanel}>
          <div style={S.demoLabel}>LIVE CURSOR DEMONSTRATION</div>
          <div style={S.arena}>
            <div style={filterOn ? {fontSize:'36px',color:'#00d4ff'} : {fontSize:'36px',color:'#ff4d6d',animation:'shake 0.15s infinite'}}>⊕</div>
            <div style={filterOn ? S.statusGood : S.statusBad}>
              {filterOn ? '✅ Tremor Eliminated — Cursor Stable' : '⚠️ Raw Input — Shaking Uncontrolled'}
            </div>
          </div>
          <div style={S.baRow}>
            <div style={S.baBad}>
              <div style={S.baLabel}>WITHOUT FILTER</div>
              <div style={{fontSize:'26px',color:'#ff4d6d',animation:'shake 0.2s infinite',display:'block',marginBottom:'8px'}}>⊕</div>
              <div style={S.baNote}>Uncontrolled shaking</div>
            </div>
            <div style={S.baArrow}>→</div>
            <div style={S.baGood}>
              <div style={S.baLabel}>WITH FILTER</div>
              <div style={{fontSize:'26px',color:'#00ff88',display:'block',marginBottom:'8px'}}>⊕</div>
              <div style={S.baNote}>Stable & precise</div>
            </div>
          </div>
          <div style={S.sensRow}>
            <span style={S.sensLabel}>Filter Strength</span>
            <input type="range" min="1" max="10" step="1" value={sensitivity} style={{flex:1,accentColor:'#00ff88',cursor:'pointer'}} onChange={e => setSensitivity(Number(e.target.value))} />
            <span style={S.sensVal}>{sensitivity}/10</span>
          </div>
        </div>
        <div style={S.ctrlPanel}>
          <h2 style={S.ctrlTitle}>Tremor Controls</h2>
          <button style={filterOn ? S.mainBtnActive : S.mainBtnStart} onClick={toggleFilter}>
            {filterOn ? '✅ Filter ON — Click to Disable' : '▶ Enable Tremor Filter'}
          </button>
          <div style={S.toggleCard}>
            {[{label:'🎯 Snap-to-Button',desc:'Cursor locks to nearby targets',val:snapOn,set:setSnapOn},{label:'⏱️ Dwell Click (1.5s)',desc:'Hover to click, no press needed',val:dwellOn,set:setDwellOn}].map(({label,desc,val,set}) => (
              <div key={label} style={{...S.toggleRow}}>
                <div><div style={S.toggleLabel}>{label}</div><div style={S.toggleDesc}>{desc}</div></div>
                <div style={val ? S.togOn : S.togOff} onClick={() => set(!val)}>{val ? 'ON' : 'OFF'}</div>
              </div>
            ))}
          </div>
          <div style={S.statsCard}>
            <div style={S.statsHead}>LIVE STATS</div>
            <div style={S.statItem}>
              <span style={S.statName}>Tremor Reduction</span>
              <div style={S.statBar}><div style={{...S.statFillGreen,width:`${reduction}%`}}/></div>
              <span style={S.statPct}>{reduction}%</span>
            </div>
            <div style={S.statItem}>
              <span style={S.statName}>Click Accuracy</span>
              <div style={S.statBar}><div style={{...S.statFillEye,width:`${accuracy}%`}}/></div>
              <span style={S.statPct}>{accuracy}%</span>
            </div>
          </div>
          <div style={S.aiCard}>
            <div style={S.aiIcon}>🧠</div>
            <div><div style={S.aiTitle}>AI Adaptive Learning</div><div style={S.aiDesc}>AccessOS detects your personal tremor frequency and tunes the filter automatically.</div></div>
          </div>
          <div style={S.techCard}>
            <div style={S.techTitle}>POWERED BY</div>
            <div style={S.techTags}><span style={S.techTag}>Moving Average Filter</span><span style={S.techTag}>Snap-to-Grid</span><span style={S.techTag}>Dwell Detection</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}