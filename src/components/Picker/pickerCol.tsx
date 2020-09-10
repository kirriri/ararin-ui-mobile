import React, {
    FC,
    useState,
    useEffect
} from 'react'
import { setCssStyle } from '../../util/util'
import { isCompositeComponent } from 'react-dom/test-utils'

export interface BasePickerColumnProps {
    prefixCls?: string,
    colData: any[],
    colHeight: number,
    itemHeight: number,
    index: number,
    selectIndex: number
    // name: string,
    // value: any,
    // onchange: (val: any) => void,
    // onClick: (val: any) => void
}

export const BasePickerColumn:FC<BasePickerColumnProps> = props => {

    const {
        index,
        selectIndex,
        prefixCls,
        colData,
        colHeight,
        itemHeight
    } = props

    const computeTranslate = (props: any) => {
        console.log(111111)
        const { colHeight, selectIndex, itemHeight, colData } = props
        return {
            scrollerTranslate: colHeight / 2 - itemHeight / 2 - selectIndex * itemHeight,
            minTranslate: colHeight / 2 - itemHeight * colData.length + itemHeight / 2,
            maxTranslate: colHeight / 2 - itemHeight / 2
        };
    }

    useEffect(() => {
        setState(prev => {
            const { colHeight, selectIndex, itemHeight, colData } = JSON.parse(JSON.stringify(props))
            return {
                ...prev,
                scrollerTranslate: colHeight / 2 - itemHeight / 2 - selectIndex * itemHeight,
                minTranslate: colHeight / 2 - itemHeight * colData.length + itemHeight / 2,
                maxTranslate: colHeight / 2 - itemHeight / 2
            }
        })
        return () => {}
    }, [colData])

    const [state, setState] = useState({
        isMoving: false,
        startTouchY: 0,
        startScrollerTranslate: 0,
        ...computeTranslate(props)
    })
    const handleTouchStart = e => {
        const startTouchY = e.targetTouches[0].pageY;
        setState(prevState => {
            let data = JSON.parse(JSON.stringify(prevState))
            return {
                startTouchY,
                startScrollerTranslate: data.scrollerTranslate,
                ...prevState
            }
        })
    }
    const handleTouchMove = e => {
        
    }

    console.log(index, state.scrollerTranslate, colData)
    const translateString = `translate3d(0, ${state.scrollerTranslate}vw, 0)`;
    let style = {
        transitionDuration: ''
    }
    setCssStyle(style, 'transform', translateString, true)
    state.isMoving && (style.transitionDuration = '0ms')
    
    return (
        <ul 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className={`${prefixCls}-data-item`}
            style={style}
        >
            {
                colData.map((sitem, sindex) => 
                    <li 
                        className="wheel-item" 
                        key={sindex}
                        style={{
                            lineHeight: itemHeight + 'vw',
                            height: itemHeight + 'vw'
                        }}
                    >
                        {sitem.text}
                    </li>
                )
            }
        </ul>
    )
}

export default BasePickerColumn