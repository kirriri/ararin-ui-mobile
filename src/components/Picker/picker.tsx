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
    linkage?: boolean,
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
        linkage,
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
    const [renderData, setRenderData] = useState({
        colDatas: [],
        selectedIndex: []
    })
    // const [selectedIndex, setSelectedIndex] = useState([])
    const PickerBaseData = useRef({
        HEIGHT: 252, // px计算单位
        BASE_ITEM_HEIGHT: 36, //px计算单位
        CONTENT_CHID: 3, // 一列最大高度
        ITEM_MIN_NUM: 5, // 一列最小个数
        ITEM_MAX_NUM: 9  // 一列最大个数
    })
    const dataProps = useRef({
        currentLength: 0,
        currentDepth: 0,
    })

    useEffect(
        () => {
            let { ITEM_MIN_NUM, ITEM_MAX_NUM, BASE_ITEM_HEIGHT } = PickerBaseData.current
            const tmpDataProps = findDepthAndLength(data)
            console.log(tmpDataProps)
            let baseDataArr = new Array(tmpDataProps.currentDepth).fill(new Array(0))
            let baseSelectArr = new Array(tmpDataProps.currentDepth).fill(-1)
            if(tmpDataProps.currentDepth) {
                baseDataArr[0] = data
                baseSelectArr[0] = 0
            }
            let tmpData = getCalRenderData(baseDataArr, baseSelectArr, 0, 0)
            // if(baseArr[0]) {
            //     tmpData.selectedIndex[0] = 0
            // }
            setRenderData(() => ({
                colDatas: tmpData.colDatas,
                selectedIndex: tmpData.tmpRSelect
            }))
            
            dataProps.current = tmpDataProps
            
            if(dataProps.current.currentLength < ITEM_MIN_NUM) {
                PickerBaseData.current.CONTENT_CHID = ITEM_MIN_NUM
                PickerBaseData.current.HEIGHT = PickerBaseData.current.CONTENT_CHID * BASE_ITEM_HEIGHT
            } else if(dataProps.current.currentLength > ITEM_MAX_NUM) {
                PickerBaseData.current.CONTENT_CHID = ITEM_MAX_NUM
                PickerBaseData.current.HEIGHT = PickerBaseData.current.CONTENT_CHID * BASE_ITEM_HEIGHT
            }else {
                dataProps.current.currentLength % 2 === 0 ?
                    PickerBaseData.current.CONTENT_CHID = dataProps.current.currentLength - 1 :
                    PickerBaseData.current.CONTENT_CHID = dataProps.current.currentLength
                PickerBaseData.current.HEIGHT = PickerBaseData.current.CONTENT_CHID * BASE_ITEM_HEIGHT
            }
            setTop(prev => PickerBaseData.current.HEIGHT / 2 - BASE_ITEM_HEIGHT / 2)
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
    const getCalRenderData = (tmpRData: any[], tmpRSelect: number[], index: number, currentIndex: number) => {
        tmpRData.forEach((ritem, rindex) => {
            if(rindex >= index && tmpRData[rindex+1]) {
                if(tmpRData[rindex][currentIndex] && tmpRData[rindex][currentIndex].children) {
                    tmpRData[rindex + 1] = tmpRData[rindex][currentIndex].children
                } else {
                    tmpRData[rindex + 1] = []
                }
            }  
        })
        tmpRSelect[index] = currentIndex
        tmpRSelect.forEach((sitem, sindex) => {
            if(sindex > index && tmpRData[sindex].length) {
                tmpRSelect[sindex] = 0
            }
        })
        return {colDatas: tmpRData, tmpRSelect}
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

    // 选择事件
    const onSelected = (colIndex, index) => {
        setRenderData((prev) => {
            if(renderData.selectedIndex[colIndex] === index) {
                return prev
            }
            const nextData = getCalRenderData(renderData.colDatas, renderData.selectedIndex, colIndex, index)
            console.log(nextData)
            return {
                colDatas: nextData.colDatas,
                selectedIndex: nextData.tmpRSelect
            }
        })
    }
    
    return <>
                <Popup
                    onClose={cancelPress}
                    visible={visible}
                    title={reTit}
                    {...restProps}
                >
                    <div className={`${prefixCls}-data-content`} style={{height: PickerBaseData.current.HEIGHT + 'px'}}>
                        {
                            renderData && renderData.colDatas.map((item, index) => 
                                <div className={`${prefixCls}-data-wrapper`} key={index}>
                                    <PickerCol
                                        onSelected={onSelected}
                                        selectIndex={renderData.selectedIndex[index]}
                                        index={index}
                                        colHeight={PickerBaseData.current.HEIGHT}
                                        itemHeight={PickerBaseData.current.BASE_ITEM_HEIGHT}
                                        prefixCls={prefixCls}
                                        colData={item}
                                    />
                                </div>
                            )
                        }
                        <div style={{backgroundSize : `100% ${top}px`}} className={`${prefixCls}-item-mask`}></div>
                        <div style={{top : `${top}px`}} className={`${prefixCls}-item-focus`}></div>
                    </div>
                </Popup>
           </>
}

Picker.defaultProps = {
    prefixCls: 'apk',
    cancelText: '取消',
    okText: '确定',
    maskClosable: true,
    linkage: true,
    data: [],
    history: false
}

export default Picker