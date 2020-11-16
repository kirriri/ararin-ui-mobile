import React from 'react';
import Button from './components/Button/button'
import Dialog from './components/Dialog/dialog'
import Picker from './components/Picker/picker'
import './app.scss'

import { PickerTestData, PickerTestData2, PickerTestData3 } from './util/dataTest'

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        
        this.state = {
            buttonState: 'loading',
            visible: false,
            popupVisible: false,
            pickerState: false,
            data: []
        }
    }
    
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: PickerTestData2
            })
        }, 1000)
    }
    
    render() {

        const { visible, pickerState } = this.state
        
        return (
            <div className="App" style={{padding: '15vw 5vw 0'}}>

                
                        <Button
                            type="success"
                            // ripple
                            // state="loading"
                            size="sm"
                            onClick={() => {this.setState({visible: true})}}
                        >弹窗</Button>
                        <Button
                            type="danger"
                            ripple
                            style={{marginTop: '.15rem'}}
                            onClick={() => {console.log(22222)}}
                        >弹窗</Button>
                        <Button
                            ripple
                            size="lg"
                            style={{marginTop: '.15rem'}}
                            type="primary"
                            onClick={() => {this.setState({pickerState: !pickerState})}}
                        >选择器</Button>
                        
                        <Picker
                            // history
                            maskClosable={true}
                            cancelPress={() => {this.setState({pickerState: !pickerState})}}
                            okPress={(val) => {console.log(val); this.setState({pickerState: !pickerState})}}
                            data={this.state.data}
                            visible={this.state.pickerState}
                        ></Picker>
                        <Dialog 
                            maskClosable
                            title={<h3>标题测试</h3>} 
                            visible={visible}
                            footer={[
                                {text: '取消', onPress: () => {this.setState({visible: false})}}, 
                                {text: '确定', onPress: () => {this.setState({visible: false})}, higlight: true}]}
                        >
                            测试测试测试
                        </Dialog>
                 
            </div>
        );
    }
}

export default App;
