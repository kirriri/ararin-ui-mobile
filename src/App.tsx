import React from 'react';
import Button from './components/Button/button'
import Icon from './components/Icon/icon'
import Dialog from './components/dialog/dialog'

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        this.state = {
            buttonState: 'static',
            visible: false
        }
    }
    
    render() {

        const { visible } = this.state
        
        return (
            <div className="App" style={{ height: '130vh', padding: '4vw', paddingTop: '30vw' }}>
                <Button
                    type="primary"
                    ripple
                    onClick={() => {this.setState({visible: !visible})}}
                >弹窗</Button>
                <Dialog 
                    onClose={() => this.setState({visible: false})}
                    maskClosable={true}
                    // title="测试" 
                    visible={visible}
                    maskAnimation="fade"
                >
                    <p>first dialog</p>
                </Dialog>
            </div>
        );
    }
}

export default App;
