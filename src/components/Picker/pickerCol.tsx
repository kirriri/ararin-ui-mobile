import React, {
    FC,
    useState
} from 'react'

export interface BasePickerColumnProps {
    prefixCls?: string,
    colData: any[],
    colHeight: number,
    itemHeight: number,
    // name: string,
    // value: any,
    // itemHeight: number,
    // columnHeight: number,
    // onchange: (val: any) => void,
    // onClick: (val: any) => void
}

export const BasePickerColumn:FC<BasePickerColumnProps> = props => {

    const {
        prefixCls,
        colData,
        colHeight,
        itemHeight
    } = props

    console.log(colHeight, itemHeight)

    const [isMoving, setIsMoving] = useState(false)
    const [startTouchY, setStartTouchY] = useState(0)
    const [startScrollerTranslate, setStartScrollerTranslate] = useState(0)
    const [scrollerTranslate, setScrollerTranslate] = useState(() => {
        return colHeight / 2 - itemHeight / 2 - colHeight * itemHeight
    })
    const [minTranslate, setMinTranslate] = useState(() => {
        return colHeight / 2 - itemHeight * colData.length + itemHeight / 2
    })
    const [maxTranslate, setMaxTranslate] = useState(() => {
        return colHeight / 2 - itemHeight / 2
    })


    const handleTouchStart = event => {
        const startTouchY = event.targetTouches[0].pageY;
        setStartTouchY(startTouchY)
        setStartScrollerTranslate(scrollerTranslate)
    };

    const handleTouchMove = (event) => {
        event.preventDefault();
        const touchY = event.targetTouches[0].pageY;
        this.setState(({isMoving, startTouchY, startScrollerTranslate, minTranslate, maxTranslate}) => {
          if (!isMoving) {
            return {
              isMoving: true
            }
          }
    
          let nextScrollerTranslate = startScrollerTranslate + touchY - startTouchY;
          if (nextScrollerTranslate < minTranslate) {
            nextScrollerTranslate = minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8);
          } else if (nextScrollerTranslate > maxTranslate) {
            nextScrollerTranslate = maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8);
          }
          return {
            scrollerTranslate: nextScrollerTranslate
          };
        });
    };



    return (
        <ul 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
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