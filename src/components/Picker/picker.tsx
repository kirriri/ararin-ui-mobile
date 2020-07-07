import React, {
    FC,
    useRef,
    useEffect,
    useState,
} from 'react'
import Popup from '../dialog/popup'
import classNames from 'classnames'
import TouchFeedback from 'rmc-feedback';
import BScroll from 'better-scroll'
import { isObject } from '../../util/type'

export interface BaseDataProps {
    text?: string,
    value?: any,
    children?: BaseDataProps[]
}

export interface BasePickerProps {
    relate?: boolean,
    cancelText?: string,
    okText?: string,
    cancelPress?: (val: any) => void,
    okPress?: (val: any) => void,
    data?: BaseDataProps[],
    visible?: boolean,
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
        ...restProps
    } = props

    useEffect(() => {
        console.log('测试')
            if(relate && data && visible) {
                if(!data.every(item => isObject(item))) {
                    return
                }
                findDepthAndLength(data)
                let tmpArr = new Array(dataDepth.current).fill(new Array(0))
                tmpArr[0] = data
                setRenderData(tmpArr)
            }else {
        
            }
        return () => {
            
        }
    }, [data])   

    useEffect(() => {
        if(!data) {
            return
        }
        // if(relate) {
        //     if(!data.every(item => isObject(item))) {
        //         return
        //     }
        // }else {
        //     if(!data.every(item => Array.isArray(item))) {
        //         return
        //     }
        // }   
        
        if(wrapper.current) {
                if(maxLength.current < PickerBaseData.current.ITEM_MIN_NUM) {
                    PickerBaseData.current.CONTENT_CHID = Math.max(PickerBaseData.current.CONTENT_CHID, PickerBaseData.current.ITEM_MIN_NUM)
                } else if(maxLength.current > PickerBaseData.current.ITEM_MAX_NUM) {
                    PickerBaseData.current.CONTENT_CHID = Math.max(PickerBaseData.current.CONTENT_CHID, PickerBaseData.current.ITEM_MIN_NUM)
                }else {
                    PickerBaseData.current.CONTENT_CHID = 7
                }
                wrapper.current.style.height = PickerBaseData.current.CONTENT_CHID * PickerBaseData.current.ITEM_HEIGHT + 'vw'
                Array.from( wrapper.current.children).forEach((item, index) => {
                    const wheel = new BScroll(item, {
                        wheel: {
                            selectedIndex: 0,
                            wheelWrapperClass: 'wheel-scroll',
                            wheelItemClass: 'wheel-item',
                            wheelDisabledItemClass: 'wheel-disabled-item',
                            rotate: 0,
                        },       
                        useTransition: false,   
                        deceleration: 0.0042,
                        swipeTime: 1100,
                    })  
                    
                    wheel.on('scrollEnd', () => {
                        //滚动完成之后获取当前选取的索引值
                        if(!Number.isNaN(wheel.y)) {
                            const currentIndex = getCurrentIndex(wheel)
                            renderData.forEach((ele, eindex) => {
                                if(eindex >  index) {
                                    if(renderData[index][currentIndex].children) {
                                        renderData[index+1] = renderData[index][currentIndex].children
                                    }else {
                                        renderData[index+1] = []
                                    }
                                }
                            })
                            console.log(renderData)
                            setRenderData(renderData)
                        }
                    })  
                })
        }
        return () => {
        }
    }, [visible === true, data])
    
    const dataDepth = useRef(0)
    const [renderData, setRenderData] = useState([])
    const maxLength = useRef(0)
    const wrapper = useRef(null)
    const PickerBaseData = useRef({
        CONTENT_CHID: 3,
        ITEM_HEIGHT: 10,
        ITEM_MIN_NUM: 7,
        ITEM_MAX_NUM: 9
    })

    const getCurrentIndex = wheel => {
        let heightArr = Array.from(wheel.items).map((item, index) => index * wheel.itemHeight)
        let stopY =  Math.floor(Math.abs(wheel.y))
        if(heightArr.findIndex(item => item === stopY) === -1) {
            heightArr.push(stopY)
            heightArr.sort((a, b) => a - b)
            let currentIndex = heightArr.findIndex(item => item === stopY)
            if(currentIndex === 0) {
               return 1
            }else if(currentIndex === heightArr.length - 1) {
               return heightArr.length - 2
            }else {
                if(Math.abs(heightArr[currentIndex] - heightArr[currentIndex - 1]) <= Math.abs(heightArr[currentIndex + 1] - heightArr[currentIndex])) {
                   return currentIndex - 1
                }else {
                   return currentIndex
                }
            }
        }else {
            return heightArr.findIndex(item => item === stopY)
        }
    }

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
        maxLength.current = currentLength
        dataDepth.current = currentDepth
    }
    
    // if(relate && data && visible) {
    //     if(!data.every(item => isObject(item))) {
    //         return
    //     }
    //     findDepthAndLength(data)
    //     renderData = new Array(dataDepth.current).fill(new Array(0))
    //     renderData[0] = data
    // }else {

    // }

    const renderSelect = () => {
        if(!renderData.length) {
            return
        }
        console.log(renderData)
        if(relate) {
            return  renderData.map(item => 
                        <div className={`${prefixCls}-data-wrapper`}>
                            <ul 
                                onClick={() => console.log(222222222)}
                                className={`${prefixCls}-data-item wheel-scroll`}
                                style={{marginTop: `${Math.floor(PickerBaseData.current.CONTENT_CHID / 2)}0vw`}}
                            >
                                {item.map((item, index) => 
                                    <li onClick={() => console.log(index)} className="wheel-item">
                                        {item.text}
                                    </li>
                                )}
                            </ul>
                            <div  className={`${prefixCls}-item-mask`}></div>
                            <div  className={`${prefixCls}-item-focus`}></div>
                        </div>
                    )
        }
    }
    
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
                    <span className={`${prefixCls}-header-item ${prefixCls}-header-item-highlight`}>{okText}</span>
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
                    <div style={{height: '100%', position: 'relative'}}>
                        <div className={`${prefixCls}-data-content`} ref={wrapper}>
                            {renderSelect()}

                        </div>
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
    data: []
}

export default Picker