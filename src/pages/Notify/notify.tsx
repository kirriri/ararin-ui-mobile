import React from 'react'
import './notify.scss'
import { Button } from '../../components/Button/button'
import { Notify } from '../../components/Notify/notify'
import { CSSTransition } from 'react-transition-group'
import Icon from '../../components/Icon';

class NotifyPage extends React.Component<any, any> {

    constructor(props) {
        super(props)
        
        this.state = {
            state1: 'static',
            state2: 'static',
            showHideTrigger: true,
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

    render() {

        const data = [
            <React.Fragment>
                <h3>标准提示：</h3>
                <Button 
                    type="primary"
                    ripple
                    onClick={() => {
                        Notify.info('用户密码不能为空', 3)
                    }}
                    style={{marginTop: '.13rem'}}
                >
                    提 示 (info)
                </Button>
                <Button 
                    type="success"
                    ripple
                    onClick={() => {
                        Notify.success('成功！', 3)
                    }}
                    style={{marginTop: '.13rem'}}
                >
                    提 示 (success)
                </Button>
                <Button
                    type="danger"
                    ripple
                    onClick={() => {
                        Notify.failed('失败', 3)
                    }}
                    style={{marginTop: '.13rem'}}
                >
                    提 示 (failed)
                </Button>
            </React.Fragment>,
            <React.Fragment>
                <h3>动画提示：</h3>
                <Button 
                        type="success"
                        ripple
                        onClick={() => {
                            Notify.loading('加载中...', 0)
                            setTimeout(() => Notify.animateSuccess('充值成功！', 3, () => {
                                console.log('end')
                            }), 3000)
                        }}
                        style={{marginTop: '.13rem'}}
                    >提 示 (animateSuccess)</Button>
                <Button 
                    type="danger"
                    ripple
                    onClick={() => {
                        Notify.loading('加载中...', 0)
                        setTimeout(() => Notify.animateFailed('充值失败！'), 3000)
                    }}
                    style={{marginTop: '.13rem'}}
                >提 示 (animateFailed)</Button>
            </React.Fragment>,
            <React.Fragment>
                <h3>自定义：</h3>
                <Button 
                        type="primary"
                        ripple
                        onClick={() => {
                            Notify.info(
                                <div style={{textAlign: 'center', paddingTop: '.13rem'}}>
                                    <Icon type="failed"/>
                                    <p style={{margin: 0}}>测试</p>
                                </div>
                            )
                        }}
                        style={{marginTop: '.13rem'}}
                    >提 示 (info)</Button>
            </React.Fragment>
        ]
        
        return  <div className="page_notify">
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
    }
}

export default NotifyPage