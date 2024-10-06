import React from 'react';
import FlowCanvas from './components/FlowCanvas';
import Sidebar from './components/Sidebar';
import './styles/FlowStyles.css';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <FlowCanvas />
    </div>
  );
};

export default App;