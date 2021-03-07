import React from 'react';
import Button from '../../components/Button/button'
import Popup from '../../components/Dialog/popup'
import './dialog.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class PopupPage extends React.Component<any, any> {

    constructor(props) {
        super(props)
        
        this.state = {
            active: -1,
            visible: false,
            data: [
                ,
                
            ]
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
    
    getResetStyle = () => ``
    
    render() {

        const data = [
            <div>
                <Button
                    type="default"
                    size="sm"
                    onClick={() => {this.setState({visible: true})}}
                >sm 按钮</Button>
                <Popup
                    visible={this.state.visible}
                >
                    test
                </Popup>
            </div>
        ]
        
        return (
            <>
                <style dangerouslySetInnerHTML={{__html: this.getResetStyle()}}/>
                <div className="phone_button" style={{padding: '15vw 5vw 10vw', background: '#fff'}}>
                    {
                        data.map((item, index) => 
                            <CSSTransition 
                                key={`ele_1${index}`} 
                                style={{position: 'relative'}}
                                in={index === this.state.active ? true : false}
                                classNames="eleFocus"
                                timeout={1200}
                                onEntered={() => this.setState({active: -1})}
                            >
                                <div>{item}</div>
                            </CSSTransition>
                        )
                    }
                </div>
            </>
        );
    }
}

export default PopupPage;
