import React from 'react';
import './button.scss'
import { postParentIframeMsg } from '@/util/util'
import ReactMarkdown from 'react-markdown'

class ButtonPage extends React.PureComponent<any, any> {

    constructor(props: any) {
        super(props)
        
        this.state = {
            markText: '# 这是标题\n' +
            '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
            '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
             '**这是加粗的文字**\n\n' +
            '*这是倾斜的文字*`\n\n' +
            '***这是斜体加粗的文字***\n\n' +
            '~~这是加删除线的文字~~ \n\n'+
            '\`console.log(Hello World)\` \n\n'+
            '```const a=2; ```'
        }
    }
    
    componentDidMount() {
        postParentIframeMsg({
            load: true,
            cmp: 'Button'
        })
    }
 
    render() {

        const { visible, pickerState } = this.state
        
        return (
            <div className="page_button">
                 <ReactMarkdown 
                    source={this.state.markText} 
                    escapeHtml={false}  //不进行HTML标签的转化
                />
            </div>
        );
    }
}

export default ButtonPage;
