import React from 'react';
import Button from '../../components/Button/button'
import './button.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class InputPage extends React.Component<any, any> {

    constructor(props) {
        super(props)
        
        this.state = {
            active: -1,
            data: [
                <div>
                    
                </div>,
                <div>
                
                </div>
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
        return (
            <>
                <style dangerouslySetInnerHTML={{__html: this.getResetStyle()}}/>
                <div className="phone_button" style={{padding: '15vw 5vw 10vw', background: '#fff'}}>
                    {
                        this.state.data.map((item, index) => 
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

export default InputPage;