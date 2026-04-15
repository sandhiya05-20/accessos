import React, { useState } from 'react';
import LandingPage from './LandingPage';
import EyeMode from './EyeMode';
import TremorMode from './TremorMode';

function App() {
  const [mode, setMode] = useState('landing');
  return (
    <div>
      {mode === 'landing' && <LandingPage setMode={setMode} />}
      {mode === 'eye'     && <EyeMode     setMode={setMode} />}
      {mode === 'tremor'  && <TremorMode  setMode={setMode} />}
    </div>
  );
}

export default App;