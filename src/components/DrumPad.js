import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const DrumPad = ({ sound, handleDisplay }) => {
  const playSound = () => {
    const audio = document.getElementById(sound.key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      handleDisplay(sound.sound); // Display the sound name
    }
  };

  const handleKeyPress = (event) => {
    if (event.key.toUpperCase() === sound.key) {
      playSound();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty array ensures this runs once

  return (
    <button id={sound.sound} className="drum-pad" onClick={playSound}>
      {sound.key}
      <audio className="clip" id={sound.key} src={sound.url} />
    </button>
  );
};

DrumPad.propTypes = {
  sound: PropTypes.shape({
    key: PropTypes.string.isRequired,
    sound: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleDisplay: PropTypes.func.isRequired,
};

export default DrumPad;
