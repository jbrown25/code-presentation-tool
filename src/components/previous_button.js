import React from 'react';

const PrevButton = ({onPrev}) => {

	return (
		<button onClick={() => onPrev()}>PREVIOUS</button>
	);
};

export default PrevButton;