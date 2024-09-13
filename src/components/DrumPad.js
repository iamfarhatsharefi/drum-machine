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
  }, [handleKeyPress]); // Add handleKeyPress to the dependency array

  return (
    <button id={sound.sound} className="drum-pad" onClick={playSound} type="button">
      {sound.key}
      <audio className="clip" id={sound.key} src={sound.url} aria-label={`Sound for ${sound.sound}`} />
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
