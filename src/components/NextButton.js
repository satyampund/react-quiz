import React from 'react';

const NextButton = ({ dispatch, answer }) => {
  if (answer === null) return;
  return (
    <div>
      <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
        Next
      </button>
    </div>
  );
};

export default NextButton;
