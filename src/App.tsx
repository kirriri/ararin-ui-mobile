import React from 'react';
import Button from './components/Button/button'
import Icon from './components/Icon/icon'

type StateType = {
    buttonState: string;
};

type propType = {
    buttonState: string;
};

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        this.state = {
            buttonState : 'static'
        }
    }
    
    render() {

        const { buttonState } = this.state
        
        return (
            <div className="App" style={{ height: '130vh', padding: '4vw', paddingTop: '30vw' }}>
                {/* <Button
                    size="sm"
                >测试测试1</Button>
                <Button
                    icon="loading"
                    style={{
                        marginTop: '15px'
                    }}
                    size="md"
                    onClick={e => { console.log(e) }}
                >测试测试2</Button>
                <Button
                    ripple
                    state={buttonState}
                    style={{marginTop: '15px'}}
                    type="success"
                    onClick={() => {
                        this.setState({buttonState: 'loading'})
                        setTimeout(() => {
                            this.setState({
                                buttonState: 'disabled'
                            })
                        }, 1000)
                    }}
                >测试测试3</Button> */}
                
            </div>
        );
    }
}

export default App;
