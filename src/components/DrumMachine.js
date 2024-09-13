import React, { useState } from 'react';
import DrumPad from './DrumPad';

const sounds = [
  { key: 'Q', sound: 'Heater 1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', sound: 'Heater 2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', sound: 'Heater 3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', sound: 'Heater 4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', sound: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', sound: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', sound: 'Kick-n\'-Hat', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', sound: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', sound: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
];

const DrumMachine = () => {
  const [display, setDisplay] = useState(''); // State to manage display

  const handleDisplay = (soundName) => {
    setDisplay(soundName); // Set display when sound is played
  };

  return (
    <div id="drum-machine">
      <div id="display">{display}</div> {/* Display sound name */}
      <div className="drum-pads">
        {sounds.map((sound) => (
          <DrumPad
            key={sound.key}
            sound={sound}
            handleDisplay={handleDisplay}
          />
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
