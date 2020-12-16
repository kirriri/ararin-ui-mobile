import React from 'react';
import Button from '@/components/Button/button'
import Dialog from '@/components/Dialog/dialog'
import Picker from '@/components/Picker/picker'
import './button.scss'

import { PickerTestData, PickerTestData2, PickerTestData3 } from '@/util/dataTest'

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
            <div className="phone_button" style={{padding: '15vw 5vw 10vw', background: '#fff'}}>
                <Button
                    type="success"
                    // ripple
                    state="loading"
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
            </div>
        );
    }
}

export default App;
