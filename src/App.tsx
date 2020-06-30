import React from 'react';
import Button from './components/Button/button'
import Dialog from './components/dialog/dialog'

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        this.state = {
            buttonState: 'loading',
            visible: false
        }
    }
    
    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         buttonState: 'failed'
        //     })
        // }, 2000)
    }
    
    render() {

        const { visible } = this.state
        
        return (
            <div className="App" style={{ height: '130vh', padding: '4vw', paddingTop: '30vw' }}>
                <Button
                    ripple
                    type="primary"
                    onClick={() => {this.setState({visible: !visible})}}
                >弹窗</Button>
                <Button
                    style={{marginTop: '5vw'}}
                    ripple
                    type="primary"
                    onClick={() => {this.setState({visible: !visible})}}
                >弹窗</Button>
                <Dialog 
                    onClose={() => this.setState({visible: false})}
                    title={<h3>标题测试</h3>} 
                    visible={visible}
                    footer={[
                        {text: '取消', onPress: () => {this.setState({visible: false})}}, 
                        {text: '确定', onPress: () => {this.setState({visible: false})}, higlight: true}]}
                >
                   
                </Dialog>
            </div>
        );
    }
}

export default App;
