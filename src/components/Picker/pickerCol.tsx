import React, {
    FC,
    useState
} from 'react'

export interface BasePickerColumnProps {
    prefixCls?: string,
    colData: any[],
    colHeight: number,
    itemHeight: number,
    index: number
    // name: string,
    // value: any,
    // onchange: (val: any) => void,
    // onClick: (val: any) => void
}

export const BasePickerColumn:FC<BasePickerColumnProps> = props => {

    const {
        index,
        prefixCls,
        colData,
        colHeight,
        itemHeight
    } = props

    const computeTranslate = (props: any) => {
        const { colHeight, currentIndex, itemHeight, colData } = props
        return {
            scrollerTranslate: colHeight / 2 - itemHeight / 2 - currentIndex * itemHeight,
            minTranslate: colHeight / 2 - itemHeight * colData.length + itemHeight / 2,
            maxTranslate: colHeight / 2 - itemHeight / 2
        };
    }

    const [state, setState] = useState({
        isMoving: false,
        startTouchY: 0,
        startScrollerTranslate: 0,
        ...computeTranslate(props)
    })

    
    console.log(state)

    return (
        <ul 
            // onTouchStart={handleTouchStart}
            // onTouchMove={handleTouchMove}
            className={`${prefixCls}-data-item`}
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