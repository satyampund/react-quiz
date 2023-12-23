import React, { useEffect, useReducer } from 'react';
import Header from './Header.js';
import Main from './Main.js';

const initialState = {
  questions: [],
  //loading, error, ready, active, finished,
  status: 'loading',
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    default:
      throw new Error('Unknown error');
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Questions?</p>
      </Main>
    </div>
  );
};

export default App;
