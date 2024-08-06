import React, { useState }from 'react';
import BlurredCard from './components/BlurredCard';
import './index.css';
import { Switch } from '@nextui-org/react';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';


const App = () => {
  const [isDark, setIsDark] = useState(false);

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
    </div>
  );
};

export default App;
