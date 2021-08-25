import React from 'react';
import './prizeWheel.scss'
import PrizeWheel, { prizeWheelRefProps } from '../../components/PrizeWheel/prizeWheel'
import Dialog from '../../components/Dialog/dialog';
import Button from '../../components/Button';

class PrizeWheelPage extends React.Component<any, any> {

    prizeWheelRef: React.RefObject<prizeWheelRefProps>
    
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
                    // img: <img src="./imgs/present_05.png" alt=""/>,
                    img: './imgs/present_05.png',
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
            dialogVisible: false,
            award: {
                awardIndex: '',
                title: '',
                imgSrc: ''
            }
        }

        this.prizeWheelRef = React.createRef()
    }

    lottery = () => {
        let awardIndex = Math.floor(Math.random()* 5)
        console.log(awardIndex)
        setTimeout(() => {
            this.prizeWheelRef.current.setPrize(awardIndex)
        }, 1000)
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

    handleCloseDialog = () => {
        this.setState({ dialogVisible: false })
    }
    
    getResetStyle = () => `
        .aad-body {
            padding: .1rem;
            display: flex;
            align-items: center;
            flex-direction: column;
        }

    `
    
    render() {
        return (
                <div>
                    <style dangerouslySetInnerHTML={{__html: this.getResetStyle()}}/>
                    <div className="phone_prizeWheel" style={{padding: '7vw 5vw 10vw', background: '#fff'}}>
                        <PrizeWheel 
                            ref={this.prizeWheelRef}
                            onClick={this.lottery}
                            arrowStyle={{top: '48%'}}
                            arrowImg={<img src={require('../../images/lottery_arrow.png')} alt=""/>}
                            data={this.state.data}
                            successFun={v => {
                                console.log(v)
                                this.setState({
                                    award: v,
                                    dialogVisible: true
                                })
                            }}
                        />
                        <Dialog
                            visible={this.state.dialogVisible}
                            title="中奖提示"
                            onClose={this.handleCloseDialog}
                        >
                            <img style={{width: '50%'}} src={this.state.award.imgSrc}/>
                            <Button onClick={this.handleCloseDialog} style={{width: '100%', marginTop: '.3rem'}} type="primary">关闭</Button>
                        </Dialog>
                    </div>
                </div>
        );
    }
}

export default PrizeWheelPage;
