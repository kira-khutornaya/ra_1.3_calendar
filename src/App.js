import React from 'react';
import './App.css';
import Calendar from './Calendar';

function App() {
  const now = new Date(2017, 7, 17);

  return (
    <Calendar date={now} />
  );
}

export default App;
