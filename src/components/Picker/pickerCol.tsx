import React, {
    FC,
    useState,
    useEffect
} from 'react'
import { setCssStyle } from '../../util/util'

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
    onSelected: (colIndex: number, selectedIndex: number) => void
}

export const BasePickerColumn: FC<BasePickerColumnProps> = props => {

    const {
        index,
        selectIndex,
        prefixCls,
        colData,
        colHeight,
        itemHeight,
        onSelected
    } = props

    const computeTranslate = (props: any) => {
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
        return () => { }
    }, [colData])

    useEffect(() => {
        if (state.isMoving) {
            return;
        }
        setState(prev => {
            return {
                ...prev,
                ...computeTranslate(props)
            }
        })
    }, [selectIndex])

    const [state, setState] = useState({
        init: true,
        isMoving: false,
        startTouchY: 0,
        startScrollerTranslate: 0,
        ...computeTranslate(props)
    })

    const handleTouchStart = e => {
        if (state.init) {
            setState(prev => ({ ...prev, init: false }))
        }
        const startTouchY = e.targetTouches[0].pageY;
        setState(prevState => {
            let data = JSON.parse(JSON.stringify(prevState))
            return {
                ...prevState,
                startTouchY,
                startScrollerTranslate: data.scrollerTranslate,
            }
        })
    }

    const handleTouchMove = e => {
        e.preventDefault()
        const touchY = e.targetTouches[0].pageY
        setState(prev => {
            let { isMoving, startTouchY, startScrollerTranslate, minTranslate, maxTranslate } = prev
            if (!isMoving) {
                return {
                    ...prev,
                    isMoving: true,
                }
            }
            let nextScrollTranslate = startScrollerTranslate + touchY - startTouchY
            if (nextScrollTranslate < minTranslate) {
                nextScrollTranslate = minTranslate - Math.pow(minTranslate - nextScrollTranslate, 0.8);
            } else if (nextScrollTranslate > maxTranslate) {
                nextScrollTranslate = maxTranslate + Math.pow(nextScrollTranslate - maxTranslate, 0.8);
            }
            return {
                ...prev,
                scrollerTranslate: nextScrollTranslate,
            }
        })
    }

    const handleTouchEnd = e => {
        if (!state.isMoving) {
            return;
        }
        setState(prev => {
            return {
                ...prev,
                isMoving: false,
                startTouchY: 0,
                startScrollerTranslate: 0
            }
        });
        setTimeout(() => {
            const { scrollerTranslate, minTranslate, maxTranslate } = state;
            let activeIndex;
            if (scrollerTranslate > maxTranslate) {
                activeIndex = 0;
            } else if (scrollerTranslate < minTranslate) {
                activeIndex = colData.length - 1;
            } else {
                activeIndex = - Math.floor((scrollerTranslate - maxTranslate) / itemHeight);
            }
            //   console.log(index, activeIndex)
            onSelected && onSelected(index, activeIndex);
            if (activeIndex === selectIndex) {
                setState(prev => {
                    return {
                        ...prev,
                        ...computeTranslate(props)
                    }
                })
            }
        }, 0);
    };

    const handleTouchCancel = (event) => {
        if (!state.isMoving) {
            return;
        }
        setState(prev => ({
            ...prev,
            isMoving: false,
            startTouchY: 0,
            startScrollerTranslate: 0,
            scrollerTranslate: prev.startScrollerTranslate
        }));
    };

    const translateString = `translate3d(0, ${state.scrollerTranslate}px, 0)`;
    let style = {
        transitionDuration: ''
    }
    setCssStyle(style, 'transform', translateString, true)
    if (state.isMoving || state.init) {
        style.transitionDuration = '0ms'
    }
    return (
        <ul
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            className={`${prefixCls}-data-item`}
            style={style}
        >
            {
                colData.map((sitem, sindex) =>
                    <li
                        className="wheel-item"
                        key={sindex}
                        style={{
                            lineHeight: itemHeight + 'px',
                            height: itemHeight + 'px'
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