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

    const wheels = useRef([])
    const touchIndex = useRef(0)
<<<<<<< HEAD
    const selectedIndex = useRef([])
=======
    const touchItemIndex = useRef(0)
>>>>>>> e0aa5da47f431d8a7c3c60161f83b6def8e99836
    const [sketchRenderData, setSketchRenderData] = useState([])
    const [renderData, setRenderData] = useState([])
    const wrapper = useRef(null)
    const PickerBaseData = useRef({
        CONTENT_CHID: 3,
        ITEM_HEIGHT: 10,
        ITEM_MIN_NUM: 7,
        ITEM_MAX_NUM: 9
    })

    // 更新renderData后刷新bscroll
    useEffect(() => {
<<<<<<< HEAD
        Array.from(wheels.current).forEach(item => item.refresh())
=======
        for(let i = 0; i < wheels.current.length; i++ ) {
            if(i > touchIndex.current) {
                wheels.current[i].refresh()
                // wheels.current[i].wheelTo(0)
            }
        }
>>>>>>> e0aa5da47f431d8a7c3c60161f83b6def8e99836
    }, [renderData])

    useEffect(() => {
        if(!data.every(item => isObject(item))) {
            return
        }
        const dataProps = findDepthAndLength(data)
        selectedIndex.current = new Array(dataProps.currentDepth).fill(new Array(0))
    }, [data])

    // 渲染数据骨架&初始化渲染数据
    useEffect(() => {
        if(!data.every(item => isObject(item))) {
            return
        }
        const dataProps = findDepthAndLength(data)
        let baseArr = new Array(dataProps.currentDepth).fill(new Array(0))
        setSketchRenderData(baseArr)
        baseArr[0] = data
        baseArr = getCalRenderData(baseArr, 0, 0)
        setRenderData(baseArr)
    }, [data, visible])

    useEffect(() => {
        if(visible) {
<<<<<<< HEAD
            document.addEventListener('touchmove', touchFix);
=======
            // document.body.style.position = 'fixed'
            // document.body.style.width = '100%'
            document.addEventListener('touchmove', touchFix, { passive: false });
>>>>>>> e0aa5da47f431d8a7c3c60161f83b6def8e99836
        }else {
            document.removeEventListener('touchmove', touchFix)
        }
        return () => {
            document.removeEventListener('touchmove', touchFix)
        }
    }, [visible])

    const touchFix = e => {
        e.preventDefault();
    }

    // 查询选择的index
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

    // 计算renderData 滚动数据
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

    // 渲染renderData，绑定better-scroll
    useEffect(() => {
        if(wrapper.current && visible) {
                if(0 < PickerBaseData.current.ITEM_MIN_NUM) {
                    PickerBaseData.current.CONTENT_CHID = Math.max(PickerBaseData.current.CONTENT_CHID, PickerBaseData.current.ITEM_MIN_NUM)
                } else if(0 > PickerBaseData.current.ITEM_MAX_NUM) {
                    PickerBaseData.current.CONTENT_CHID = Math.max(PickerBaseData.current.CONTENT_CHID, PickerBaseData.current.ITEM_MIN_NUM)
                }else {
                    PickerBaseData.current.CONTENT_CHID = 7
                }
                wrapper.current.style.height = PickerBaseData.current.CONTENT_CHID * PickerBaseData.current.ITEM_HEIGHT + 'vw'
                wheels.current = Array.from( wrapper.current.children).map((item, index) => {
                    const wheel = new BScroll(item, {
                        wheel: {
                            selectedIndex: history ? selectedIndex.current[index] : 0,
                            wheelWrapperClass: 'wheel-scroll',
                            wheelItemClass: 'wheel-item',
                            wheelDisabledItemClass: 'wheel-disabled-item',
                            rotate: 0,
                        },       
<<<<<<< HEAD
                        momentum: false,
                        click: false,
=======
                        // useTransition: false,   
                        deceleration: 1,
                        swipeTime: 1000,
>>>>>>> e0aa5da47f431d8a7c3c60161f83b6def8e99836
                    })  
                    wheel.touchProps = {
                        one: -1,
                        two: -1
                    }
                    wheel.on('scrollEnd', () => {
                        // 滚动完成之后获取当前选取的索引值,设置后续联动的数据
                        if(!Number.isNaN(wheel.y)) {
                            const currentIndex = getCurrentIndex(wheel)
<<<<<<< HEAD
                            if(index === wheel.touchProps.one && currentIndex === wheel.touchProps.two) {
                                return
                            }
                            // const currentIndex = wheel.getSelectedIndex()
                            setRenderData(rData => {
                                let tmpRData = JSON.parse(JSON.stringify(rData))
                                selectedIndex.current[index] = currentIndex
                                console.log(getCalRenderData(tmpRData, index, currentIndex))
                                return getCalRenderData(tmpRData, index, currentIndex)
                            })
                            wheel.touchProps.two = currentIndex
                        }
                    }) 
                    wheel.on('scrollStart', () => {
                        wheel.touchProps.one = index
                        wheel.touchProps.two = getCurrentIndex(wheel)
=======
                            if(touchItemIndex.current !== currentIndex) {
                                setRenderData(rData => {
                                    let tmpRData = JSON.parse(JSON.stringify(rData))
                                    return getCalRenderData(tmpRData, index, currentIndex)
                                })
                            }
                            // const currentIndex = wheel.getSelectedIndex()
                            Array.from(wheels.current).forEach(((sitem, sindex) => sitem.enable()))
                        }
                    }) 
                    wheel.on('scrollStart', () => {
                        touchIndex.current = index
                        touchItemIndex.current = getCurrentIndex(wheel)
                    })
                    wheel.on('beforeScrollStart', () => {
                        setRenderData(rData => {
                            if(rData[index].length === 0) {
                                return rData
                            }
                            Array.from(wheels.current).forEach(((sitem, sindex) => {
                                if(sindex !== index ) {
                                    sitem.disable()
                                }
                            }))
                            return rData
                        })
>>>>>>> e0aa5da47f431d8a7c3c60161f83b6def8e99836
                    })
                    return wheel 
                })
        }
        return () => {
            wheels.current.forEach(item => item.destroy())
        }
    }, [sketchRenderData, visible])

    

    const handleOkClick = () => {
        if(!Array.from((wheels.current)).some((item, index) => {
            if(renderData[index].length === 0 && item.isInTransition) {
                return false
            }else {
                return item.isInTransition
            }
        })) {
            let returnData = []
            renderData.forEach((item, index) => {
                const rindex = wheels.current[index].getSelectedIndex()
                if (item.length > 0) {
                    returnData.push(item[rindex])
                }
            })
            okPress(returnData)
            cancelPress()
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
                    <span 
                        className={`${prefixCls}-header-item ${prefixCls}-header-item-highlight`}
                        onClick={handleOkClick}
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
                    <div className={`${prefixCls}-data-content`} ref={wrapper}>
                        {
                            renderData.map(item => 
                                <div className={`${prefixCls}-data-wrapper`}>
                                    <ul 
                                        className={`${prefixCls}-data-item wheel-scroll`}
                                        style={{marginTop: `${Math.floor(PickerBaseData.current.CONTENT_CHID / 2)}0vw`}}
                                    >
                                        {item.map((item, index) => 
                                            <li className="wheel-item">
                                                {item.text}
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