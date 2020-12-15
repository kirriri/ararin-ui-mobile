import React from 'react';
import './button.scss'

class ButtonPage extends React.Component<any, any> {

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
    
 
    render() {

        const { visible, pickerState } = this.state
        
        return (
            <div className="page_button">
                 111111111111111
            </div>
        );
    }
}

export default ButtonPage;
