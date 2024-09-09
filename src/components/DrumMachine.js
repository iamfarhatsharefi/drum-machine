import React, { useState } from 'react';
import DrumPad from './DrumPad';
import './DrumMachine.js';

const sounds = [
  { key: 'Q', sound: 'Heater 1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', sound: 'Heater 2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', sound: 'Heater 3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', sound: 'Heater 4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4.mp3' },
  { key: 'S', sound: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', sound: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', sound: 'Kick-n\'-Hat', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', sound: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', sound: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
];

const DrumMachine = () => {
  const [display, setDisplay] = useState('');

  const handleDisplay = (sound) => {
    setDisplay(sound);
  };

  return (
    <div id="drum-machine" className="container text-center p-4">
      <div id="display" className="display bg-light p-3 mb-3 rounded">
        {display || "Press a key"}
      </div>
      <div className="row justify-content-center">
        {sounds.map((soundObj) => (
          <DrumPad key={soundObj.key} sound={soundObj} handleDisplay={handleDisplay} />
        ))}
      </div>
    </div>
  );
}

export default DrumMachine;
