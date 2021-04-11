import React from 'react';
import './input.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Input from '../../components/Input/input'
import Button from '../../components/Button';
import { Notify } from '../../components/Notify/notify';

class InputPage extends React.Component<any, any> {

    constructor(props) {
        super(props)
        
        this.state = {
            active: -1,
            times: 0,
            codeText: '点击获取'
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
        Notify.hide()
    }

    getMsg =  (e: MessageEvent) => {
        const { index } = e.data
        this.setState({active: index})
    }
    
    getResetStyle = () => ``

    handleClickCode = () => {
        Notify.loading('发送中', 0)
        let times = 60
        const timer = setInterval(() => {
            this.setState({times})
            if(times == 0) {
                clearInterval(timer)
                return 
            }
            if(times == 57) {
                Notify.animateSuccess('发送成功', 3)
            }
            times--

        }, 1000)
    }
    
    render() {

        const data= [
                <Input 
                    judge="name"
                    title="姓名："
                    placeholder="请输入您的姓名"
                />,
                <Input 
                    judge="pwd"
                    title="密码："
                    placeholder="请输入6位数字密码"
                />,
                <Input 
                    judge="mobilePhone"
                    title="手机："
                    placeholder="请输入11位手机号码"
                />,
                <Input 
                    judge="allIdCard"
                    title="身份证："
                    placeholder="请输入15位或18位身份证"
                />,
                <Input 
                    judge="code"
                    title="验证码："
                    placeholder="请输入4位数验证码"
                    codeTxt={this.state.codeText}
                    times={this.state.times}
                    onClick={this.handleClickCode}
                />
                // <Button type="primary" style={{marginTop: '.5rem'}}>提交</Button>
        ]

        return (
            <>
                <style dangerouslySetInnerHTML={{__html: this.getResetStyle()}}/>
                <div className="phone_input" style={{padding: '15vw 5vw 10vw', background: '#fff'}}>
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

export default InputPage;