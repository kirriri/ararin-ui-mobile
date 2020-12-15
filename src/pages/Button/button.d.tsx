import React from 'react';
import './button.scss'
import { postParentIframeMsg } from '@/util/util'

class ButtonPage extends React.PureComponent<any, any> {

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
        postParentIframeMsg({
            load: true,
            cmp: 'Button'
        })
    }
 
    render() {

        const { visible, pickerState } = this.state
        
        return (
            <div className="page_button">
                 button
                 button
                 button
                 button
                 button
                 buttonbutton
                 button
                 button
            </div>
        );
    }
}

export default ButtonPage;
