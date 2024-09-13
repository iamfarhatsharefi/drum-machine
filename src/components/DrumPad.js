import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const DrumPad = ({ sound, handleDisplay }) => {
  // Memoize playSound to prevent it from changing on every render
  const playSound = useCallback(() => {
    const audio = document.getElementById(sound.key);
    if (audio) {
      if (audio.paused) {
        audio.currentTime = 0;
        audio.play().catch(() => {
          // Error is silently handled, without logging to console
        });
        handleDisplay(sound.sound);
      }
    }
  }, [sound.key, sound.sound, handleDisplay]); // Add sound.sound to dependencies

  // Memoize handleKeyPress and include playSound and sound.key as dependencies
  const handleKeyPress = useCallback((event) => {
    if (event.key.toUpperCase() === sound.key) {
      playSound();
    }
  }, [sound.key, playSound]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]); // Include handleKeyPress as dependency

  return (
    <button
      type="button" // Explicit type attribute to prevent lint error
      id={sound.sound}
      className="drum-pad"
      onClick={playSound}
    >
      {sound.key}
      <audio
        className="clip"
        id={sound.key}
        src={sound.url}
        aria-label={`Sound for ${sound.key}`} // Add aria-label for better accessibility
      />
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
