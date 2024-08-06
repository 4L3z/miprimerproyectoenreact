import React, { useState, useEffect}from 'react';
import BlurredCard from './components/BlurredCard';
import WelcomeAlert from './components/WelcomeAlert';
import './index.css';
import { Switch } from '@nextui-org/react';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';


const App = () => {
  const [isDark, setIsDark] = useState(false);
   // Recupera el estado desde localStorage cuando se carga el componente
   useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  // Guarda el estado en localStorage cuando cambia el modo
  useEffect(() => {
    if (isDark) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    
<div className={`app-container ${isDark ? 'dark' : ''}`}>
      <div className="switch-container">
        <Switch
          checked={isDark}
          onChange={() => setIsDark(!isDark)}
          size="lg"
          color="secondary"
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
        >
          Dark mode
        </Switch>
      </div>
      <div className="flex justify-center items-center h-screen">
      <BlurredCard isDark={isDark} setIsDark={setIsDark} />
      </div>
      <div> <WelcomeAlert /></div>
    </div>
  );
};

export default App;
