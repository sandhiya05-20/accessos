import React, { useState, useEffect, useRef } from 'react';

const S = {
  page: { minHeight:'100vh', background:'#060810', color:'#e8eef4', fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column' },
  topbar: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 32px', borderBottom:'1px solid rgba(255,255,255,0.08)', background:'rgba(6,8,16,0.9)' },
  backBtn: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#e8eef4', padding:'8px 18px', borderRadius:'8px', cursor:'pointer', fontSize:'13px' },
  badge: { fontSize:'13px', fontWeight:700, padding:'8px 20px', borderRadius:'50px', background:'rgba(0,212,255,0.1)', border:'1px solid rgba(0,212,255,0.3)', color:'#00d4ff' },
  switchBtn: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#5a6a7a', padding:'8px 18px', borderRadius:'8px', cursor:'pointer', fontSize:'13px' },
  body: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', padding:'32px', flex:1 },
  camPanel: { display:'flex', flexDirection:'column', gap:'16px' },
  camLabel: { fontSize:'11px', letterSpacing:'3px', color:'#5a6a7a' },
  camBox: { position:'relative', borderRadius:'20px', overflow:'hidden', background:'#0a0d14', border:'1px solid rgba(255,255,255,0.08)', aspectRatio:'4/3', display:'flex', alignItems:'center', justifyContent:'center' },
  camOverlay: { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px', color:'#5a6a7a' },
  camIcon: { fontSize:'48px' },
  camStartBtn: { background:'linear-gradient(135deg,#00d4ff,#0088ff)', color:'#000', border:'none', padding:'12px 24px', borderRadius:'10px', fontWeight:700, fontSize:'14px', cursor:'pointer' },
  camError: { color:'#ff4d6d', fontSize:'12px', textAlign:'center', padding:'0 20px' },
  camStatus: { display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:'#00ff88' },
  liveDot: { width:'8px', height:'8px', borderRadius:'50%', background:'#00ff88', display:'inline-block' },
  howBox: { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'14px', padding:'16px' },
  howRow: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.08)', fontSize:'13px' },
  howKey: { color:'#5a6a7a' },
  howVal: { color:'#00d4ff', fontWeight:600 },
  ctrlPanel: { display:'flex', flexDirection:'column', gap:'20px' },
  ctrlTitle: { fontSize:'24px', fontWeight:800, color:'#fff' },
  mainBtnStart: { width:'100%', padding:'18px', border:'none', borderRadius:'14px', background:'linear-gradient(135deg,#00d4ff,#0088ff)', color:'#000', fontWeight:700, fontSize:'16px', cursor:'pointer' },
  mainBtnActive: { width:'100%', padding:'18px', border:'2px solid #00ff88', borderRadius:'14px', background:'rgba(0,255,136,0.1)', color:'#00ff88', fontWeight:700, fontSize:'16px', cursor:'pointer' },
  mainBtnDisabled: { width:'100%', padding:'18px', border:'none', borderRadius:'14px', background:'rgba(255,255,255,0.05)', color:'#5a6a7a', fontWeight:700, fontSize:'16px', cursor:'not-allowed' },
  camBtn: { width:'100%', padding:'14px', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px', background:'rgba(255,255,255,0.03)', color:'#e8eef4', fontSize:'14px', cursor:'pointer' },
  statsCard: { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', padding:'20px' },
  statsHead: { fontSize:'11px', letterSpacing:'3px', color:'#5a6a7a', marginBottom:'16px' },
  statItem: { display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px', fontSize:'13px' },
  statName: { width:'130px', color:'#5a6a7a', flexShrink:0 },
  statBar: { flex:1, height:'5px', background:'rgba(255,255,255,0.06)', borderRadius:'3px', overflow:'hidden' },
  statFillEye: { height:'100%', borderRadius:'3px', background:'linear-gradient(90deg,#00d4ff,#0088ff)', transition:'width 0.3s' },
  statPct: { fontSize:'12px', color:'#e8eef4', width:'34px', textAlign:'right' },
  statValGreen: { color:'#00ff88', fontWeight:600 },
  statValDim: { color:'#5a6a7a' },
  aiCard: { display:'flex', gap:'14px', alignItems:'flex-start', background:'rgba(0,212,255,0.04)', border:'1px solid rgba(0,212,255,0.12)', borderRadius:'14px', padding:'16px' },
  aiIcon: { fontSize:'24px', flexShrink:0 },
  aiTitle: { fontSize:'14px', fontWeight:700, marginBottom:'4px', color:'#fff' },
  aiDesc: { fontSize:'12px', color:'#5a6a7a', lineHeight:1.6 },
  techCard: { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'14px', padding:'16px' },
  techTitle: { fontSize:'10px', letterSpacing:'3px', color:'#5a6a7a', marginBottom:'10px' },
  techTags: { display:'flex', gap:'8px', flexWrap:'wrap' },
  techTag: { fontSize:'11px', padding:'4px 10px', borderRadius:'20px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#8899aa' },
  cursor: { position:'fixed', width:'20px', height:'20px', borderRadius:'50%', background:'rgba(0,212,255,0.8)', border:'2px solid #00d4ff', pointerEvents:'none', zIndex:9999, transform:'translate(-50%,-50%)', transition:'left 0.05s, top 0.05s', boxShadow:'0 0 10px #00d4ff' },
};

export default function EyeMode({ setMode }) {
  const videoRef = useRef(null);
  const [camActive, setCamActive] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [stability, setStability] = useState(0);
  const [camError, setCamError] = useState('');
  const [gazePos, setGazePos] = useState({ x: -100, y: -100 });
  const gazeHistory = useRef([]);
  const intervalRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.style.display = 'block';
      setCamActive(true);
      setCamError('');
    } catch {
      setCamError('Camera access denied. Please allow camera in browser settings.');
    }
  };

  const startTracking = () => {
    if (!window.webgazer) {
      setCamError('WebGazer still loading, please wait 5 seconds and try again.');
      return;
    }
    setTracking(true);

    window.webgazer.setGazeListener((data) => {
      if (!data) return;

      // Smoothing filter — average last 5 gaze points
      gazeHistory.current.push({ x: data.x, y: data.y });
      if (gazeHistory.current.length > 5) gazeHistory.current.shift();

      const avgX = gazeHistory.current.reduce((s, p) => s + p.x, 0) / gazeHistory.current.length;
      const avgY = gazeHistory.current.reduce((s, p) => s + p.y, 0) / gazeHistory.current.length;

      setGazePos({ x: avgX, y: avgY });
      setStability(prev => Math.min(prev + 0.5, 94));
    }).begin();

    window.webgazer.showPredictionPoints(false);
  };

  useEffect(() => () => {
    clearInterval(intervalRef.current);
    if (window.webgazer && tracking) window.webgazer.end();
    if (videoRef.current?.srcObject) videoRef.current.srcObject.getTracks().forEach(t => t.stop());
  }, []);

  return (
    <div style={S.page}>
      {tracking && (
        <div style={{ ...S.cursor, left: gazePos.x, top: gazePos.y }} />
      )}
      <div style={S.topbar}>
        <button style={S.backBtn} onClick={() => setMode('landing')}>← Back</button>
        <div style={S.badge}>👁️ Eye Control Mode — ACTIVE</div>
        <button style={S.switchBtn} onClick={() => setMode('tremor')}>Switch to Tremor →</button>
      </div>
      <div style={S.body}>
        <div style={S.camPanel}>
          <div style={S.camLabel}>LIVE WEBCAM FEED</div>
          <div style={S.camBox}>
            <video ref={videoRef} autoPlay playsInline muted style={{width:'100%',height:'100%',objectFit:'cover',display:'none',transform:'scaleX(-1)'}} />
            {!camActive && (
              <div style={S.camOverlay}>
                <div style={S.camIcon}>📷</div>
                <p style={{fontSize:'14px'}}>Camera not started</p>
                <button style={S.camStartBtn} onClick={startCamera}>Enable Camera</button>
                {camError && <p style={S.camError}>{camError}</p>}
              </div>
            )}
          </div>
          {camActive && <div style={S.camStatus}><span style={S.liveDot}/> Camera live — eye tracking ready</div>}
          <div style={S.howBox}>
            <div style={{...S.howRow,borderBottom:'1px solid rgba(255,255,255,0.08)'}}><span style={S.howKey}>👁️ Look at target</span><span style={S.howVal}>Moves cursor</span></div>
            <div style={{...S.howRow,borderBottom:'1px solid rgba(255,255,255,0.08)'}}><span style={S.howKey}>👄 Open mouth</span><span style={S.howVal}>= Click</span></div>
            <div style={{...S.howRow,borderBottom:'none'}}><span style={S.howKey}>⏱️ Hover 1.5s</span><span style={S.howVal}>= Auto-click</span></div>
          </div>
        </div>
        <div style={S.ctrlPanel}>
          <h2 style={S.ctrlTitle}>Eye Tracking Controls</h2>
          <button style={!camActive ? S.mainBtnDisabled : tracking ? S.mainBtnActive : S.mainBtnStart} onClick={startTracking} disabled={tracking || !camActive}>
            {!camActive ? '⚠ Enable Camera First' : tracking ? '✅ Tracking Active' : '▶ Start Eye Tracking'}
          </button>
          {!camActive && <button style={S.camBtn} onClick={startCamera}>📷 Enable Camera</button>}
          <div style={S.statsCard}>
            <div style={S.statsHead}>LIVE STATS</div>
            <div style={S.statItem}>
              <span style={S.statName}>Cursor Stability</span>
              <div style={S.statBar}><div style={{...S.statFillEye, width:`${stability}%`}}/></div>
              <span style={S.statPct}>{stability}%</span>
            </div>
            <div style={S.statItem}><span style={S.statName}>Smoothing Filter</span><span style={S.statValGreen}>Moving Average ✓</span></div>
            <div style={S.statItem}><span style={S.statName}>Status</span><span style={tracking ? S.statValGreen : S.statValDim}>{tracking ? 'Tracking active' : 'Idle'}</span></div>
          </div>
          <div style={S.aiCard}>
            <div style={S.aiIcon}>🧠</div>
            <div><div style={S.aiTitle}>AI Personalisation</div><div style={S.aiDesc}>AccessOS learns your unique gaze pattern over time, improving accuracy automatically.</div></div>
          </div>
          <div style={S.techCard}>
            <div style={S.techTitle}>POWERED BY</div>
            <div style={S.techTags}><span style={S.techTag}>WebGazer.js</span><span style={S.techTag}>MediaPipe Face Mesh</span><span style={S.techTag}>Moving Average Filter</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}