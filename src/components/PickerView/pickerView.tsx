import React, {
    FC,
    useRef,
    useEffect,
    useState,
} from 'react'
import classNames from 'classnames'
import PickerCol from './pickerCol'

export interface BaseSelectProps {
    colDatas: any[], 
    selectedIndex: number[]
}

export interface BaseDataProps {
    text?: string,
    value?: any,
    children?: BaseDataProps[]
}

export interface BasePickerViewProps {
    dataOnChange?: (val: BaseSelectProps) => void,
    linkage?: boolean,
    data: BaseDataProps[],
    visible?: boolean,
    style?: React.CSSProperties,
    className?: string,
    prefixCls?: string,
}

export const PickerView: FC<BasePickerViewProps> = props => {

    const {
        data,
        linkage,
        dataOnChange,
        className,
        prefixCls,
    } = props

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
    const dataProps = useRef({
        currentLength: 0,
        currentDepth: 0,
    })

    useEffect(
        () => {
            let { ITEM_MIN_NUM, ITEM_MAX_NUM, BASE_ITEM_HEIGHT } = PickerBaseData.current
            const tmpDataProps = findDepthAndLength(data)
            let baseDataArr = new Array(tmpDataProps.currentDepth).fill(new Array(0))
            let baseSelectArr = new Array(tmpDataProps.currentDepth).fill(-1)
            if(tmpDataProps.currentDepth) {
                baseDataArr[0] = data
                baseSelectArr[0] = 0
            }
            let tmpData = getCalRenderData(baseDataArr, baseSelectArr, 0, 0)
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
        const nextData = getCalRenderData(renderData.colDatas, renderData.selectedIndex, colIndex, index)
        setRenderData((prev) => {
            dataOnChange(renderData)
            return {
                colDatas: nextData.colDatas,
                selectedIndex: nextData.tmpRSelect
            }
        })
    }  

    return <>
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
           </>
}

PickerView.defaultProps = {
    prefixCls: 'apk',
    linkage: true,
    data: [],
}


export default PickerView