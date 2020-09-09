import React, {
    FC,
    useRef,
    useEffect,
    useState,
} from 'react'
import Popup from '../dialog/popup'
import classNames from 'classnames'
import TouchFeedback from 'rmc-feedback';

export interface BaseDataProps {
    text?: string,
    value?: any,
    children?: BaseDataProps[]
}

export interface BasePickerProps {
    relate?: boolean,
    cancelText?: string,
    okText?: string,
    cancelPress?: () => void,
    okPress?: (val: any) => void,
    data?: BaseDataProps[],
    visible?: boolean,
    history?: boolean,
    style?: React.CSSProperties,
    className?: string,
    title?: React.ReactNode,
    prefixCls?: string,
    maskClosable?: boolean,
    
}

export const Picker: FC<BasePickerProps> = props => {

    const {
        data,
        relate,
        className,
        style,
        visible,
        title,
        cancelText,
        cancelPress,
        okText,
        okPress,
        prefixCls,
        history,
        ...restProps
    } = props

    let renderData = []
    const wrapper = useRef(null)
    const PickerBaseData = useRef({
        HEIGHT: '50VW',
        CONTENT_CHID: 3,
        ITEM_HEIGHT: 10,
        ITEM_MIN_NUM: 7,
        ITEM_MAX_NUM: 9
    })

    // 查询数据深度
    const findDepthAndLength = data => {
        let currentDepth = 0
        let currentLength = data.length
        const depthAndLengthCount = (item, depth, length) => {
            depth++
            if(currentDepth <= depth) {
                currentDepth = depth
            }
            if(!item.children) {
                return
            }
            if(currentLength < item.children.length) {
                currentLength = item.children.length
            }
            item.children.forEach(sitem => {
                depthAndLengthCount(sitem, depth, length)
            })
        }
        data.forEach(item => {
            if(!item.children) {
                return
            }
            depthAndLengthCount(item, 0, 0)
        })
        return {currentLength, currentDepth}
    }
    
    // 计算renderData 数据
    const getCalRenderData = (tmpRData, index, currentIndex) => {
        tmpRData.forEach((ritem, rindex) => {
            if(rindex >= index && tmpRData[rindex+1]) {
                if(tmpRData[rindex][currentIndex] && tmpRData[rindex][currentIndex].children) {
                    tmpRData[rindex + 1] = tmpRData[rindex][currentIndex].children
                } else {
                    tmpRData[rindex + 1] = []
                }
            }  
        })
        return tmpRData
    }

    const dataProps = findDepthAndLength(data)
    let baseArr = new Array(dataProps.currentDepth).fill(new Array(0))
    baseArr[0] = data
    baseArr = getCalRenderData(baseArr, 0, 0)
    renderData = baseArr
    


    // 渲染renderData
    if(0 < PickerBaseData.current.ITEM_MIN_NUM) {
        PickerBaseData.current.CONTENT_CHID = Math.max(PickerBaseData.current.CONTENT_CHID, PickerBaseData.current.ITEM_MIN_NUM)
    } else if(0 > PickerBaseData.current.ITEM_MAX_NUM) {
        PickerBaseData.current.CONTENT_CHID = Math.max(PickerBaseData.current.CONTENT_CHID, PickerBaseData.current.ITEM_MIN_NUM)
    }else {
        PickerBaseData.current.CONTENT_CHID = 7
    }
    PickerBaseData.current.HEIGHT = PickerBaseData.current.CONTENT_CHID * PickerBaseData.current.ITEM_HEIGHT + 'vw'
        
 
    //  渲染title
    let reTit
    if(typeof title === 'string' || !title) {
        reTit = 
            <h3 className={`${prefixCls}-header`}>
                <TouchFeedback activeClassName={`${prefixCls}-header-item-active`}>
                    <span onClick={cancelPress} className={`${prefixCls}-header-item`}>{cancelText}</span>
                </TouchFeedback>
                <span>{title}</span>
                <TouchFeedback activeClassName={`${prefixCls}-header-item-active `}>
                    <span 
                        className={`${prefixCls}-header-item ${prefixCls}-header-item-highlight`}
                    >{okText}</span>
                </TouchFeedback>
            </h3>
    }else {
        reTit = title
    }

    return <>
                <Popup
                    onClose={cancelPress}
                    visible={visible}
                    title={reTit}
                    {...restProps}
                >
                    <div className={`${prefixCls}-data-content`} style={{height: PickerBaseData.current.HEIGHT}}>
                        {
                            renderData && renderData.map((item, index) => 
                                <div className={`${prefixCls}-data-wrapper`} key={index}>
                                    <ul 
                                        className={`${prefixCls}-data-item wheel-scroll`}
                                        style={{marginTop: `${Math.floor(PickerBaseData.current.CONTENT_CHID / 2)}0vw`}}
                                    >
                                        {item.map((sitem, sindex) => 
                                            <li className="wheel-item" key={sindex}>
                                                {sitem.text}
                                            </li>
                                        )}
                                    </ul>
                                    <div  className={`${prefixCls}-item-mask`}></div>
                                    <div  className={`${prefixCls}-item-focus`}></div>
                                </div>
                            )
                        }
                    </div>
                </Popup>
           </>
}

Picker.defaultProps = {
    prefixCls: 'apk',
    cancelText: '取消',
    okText: '确定',
    maskClosable: true,
    relate: true,
    data: [],
    history: false
}

export default Picker