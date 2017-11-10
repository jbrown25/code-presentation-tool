import React from 'react';

const NextButton = ({onNext}) => {

	return (
		<button onClick={() => onNext()}>NEXT</button>
	);
};

export default NextButton;