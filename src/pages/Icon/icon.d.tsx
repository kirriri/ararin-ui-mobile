import React from 'react';
import './icon.scss'

class ButtonPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        console.log(props)
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
        // window.parent.reload()
    }
 
    render() {

        const { visible, pickerState } = this.state
        
        return (
            <div className="page_button">
                 icon
                 icon
                 icon
                 icon
                 iconicon
                 icon
                 icon
                 icon
                 icon
            </div>
        );
    }
}

export default ButtonPage;
