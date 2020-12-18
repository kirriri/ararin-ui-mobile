import React from 'react';
import Button from '@/components/Button/button'
import './button.scss'

class ButtonPage extends React.Component<any, any> {

    componentDidMount() {
        
    }

    const getResetStyle = (props: any) => 
    
    render() {
        return (
            <>
                <style dangerouslySetInnerHTML={{__html: this.getResetStyle}}/>
                <div className="phone_button" style={{padding: '15vw 5vw 10vw', background: '#fff'}}>
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
                    <Button
                        size="lg"
                        style={{marginTop: '3vw'}}
                        type="primary"
                    >lg 按钮</Button>
                    <Button
                        className="ripple_feedback"
                        size="lg"
                        ripple
                        style={{marginTop: '3vw'}}
                    >水波纹</Button>
                </div>
            </>
        );
    }
}

export default ButtonPage;
