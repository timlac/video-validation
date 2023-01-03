import React from 'react';
import { useLocation } from 'react-router-dom';

function TestPage() {
      const location = useLocation();


  return (
    <div>
      <h1>{location.state.mode}</h1>
    </div>
  );
}

export default TestPage;