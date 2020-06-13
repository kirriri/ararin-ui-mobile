import React from 'react';
import Button from './components/Button/button'

function App() {
    return (
        <div className="App" style={{ height: '130vh', padding: '4vw', paddingTop: '30vw' }}>
            <Button
                ripple
                size="sm"
            >测试测试1</Button>
            <Button
                style={{
                    marginTop: '15px'
                }}
                size="md"
                onClick={e => { console.log(e) }}
            >测试测试2</Button>
            <Button
                style={{marginTop: '15px'}}
                type="primary"
                onClick={e => { console.log(e) }}
            >测试测试3</Button>
        </div>
    );
}

export default App;
