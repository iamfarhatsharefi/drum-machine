import React, { useEffect } from 'react';

const DrumPad = ({ sound, handleDisplay }) => {
  const playSound = () => {
    const audio = document.getElementById(sound.key.toUpperCase());
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      handleDisplay(sound.sound);
    } else {
      console.error(`Audio element with id ${sound.key.toUpperCase()} not found`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key.toUpperCase() === sound.key.toUpperCase()) {
      playSound();
    }
  };

  useEffect(() => {
    // Add event listener for keydown when the component mounts
    document.addEventListener('keydown', handleKeyPress);
    
    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <button
      id={sound.sound}
      className="drum-pad col-4 btn btn-primary m-1 p-3"
      onClick={playSound}
      aria-label={sound.sound}
    >
      {sound.key.toUpperCase()}
      <audio className="clip" id={sound.key.toUpperCase()} src={sound.url}></audio>
    </button>
  );
};

export default DrumPad;

