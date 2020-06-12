import React from 'react';
import Button from './components/Button/button'

function App() {
  return (
    <div className="App" style={{height: '130vh', padding: '4vw', paddingTop: '30vw'}}>
      <Button
        ripple
        type="success"
        state="loading"
        onClick={e => {console.log(e)}}
        onTouchStart={e => {console.log(e)}}
        onDoubleClick={e => {console.log(e)}}
      >测试测试1</Button>
      <Button
        style={{marginTop: '15px'}}
        type="primary"
        size="lg"
        disabled
        onTouchStart={e => {console.log(e)}}
        onClick={e => {console.log(e)}}
      >测试测试2</Button>
    </div>
  );
}

export default App;
