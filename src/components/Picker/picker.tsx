import React, {
    FC,
    useRef,
    useEffect,
    useState,
} from 'react'
import Popup from '../Dialog/popup'
import PickerCol from '../PickerView/pickerCol'
import classNames from 'classnames'
import TouchFeedback from 'rmc-feedback';

export interface BaseSelectProps {
    colDatas: any[], 
    selectedIndex: number[]
}

export interface BaseDataProps {
    text: string,
    value: any,
    children?: BaseDataProps[]
}

export interface BasePickerProps {
    linkage?: boolean,
    cancelText?: string,
    okText?: string,
    cancelPress?: () => void,
    okPress?: (val: any) => void,
    data?: BaseDataProps[] | {text: string, value: any,}[][],
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
        title,
        cancelText,
        cancelPress,
        okText,
        okPress,
        prefixCls,
        history,
        maskClosable,
        ...restProps
    } = props

    //picker
    const [visible, setVisible] = useState(props.visible)

    //pickerview
    const [top, setTop] = useState(0)
    const [renderData, setRenderData] = useState({
        colDatas: [],
        selectedIndex: []
    })

    const PickerBaseData = useRef({
        HEIGHT: 252, // px计算单位
        BASE_ITEM_HEIGHT: 36, //px计算单位
        CONTENT_CHID: 3, // 一列最大高度
        ITEM_MIN_NUM: 5, // 一列最小个数
        ITEM_MAX_NUM: 7  // 一列最大个数
    })
    // 计算数据的属性
    const dataProps = useRef({
        currentLength: 0, // 单列数据最大长度
        currentDepth: 0, // 数据最大深度
    })

    useEffect(() => {
        setVisible(props.visible)
    }, [props.visible])

    // 取消事件
    const handleCancelClick = () => {
        if(cancelPress) {
            cancelPress()
        }else {
            setVisible(() => false)
        }
    }

    // 确认事件
    const handleOkClick = () => {
        let selectData = JSON.parse(JSON.stringify(renderData.colDatas))
            .map((item, index) => renderData.selectedIndex[index] !== -1 ? (delete item[renderData.selectedIndex[index]].children,item[renderData.selectedIndex[index]]) : '' )
            .filter(item => Object.prototype.toString.call(item) === '[object Object]')
        if(okPress) {
            okPress(selectData)
        }else {
            setVisible(() => false)
        }
    }
    
    //  渲染title
    let reTit
    if(typeof title === 'string' || !title) {
        reTit = 
            <h3 className={`${prefixCls}-header`}>
                <TouchFeedback activeClassName={`${prefixCls}-header-item-active`}>
                    <span onClick={handleCancelClick} className={`${prefixCls}-header-item`}>{cancelText}</span>
                </TouchFeedback>
                <span>{title}</span>
                <TouchFeedback activeClassName={`${prefixCls}-header-item-active `}>
                    <span 
                        onClick={handleOkClick}
                        className={`${prefixCls}-header-item ${prefixCls}-header-item-highlight`}
                    >{okText}</span>
                </TouchFeedback>
            </h3>
    }else {
        reTit = title
    }

    //数据改变后重新计算picker位置
    const resetBseData = (linkage: boolean) => {
            let { ITEM_MIN_NUM, ITEM_MAX_NUM, BASE_ITEM_HEIGHT } = PickerBaseData.current
            let flag = data.every(item => Object.prototype.toString.call(item) === '[object Array]' && !linkage && data.length)
            const tmpDataProps = findDepthAndLength(data, linkage)
            let baseDataArr = new Array(tmpDataProps.currentDepth).fill(new Array(0))
            let baseSelectArr = new Array(tmpDataProps.currentDepth).fill(-1)
            if(tmpDataProps.currentDepth) {
                if(flag) {
                    baseDataArr = data
                    baseSelectArr.fill(0)
                    console.log(1)
                }else {
                    console.log(2, data)
                    baseDataArr[0] = data
                    baseSelectArr[0] = 0
                }
            }
            let tmpData = {
                colDatas: [],
                tmpRSelect: []
            }
            
            if(flag) {
                tmpData = getCalRenderData(baseDataArr, baseSelectArr, 0, 0)
            }else {
                tmpData.colDatas = baseDataArr
                tmpData.tmpRSelect = baseSelectArr
            }
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
    }
    
    useEffect(
        () => {
            if(linkage && !data.every(item => Object.prototype.toString.call(item) === '[object Object]')) {
                console.error('Ararin Picker error: linkage type must need all type of Object item')
                return
            }
            resetBseData(linkage)
        },
        [data]
    )

    useEffect(() => {
        if(!history) {
            resetBseData(linkage)
        }
    }, [visible === true])
 
    // 查询数据深度
    const findDepthAndLength = (data: BaseDataProps[] | {text: string, value: any,}[][], linkage: boolean) => {
        let currentDepth = 0
        let currentLength = data.length
        if(linkage) {
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
            if(!data.every(item => Object.prototype.toString.call(item) === '[object Object]')) {
                console.error('error: data must required all type of dataProps object')
                return 
            }
            data.forEach(item => {
                if(!item.children) {
                    return
                }
                depthAndLengthCount(item, 0, 0)
            })
        }else {
            currentDepth = 0
            currentLength = 0
            if(data.every(item => Object.prototype.toString.call(item) === '[object Object]')) {
                if(data.length) {
                    currentDepth = 1
                }
                currentLength = data.length
            }else if(data.every(item => Object.prototype.toString.call(item) === '[object Array]')) {
                currentDepth = data.length
                data.forEach(item => {
                    if(item.length > currentLength) {
                        currentLength = item.length
                    }
                })
            }
        }
        return {currentLength, currentDepth}
    }
    
    // 计算renderData 数据
    const getCalRenderData = (tmpRData: any[], tmpRSelect: number[], index: number, currentIndex: number) => {
        tmpRData.forEach((ritem, rindex) => {
            if(rindex === index) {
                if(ritem[currentIndex].children) {
                    tmpRData[rindex+1] = ritem[currentIndex].children
                }else if(tmpRData[rindex + 1]) {
                    tmpRData[rindex+1] = []
                }
            }else if(rindex > index) {
                if(ritem[0] && ritem[0].children) {
                    tmpRData[rindex+1] = ritem[0].children
                }else if(tmpRData[rindex + 1]) {
                    tmpRData[rindex+1] = []
                }
            }
        })

        tmpRSelect[index] = currentIndex
        tmpRSelect.forEach((sitem, sindex) => {
            if(sindex <= index) {
                return
            }
            if(sindex > index && tmpRData[sindex].length) {
                tmpRSelect[sindex] = 0
            }else {
                tmpRSelect[sindex] = -1
            }
        })
        return {colDatas: tmpRData, tmpRSelect}
    }

    // 滑动列选择事件
    const onSelected = (colIndex, index) => {
        if(renderData.selectedIndex[colIndex] === index) {
            return
        }
        if(linkage) {
            const nextData = getCalRenderData(renderData.colDatas, renderData.selectedIndex, colIndex, index)
            setRenderData((prev) => {
                return {
                    colDatas: nextData.colDatas,
                    selectedIndex: nextData.tmpRSelect
                }
            })
        }else {
            setRenderData((prev) => {
                let nextSelectIndex = prev.selectedIndex
                nextSelectIndex[colIndex] = index
                return {
                    ...prev,
                    selectedIndex: nextSelectIndex
                }
            })
        }
    }  
    
    return <>
                <Popup
                    {...restProps}
                    maskClosable={maskClosable}
                    onClose={handleCancelClick}
                    visible={visible}
                    title={reTit}
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
                        <div style={{top : `${top}px`, height: `${PickerBaseData.current.BASE_ITEM_HEIGHT}px`}} className={`${prefixCls}-item-focus`}></div>
                    </div>
                </Popup>
           </>
}

Picker.defaultProps = {
    prefixCls: 'apk',
    cancelText: '取消',
    okText: '确定',
    maskClosable: false,
    linkage: false,
    data: [],
    history: true
}

export default Picker