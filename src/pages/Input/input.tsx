import React from 'react';
import './input.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Input from '../../components/Input/input'

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
                <div className="phone_input" style={{padding: '15vw 5vw 10vw', background: '#fff'}}>
                    <Input />
                </div>
            </>
        );
    }
}

export default InputPage;