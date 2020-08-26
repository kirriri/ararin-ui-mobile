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
import { render } from 'react-dom';

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
    const touch = useRef({
        disable: false,
        touchCol: 0,
        touchIndex: 0
    })
    const selectedIndex = useRef([])
    const [sketchRenderData, setSketchRenderData] = useState([])
    const [renderData, setRenderData] = useState<any>()
    const wrapper = useRef(null)
    const PickerBaseData = useRef({
        CONTENT_CHID: 3,
        ITEM_HEIGHT: 10,
        ITEM_MIN_NUM: 7,
        ITEM_MAX_NUM: 9
    })

    // 更新renderData后刷新bscroll
    useEffect(() => {
        Array.from(wheels.current).forEach((item, index) => {
            item.refresh()
            if(index > touch.current.touchCol) {
                item.wheelTo(0)
            }
        })
        touch.current.disable = false
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
        setRenderData(() => baseArr)
    }, [data, visible])

    // 防止滑动穿透
    useEffect(() => {
        if(visible) {
            document.addEventListener('touchmove', touchFix, { passive: false });
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
                        momentum: false,
                        click: false,
                    })  
                    wheel.touchProps = {
                        one: index,
                        two: -1
                    }
                    wheel.on('scrollEnd', () => {
                        // 滚动完成之后获取当前选取的索引值,设置后续联动的数据
                        if(!Number.isNaN(wheel.y)) {
                            const currentIndex = getCurrentIndex(wheel)
                            setRenderData(rData => {
                                // let tmpRData = JSON.parse(JSON.stringify(rData))
                                selectedIndex.current[index] = currentIndex
                                console.log(Array.from(wheels.current).map(item => item.touchProps.two))
                                console.log(getCalRenderData(rData, index, currentIndex))
                                    setRenderData(getCalRenderData(rData, index, currentIndex))
                            })
                            wheel.touchProps.two = currentIndex
                        }
                    }) 
                    wheel.on('scrollStart', () => {
                        const currentIndex = getCurrentIndex(wheel)
                        wheel.touchProps.one = index
                        wheel.touchProps.two = currentIndex
                    })
                    wheel.on('beforeScrollStart', () => {
                        if(touch.current.touchCol > index || !touch.current.disable) {
                            touch.current.touchCol = index
                            touch.current.disable = true
                        }
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
                        {console.log(renderData)}
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