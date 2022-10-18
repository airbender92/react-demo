import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { Admin } from '@react-demo/react-admin';
import polyglotI18nProvider from '@react-demo/ra-i18n-polyglot';
import { Route } from 'react-router'
import './App.css';

function App() {
  const [state, setState] = useState(0)

    console.log('first render')

  const onClick = () => {
    // setState(() => state + 1)
    console.log('A', state)
  }
  return (
    <div className="App">
      <Admin />
      <button onClick={ onClick}>点击</button>
    </div>
  );
}

export default App;
