import React, {
    FC,
    useRef,
    useEffect,
    useState,
} from 'react'
import Popup from '../dialog/popup'
import classNames from 'classnames'
import PickerCol from './pickerCol'
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

    const [top, setTop] = useState(0)
    const [renderData, setRenderData] = useState([])
    const PickerBaseData = useRef({
        HEIGHT: 50, //vw计算单位
        BASE_ITEM_HEIGHT: 10, //vw计算单位
        CONTENT_CHID: 3,
        ITEM_HEIGHT: 10,
        ITEM_MIN_NUM: 5,
        ITEM_MAX_NUM: 7
    })
    const dataProps = useRef({
        currentLength: 0,
        currentDepth: 0,
    })

    useEffect(
        () => {
            const tmpDataProps = findDepthAndLength(data)
            let baseArr = new Array(tmpDataProps.currentDepth).fill(new Array(0))
            baseArr[0] = data
            baseArr = getCalRenderData(baseArr, 0, 0)
            setRenderData(baseArr)
            dataProps.current = tmpDataProps
            
            if(dataProps.current.currentLength < PickerBaseData.current.ITEM_MIN_NUM) {
                PickerBaseData.current.CONTENT_CHID = PickerBaseData.current.ITEM_MIN_NUM
                PickerBaseData.current.HEIGHT = PickerBaseData.current.CONTENT_CHID * 10
            } else if(dataProps.current.currentLength > PickerBaseData.current.ITEM_MAX_NUM) {
                PickerBaseData.current.CONTENT_CHID = PickerBaseData.current.ITEM_MAX_NUM
                PickerBaseData.current.HEIGHT = PickerBaseData.current.CONTENT_CHID * 10
            }else {
                
                dataProps.current.currentLength % 2 === 0 ?
                    PickerBaseData.current.CONTENT_CHID = dataProps.current.currentLength - 1 :
                    PickerBaseData.current.CONTENT_CHID = dataProps.current.currentLength
                    PickerBaseData.current.HEIGHT = PickerBaseData.current.CONTENT_CHID * 10
            }
            console.log(PickerBaseData.current.CONTENT_CHID)
            setTop(Math.floor((PickerBaseData.current.CONTENT_CHID / 2)) * 10)
        },
        [data]
    )

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
                    <div className={`${prefixCls}-data-content`} style={{height: PickerBaseData.current.HEIGHT + 'vw'}}>
                        {
                            renderData && renderData.map((item, index) => 
                                <div className={`${prefixCls}-data-wrapper`} key={index}>
                                    <PickerCol
                                        colHeight={PickerBaseData.current.HEIGHT}
                                        itemHeight={PickerBaseData.current.BASE_ITEM_HEIGHT}
                                        prefixCls={prefixCls}
                                        colData={item}
                                    />
                                </div>
                            )
                        }
                        <div 
                            style={{
                                backgroundSize : `100% ${top}vw`
                            }}
                            
                            className={`${prefixCls}-item-mask`}></div>
                        <div
                            style={{
                                top : `${top}vw`
                            }}
                            className={`${prefixCls}-item-focus`}></div>
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