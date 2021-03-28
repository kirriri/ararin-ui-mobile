import React from 'react';
import Icon from '../../components/Icon'
import { IconRes, IconSpecialRes } from '../../components/Icon/IconRes'
import './icon.scss'
import { CSSTransition } from 'react-transition-group'

class IconPage extends React.Component<any, any> {

    showHideTrigger = false
    
    constructor(props: any) {
        super(props)

        
        this.state = {
            active: -1,
            data: [
                <React.Fragment>
                    <ul className="wrapper">
                        {
                            // 合并了iconRes，转换成可渲染数组
                            ( Object.keys(IconRes).map(item => <Icon type={item}/>)
                                .concat(Object.keys(IconSpecialRes).map(item => <Icon type={item}/>)))
                                    .map((item, index) =>
                                        <li key={`cmp_icon${index}`}>
                                            {item}
                                            <p>{item.props.type}</p>
                                        </li>
                            )
                        }
                    </ul>
                </React.Fragment>,
                <div className="list_item">
                    <Icon 
                        state="spin"
                        type="loading"
                        style={{
                            width: '.3rem',
                            height: '.3rem'
                        }}
                        onClick={() => alert('点击成功')}
                    />
                </div>,
                <div className="list_item">
                    <Icon 
                        type="showHide"
                        style={{
                            width: '.3rem',
                            height: '.3rem'
                        }}
                        trigger={this.showHideTrigger}
                        onClick={() => this.handleClickShowHide(2)}
                    />
                </div>
            ],
        }
    }

    handleClickShowHide = (index) => {
        this.setState(prevState => {
            let { data } = prevState
            data[index] =   <div className="list_item">
                                <Icon 
                                    type="showHide"
                                    trigger={!this.showHideTrigger}
                                    onClick={() => this.handleClickShowHide(2)}
                                />
                            </div>
            this.showHideTrigger = !this.showHideTrigger
            return data
        })
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

export default IconPage;
