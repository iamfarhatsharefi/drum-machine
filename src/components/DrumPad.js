import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const DrumPad = ({ sound, handleDisplay }) => {
  const playSound = () => {
    const audio = document.getElementById(sound.key.toUpperCase());
    if (audio) {
      audio.currentTime = 0; // Reset the audio to allow repeated playback
      audio.play();
      handleDisplay(sound.sound); // Update the display with the sound name
    } else {
      // eslint-disable-next-line no-console
      console.error(`Audio element with id ${sound.key.toUpperCase()} not found`);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toUpperCase() === sound.key.toUpperCase()) {
        playSound(); // Play sound if the corresponding key is pressed
      }
    };

    // Add event listener for keydown
    document.addEventListener('keydown', handleKeyPress);
    
    // Cleanup event listener when component unmounts or updates
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [sound.key]); // Reattach listener when `sound.key` changes

  return (
    <button
      id={sound.sound}
      className="drum-pad col-4 btn btn-primary m-1 p-3"
      onClick={playSound}
      aria-label={sound.sound}
      type="button"
    >
      {sound.key.toUpperCase()}
      {/* Audio element with correct id and src */}
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
