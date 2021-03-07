import React from 'react';
import Icon from '../../components/Icon'
import { IconRes } from '../../components/Icon/IconRes'
import './icon.scss'
import { CSSTransition } from 'react-transition-group'

class IconPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        
        this.state = {
            active: -1,
            IconData: Object.keys(IconRes).map((item) => <Icon type={item}/>)
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
    
    getStyle = () => `
    
    `
    
    render() {

        return (
            <>
                <style dangerouslySetInnerHTML={{__html: this.getStyle()}}/>
                <div className="pageIcon" style={{padding: '15vw 5vw 10vw', background: '#fff'}}>
                    <CSSTransition 
                        key={`ele_10`} 
                        style={{position: 'relative'}}
                        in={0 === this.state.active ? true : false}
                        classNames="eleFocus"
                        timeout={1200}
                        onEntered={() => this.setState({active: -1})}
                    >
                         <ul className="wrapper">
                            {
                                this.state.IconData.map((item, index) =>
                                    <li key={`cmp_icon${index}`}>
                                        {item}
                                        <p>{item.props.type}</p>
                                    </li>
                                )
                            }
                        </ul>
                    </CSSTransition>
                    <CSSTransition 
                        key={`ele_11`} 
                        style={{position: 'relative'}}
                        in={1 === this.state.active ? true : false}
                        classNames="eleFocus"
                        timeout={1200}
                        onEntered={() => this.setState({active: -1})}
                    >
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
                        </div>
                    </CSSTransition>
                </div>
            </>
        );
    }
}

export default IconPage;
