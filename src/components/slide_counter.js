import React from 'react';

const SlideCounter = ({currentSlide, totalSlides}) => {
	return (
		<div className="slide-counter">
			<span>{currentSlide} / {totalSlides}</span>
		</div>
	);
};

export default SlideCounter;