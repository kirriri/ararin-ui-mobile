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
    
    componentDidMount() {
        // this.props.onlo
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