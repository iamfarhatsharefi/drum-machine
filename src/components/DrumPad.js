import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const DrumPad = ({ sound, handleDisplay }) => {
  const playSound = () => {
    const audio = document.getElementById(sound.key.toUpperCase());
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      handleDisplay(sound.sound);
    } else {
      // Disable the no-console rule for this line
      // eslint-disable-next-line no-console
      console.error(`Audio element with id ${sound.key.toUpperCase()} not found`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key.toUpperCase() === sound.key.toUpperCase()) {
      playSound();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <button
      id={sound.sound}
      className="drum-pad col-4 btn btn-primary m-1 p-3"
      onClick={playSound}
      aria-label={sound.sound}
      type="button"
    >
      {sound.key.toUpperCase()}
      {/* Self-closing <audio> tag with a disabled rule for captions */}
      <audio className="clip" id={sound.key.toUpperCase()} src={sound.url} />
    </button>
  );
};

// Prop-types validation
DrumPad.propTypes = {
  sound: PropTypes.shape({
    key: PropTypes.string.isRequired,
    sound: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleDisplay: PropTypes.func.isRequired,
};

export default DrumPad;
