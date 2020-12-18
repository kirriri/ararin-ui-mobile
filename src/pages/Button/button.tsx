import React from 'react';
import Button from '@/components/Button/button'
import './button.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class ButtonPage extends React.Component<any, any> {

    constructor(props) {
        super(props)
        
        this.state = {
            active: -1,
            data: [
                <>
                    <Button
                        type="default"
                        size="sm"
                        onClick={() => {this.setState({visible: true})}}
                    >sm 按钮</Button>
                    <Button
                        style={{marginTop: '3vw'}}
                        state="loading"
                        size="sm"
                        onClick={() => {this.setState({visible: true})}}
                    >暂停 按钮</Button>
                    <Button
                        type="danger"
                        style={{marginTop: '3vw'}}
                        onClick={() => {console.log(22222)}}
                    >md 按钮</Button>
                    
                </>,
                <>
                    <Button
                        size="lg"
                        style={{marginTop: '3vw'}}
                        type="primary"
                    >lg 按钮</Button>
                </>
            ]
        }
    }

    componentDidMount() {
        window.addEventListener('message', this.getMsg)
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

        console.log(this.state.active)
        
        return (
            <>
                <style dangerouslySetInnerHTML={{__html: this.getResetStyle()}}/>
                <div className="phone_button" style={{padding: '15vw 5vw 10vw', background: '#fff'}}>
                    <TransitionGroup
                        className="test"
                    >
                        {
                            this.state.data.map((item, index) => 
                                <div 
                                    key={`ele${index}`} 
                                    style={{position: 'relative'}}>
                                    <CSSTransition 
                                        onEntered={() => this.setState({active: -1})}
                                        in={index===this.state.active}
                                        classNames="eleFocus"
                                        timeout={1200}
                                    >
                                        <div>{item}</div>
                                    </CSSTransition>
                                </div>
                            )
                        }
                    </TransitionGroup>

                </div>
            </>
        );
    }
}

export default ButtonPage;
