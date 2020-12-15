import React from 'react';
import './icon.scss'
import { postParentIframeMsg } from '@/util/util'

class IconPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        console.log(props)
        this.state = {
            IconState: 'loading',
            visible: false,
            popupVisible: false,
            pickerState: false,
            data: []
        }
    }
    
    componentDidMount() {
        postParentIframeMsg({
            load: true,
            cmp: 'Icon'
        })
    }
 
    render() {

        const { visible, pickerState } = this.state
        
        return (
            <div className="page_Icon">
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

export default IconPage;
