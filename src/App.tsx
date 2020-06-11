import React from 'react';
import Button from './components/Button/button'

function App() {
  return (
    <div className="App" style={{padding: '4vw'}}>
      <Button
        ripple
        type="primary"
        onClick={e => {console.log(e.target)}}
      >测试测试1</Button>
    </div>
  );
}

export default App;
