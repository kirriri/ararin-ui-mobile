import React from 'react';
import './prizeWheel.scss'
import PrizeWheel from '../../components/PrizeWheel/prizeWheel'

class PrizeWheelPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        
        this.state = {
            data: [
                {
                    title: '1元',
                    img: './imgs/present_01.png',
                    bgColor: '#FDEEBD',
                    txtColor: '#fa4445'
                },
                {
                    title: '1元',
                    img: './imgs/present_01.png',
                    bgColor: '#FFC200',
                    txtColor: '#fa4445'
                },{
                    title: '2元',
                    img: './imgs/present_02.png',
                    bgColor: '#FDEEBD',
                    txtColor: '#fa4445'
                    
                },{
                    title: '5元',
                    img: <img src="./imgs/present_05.png" alt=""/>,
                    bgColor: '#FFC200',
                    txtColor: '#fa4445'

                },{
                    title: '10元',
                    img: './imgs/present_10.png',
                    bgColor: '#FDEEBD',
                    txtColor: '#fa4445'

                },{
                    title: '1000元',
                    img: './imgs/present_1000.png',
                    bgColor: '#FFC200',
                    txtColor: '#fa4445'
                }
            ],
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
    
    render() {
        return (
                <div>
                    <style dangerouslySetInnerHTML={{__html: this.getResetStyle()}}/>
                    <div className="phone_prizeWheel" style={{padding: '7vw 5vw 10vw', background: '#fff'}}>
                        <PrizeWheel 
                            onClick={this.lottery}
                            arrowStyle={{top: '48%'}}
                            arrowImg={<img src={require('../../images/lottery_arrow.png')} alt=""/>}
                            data={this.state.data}
                            successFun={v => console.log(v)}
                            failedFun={() => console.log('failed')}
                        />
                    </div>
                </div>
        );
    }
}

export default PrizeWheelPage;
