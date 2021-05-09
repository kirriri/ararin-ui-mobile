import React from 'react';
import './scratchCard.scss'
import ScratchCard from '../../components/ScratchCard/scratchCard'
import { Notify } from '../../components/Notify/notify';

class PrizeWheelPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        
        this.state = {
            data: [ ],
            value: 2
        }
    }

    lottery = async() => await new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            resolve({
                flag: true,
                index: Math.floor(Math.random()* 5)
            })
        }, 1000)
    })
    
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
        }, 1000)
    })
    
    render() {
        return (
                <div>
                    <style dangerouslySetInnerHTML={{__html: this.getResetStyle()}}/>
                    <div className="phone_prizeWheel" style={{padding: '7vw 5vw 10vw', background: '#fff'}}>
                        <ScratchCard 
                            async
                            hideImg="./imgs/prize_not_open.jpg"
                            openingImg="./imgs/opening.png"
                            loadRequest={this.loadRequest}
                        />
                    </div>
                </div>
        );
    }
}

export default PrizeWheelPage;
