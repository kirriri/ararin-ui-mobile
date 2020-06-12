import React from 'react';
import Button from './components/Button/button'

function App() {
  return (
    <div className="App" style={{padding: '4vw'}}>
      <Button
        ripple
        type="danger"
        onClick={e => {console.log(e.target)}}
      >测试测试1</Button>
      <Button
        style={{marginTop: '15px'}}
        type="primary"
        onClick={e => {console.log(e.target)}}
      >测试测试2</Button>
    </div>
  );
}

export default App;
