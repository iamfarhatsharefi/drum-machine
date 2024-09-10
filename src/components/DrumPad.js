import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const DrumPad = ({ sound, handleDisplay }) => {
  const playSound = () => {
    const audio = document.getElementById(sound.key.toUpperCase());
    if (audio) {
      audio.currentTime = 0; // Reset the audio to the beginning
      audio.play();
      handleDisplay(sound.sound); // Display the name of the sound
    } else {
      // eslint-disable-next-line no-console
      console.error(`Audio element with id ${sound.key.toUpperCase()} not found`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key.toUpperCase() === sound.key.toUpperCase()) {
      playSound(); // Play sound if the correct key is pressed
    }
  };

  useEffect(() => {
    // Attach the keydown event listener to the window object
    window.addEventListener('keydown', handleKeyPress);

    // Clean up by removing the event listener when the component unmounts or updates
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [sound.key]); // Update listener when `sound.key` changes

  return (
    <button
      id={sound.sound}
      className="drum-pad col-4 btn btn-primary m-1 p-3"
      onClick={playSound} // Play sound on click
      aria-label={sound.sound}
      type="button"
    >
      {sound.key.toUpperCase()}
      {/* Audio element with the correct id and src */}
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