import React from 'react';
import Button from '../../components/Button/button'
import Input from '../../components/Input/input'
import Popup from '../../components/Dialog/popup'
import './dialog.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Icon } from '../../indexCmp';

class PopupPage extends React.Component<any, any> {

    constructor(props) {
        super(props)
        
        this.state = {
            active: -1,
            visible: false,
            times: 0,
            codeText: '点击获取',
            data: [
                
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
    
    getResetStyle = () => `
        .login_popup {
            border-radius: .1rem .1rem 0 0;
        }

        .login_popup .aap-body {
            padding: .2rem .25rem .3rem;
        }

        .login_popup .aap-body .ararin-button {

        }
    `
    
    render() {

        const data = [
            <div>
                <Button
                    type="default"
                    size="sm"
                    onClick={() => {this.setState({visible: true})}}
                >登 录</Button>
                <Popup
                    className="login_popup"
                    visible={this.state.visible}
                    maskClosable
                    closeIcon
                    onClose={() => this.setState({visible: false})}
                    title="登 录"
                >
                    <Input 
                        judge="mobilePhone"
                        title="手机号码："
                        placeholder="请输入您的手机号码"
                    />
                    <Input 
                        judge="msgCode"
                        title="验证码："
                        placeholder="请输入4位数验证码"
                        codeTxt={this.state.codeText}
                        times={this.state.times}
                    />
                    <Button 
                        type="primary"
                        ripple
                        size="sm"
                        style={{marginTop: '.3rem'}}
                    >
                        立即登录
                    </Button>
                </Popup>
            </div>
        ]
        
        return (
            <>
                <style dangerouslySetInnerHTML={{__html: this.getResetStyle()}}/>
                <div className="phone_dialog" style={{padding: '15vw 5vw 10vw', background: '#fff'}}>
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
