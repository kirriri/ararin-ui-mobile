import React from 'react';
import './input.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Input from '../../components/Input/input'
import Button from '../../components/Button';

class InputPage extends React.Component<any, any> {

    constructor(props) {
        super(props)
        
        this.state = {
            active: -1,
            data: [
                <React.Fragment>
                    <Input 
                        judge="name"
                        title="姓名："
                        placeholder="请输入您的姓名"
                    />
                    <Input 
                        judge="pwd"
                        title="密码："
                        placeholder="请输入6位数字密码"
                    />
                    <Input 
                        judge="mobilePhone"
                        title="手机："
                        placeholder="请输入11位手机号码"
                    />
                    <Input 
                        judge="allIdCard"
                        title="身份证："
                        placeholder="请输入15位或18位身份证"
                    />
                    <Button type="primary" style={{marginTop: '.5rem'}}>提交</Button>
                </React.Fragment>
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