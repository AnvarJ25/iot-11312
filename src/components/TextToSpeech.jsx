// src/components/TextToSpeech.js
import React, { useRef } from 'react';
import './TextToSpeech.css';

const TextToSpeech = ({ text }) => {
  const audioRef = useRef();

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <button class="btn" onClick={speak}>Speak</button>
      <audio ref={audioRef} src={`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`} />
    </div>
  );
};

export default TextToSpeech;