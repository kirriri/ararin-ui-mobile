import React from 'react';
import Icon from '../../components/Icon'
import { IconRes } from '../../components/Icon/IconRes'
import './icon.scss'

class IconPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        
        this.state = {
            IconData: Object.keys(IconRes).map((item) => <Icon type={item}/>)
        }
    }

    componentDidMount() {
        window.addEventListener('message', this.getMsg)
        if(window.parent) {
            window.parent.postMessage({load: true}, "*")
        }
    }
    

    componentWillUnmount() {
        window.removeEventListener('message', this.getMsg)
    }

    getMsg =  (e: MessageEvent) => {
        const { index } = e.data
        this.setState({active: index})
    }
    
    getStyle = () => `
    
    `
    
    render() {

        return (
            <>
                <style dangerouslySetInnerHTML={{__html: this.getStyle()}}/>
                <div className="pageIcon" style={{padding: '15vw 5vw 10vw', background: '#fff'}}>
                    <ul className="wrapper">
                        {
                            this.state.IconData.map((item, index) =>
                                <li>
                                    {item}
                                </li>
                            )
                        }
                    </ul>
                    
                </div>
            </>
        );
    }
}

export default IconPage;
