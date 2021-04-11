import React, {
    FC,
    useImperativeHandle,
    useEffect
} from 'react'
import Icon, { IconType } from '../Icon';
import { iconType } from './notify'

export interface NotifyCmpProps {
    prefixCls: string,
    type: string,
    content: React.ReactNode,
}

export const NotifyCmp = React.forwardRef<any, NotifyCmpProps>((props, ref) => {

    const {
        prefixCls,
        type,
        content,
    } = props

    const [state, setState] = React.useState<IconType>('static')
    const [renderCon, setRenderCon] = React.useState<React.ReactNode>('')

    useEffect(() => {
        setRenderCon(() => content)
    }, [content])

    useImperativeHandle(ref, () => {
        return {
            setCurrentData,
            setCurrentState,
            setCurrentContent
        }
    })

    const setCurrentData = (
            state: IconType, 
            con: React.ReactNode 
        ): void => {
        setCurrentState(state)
        setCurrentContent(con)
    }
    
    const setCurrentState = (v: IconType): void => setState(() => v)

    const setCurrentContent = (v: React.ReactNode): void => setRenderCon(() => v)

    return  <div className={`${prefixCls}-text ${iconType[type] ? `${prefixCls}-with-icon` : ''}`}>
                { iconType[type] && <div className={`${prefixCls}-text-icon`}>
                            <Icon type={iconType[type]} state={state}/>
                        </div> }
                <div>{renderCon}</div>
            </div>
})