import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const DrumPad = ({ sound, handleDisplay }) => {
  const playSound = () => {
    const audio = document.getElementById(sound.key);
    if (audio) {
      if (audio.paused) {
        audio.currentTime = 0;
        audio.play().catch((error) => {
          // Error is silently handled, without logging to console
        });
        handleDisplay(sound.sound);
      }
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
  }, [sound.key, handleDisplay]);

  return (
    <button
      id={sound.sound}
      className="drum-pad"
      onClick={playSound}
    >
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
