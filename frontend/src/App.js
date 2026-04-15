import { useState } from 'react';
import LandingPage from './LandingPage';
import EyeMode from './EyeMode';
import TremorMode from './TremorMode';

function App() {
  const [mode, setMode] = useState(null);

  return (
    <div>
      {mode === null && <LandingPage setMode={setMode} />}
      {mode === 'eye' && <EyeMode setMode={setMode} />}
      {mode === 'tremor' && <TremorMode setMode={setMode} />}
    </div>
  );
}

export default App;