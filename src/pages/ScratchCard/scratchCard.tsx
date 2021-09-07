import React from 'react';
import './scratchCard.scss'
import ScratchCard from '../../components/ScratchCard/scratchCard'
import { Notify } from '../../components/Notify/notify';
import Dialog from '../../components/Dialog/dialog';
import Button from '../../components/Button';

class PrizeWheelPage extends React.Component<any, any> {

    contentRef1: React.RefObject<any>
    contentRef2: React.RefObject<any>
    
    constructor(props: any) {
        super(props)
        
        this.state = {
            data: [ ],
            value: 2,
            prizeBoxFlag: false
        }

        this.contentRef1 = React.createRef<any>()
        this.contentRef2 = React.createRef<any>()
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

    loadRequest = async() => await new Promise<any>((resolve, reject) => {
        Notify.loading('出奖中...', 0)
        setTimeout(() => {
            Notify.hide()
            resolve({
                img: './imgs/btn_lottery.jpg'
            })
            this.setState({ prizeBoxFlag: true })
        }, 1000)
    })
    
    render() {
        return (
                <div>
                    <style dangerouslySetInnerHTML={{__html: this.getResetStyle()}}/>
                    <div className="phone_prizeWheel" style={{padding: '7vw 5vw 10vw', background: '#fff'}}>
                        {/* <ScratchCard 
                            ref={this.contentRef1}
                            async
                            // style={{top: '70vw', position: 'absolute'}}
                            hideImg="./imgs/prize_not_open.jpg"
                            openingImg="./imgs/opening.png"
                            loadRequest={this.loadRequest}
                        /> */}
                        <ScratchCard 
                            style={{marginTop: '3vw'}}
                            ref={this.contentRef2}
                            hideImg="./imgs/prize_not_open.jpg"
                            prizeImg="./imgs/btn_lottery.jpg"
                            successFun={() => this.setState({ prizeBoxFlag: true })}
                        />
                        <Button 
                            onClick={() => {
                                // this.contentRef1.current.reset()
                                this.contentRef2.current.reset()
                            }} 
                            type="primary" 
                            style={{margin: '7vw auto 0'}}>重置</Button>
                        <Dialog
                            onClose={() => this.setState({prizeBoxFlag: false})}
                            visible={this.state.prizeBoxFlag}
                        >
                            <img style={{width: '100%'}} src={require('../../images/tickets.png')}/>
                        </Dialog>
                    </div>
                </div>
        );
    }
}

export default PrizeWheelPage;
