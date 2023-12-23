import React, { useEffect, useReducer } from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Loader from './components/Loader.js';
import Error from './components/Error.js';
import StartScreen from './components/StartScreen.js';
import Question from './components/Question.js';

const initialState = {
  questions: [],
  //loading, error, ready, active, finished,
  status: 'loading',
  index: 0,
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
    case 'start':
      return {
        ...state,
        status: 'active',
      };
    default:
      throw new Error('Unknown error');
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index } = state;

  const numQuestions = questions.length;
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
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dipatch={dispatch} />}
        {status === 'active' && <Question question={questions[index]} />}
      </Main>
    </div>
  );
};

export default App;
