import React from 'react';
import './prizeSudoku.scss'
import PrizeSudoku from '../../components/PrizeSudoku/prizeSudoku'

class PrizeSudokuPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        
        this.state = {
            data: [],
            value: 2
        }
    }
    
    componentDidMount() {
        window.addEventListener('message', this.getMsg)
        if(window.parent) {
            window.parent.postMessage({load: true}, "*")
        }

        setTimeout(() => {
            this.setState({
                data: [
                    {
                        title: '滴滴出行 快车 20元券',
                        img: './imgs/present_01.jpg',
                    },
                    {
                        title: 'COSTA 折扣服务券 30元',
                        img: './imgs/present_02.jpg',
                    },{
                        title: '猫眼电影 电影代金券 20元',
                        img: './imgs/present_03.jpg',
                    },{
                        title: '谢谢参与',
                        img: <img src="./imgs/present_04.jpg" alt=""/>,
                    },{
                        title: '',
                        img: './imgs/btn_lottery.jpg',
                    },{
                        title: '哈根达斯 折扣服务券 35元',
                        img: './imgs/present_06.jpg',
                        id: '1'
                    },{
                        title: '必胜客 折扣服务券 50元',
                        img: './imgs/present_07.jpg',
                    },{
                        title: '鲜丰水果 优惠服务券 20元',
                        img: './imgs/present_08.jpg',
                    },{
                        title: '网易云音乐 黑胶VIP 3个月',
                        img: './imgs/present_09.jpg',
                    }
                ]
            })
        }, 1500)
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.getMsg)
    }

    getMsg =  (e: MessageEvent) => {
        const { index } = e.data
        this.setState({active: index})
    }

    lottery = async() => await new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            let awardIndex = Math.floor(Math.random()* 9)
            console.log(5)
            resolve({
                flag: true,
                index: 5
            })
        }, 1000)
    })
    
    getResetStyle = () => ``
    
    render() {
        return (
                <div>
                    <style dangerouslySetInnerHTML={{__html: this.getResetStyle()}}/>
                    <div className="phone_prizeSudoku" style={{padding: '7vw 5vw 10vw', background: '#fff'}}>
                        <PrizeSudoku 
                            onClick={this.lottery}
                            data={this.state.data}
                        />
                    </div>
                </div>
        );
    }
}

export default PrizeSudokuPage;
