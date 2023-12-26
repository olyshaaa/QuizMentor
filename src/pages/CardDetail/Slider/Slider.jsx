import React, { useState } from 'react';
import './Slider.css';
import style from "./Slider.module.scss"
import ProgressBar from '../ProgressBar/ProgressBar';

const Slider = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTerm, setShowTerm] = useState(true);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setShowTerm(true);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    setShowTerm(true);
  };

  const toggleContent = () => {
    setShowTerm(!showTerm);
  };

  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className={style.sliderContainer}>
      <div className={`slide ${showTerm ? 'show-term' : 'show-definition'}`} onClick={toggleContent}>
        <div className={`card ${showTerm ? 'show-term' : 'show-definition'}`}>
          <p className={style.term}>{cards[currentIndex].term}</p>
          <p className={style.definition}>{cards[currentIndex].definition}</p>
      </div>
      </div>
      <div className={style.navigation}>
        <button onClick={goToPrevSlide}>&lt; Prev</button>
        <button onClick={goToNextSlide}>Next &gt;</button>
      </div>
      <ProgressBar progress={progress}/>
    </div>
  );
};

export default Slider;
