import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

function DrumPad({ sound, handleDisplay }) {
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
  }, [sound.key, sound.sound, handleDisplay]);

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
  }, [handleKeyPress]);

  return (
    <button
      type="button" // Explicit type attribute to prevent lint error
      id={sound.sound}
      className="drum-pad"
      onClick={playSound}
    >
      {sound.key}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        className="clip"
        id={sound.key}
        src={sound.url}
        aria-label={`Sound for ${sound.key}`}
      />
    </button>
  );
}

DrumPad.propTypes = {
  sound: PropTypes.shape({
    key: PropTypes.string.isRequired,
    sound: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleDisplay: PropTypes.func.isRequired,
};

export default DrumPad;
