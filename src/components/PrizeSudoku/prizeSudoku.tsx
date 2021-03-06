import React, {
    FC,
    useEffect,
    useState,
    useRef
} from 'react'

import classNames from 'classnames'


/**
 * 传入的data属性规范
 */
export interface dataProps {
    title: string,
    img?: string | React.ReactElement<HTMLImageElement>,
    txtColor?: string
}

/**
 * 实际渲染的属性规范
 */
export interface renderDataProps {
    title: string,
    img?: string | React.ReactElement<HTMLImageElement>
}
/**
 * 点击事件返回promise类型
 */
interface lotteryPromiseProps {
    flag: boolean,
    index?: number
}

/**
 * PrizeSudokul组件大小
 */
type PrizeSudokulSize = 'sm' | 'md' | 'lg'

export interface BasePrizeSudokuProps {
    className?: string,
    style?: React.CSSProperties,
    data: Array<dataProps>,
    size?: PrizeSudokulSize,
    onClick?: () => Promise<lotteryPromiseProps>,
    successFun?: (award: any) => void,
    failedFun?: () => void
}

export const PrizeSudoku: FC<BasePrizeSudokuProps> = props => {

    const animateTimer = useRef(null)
    // 当前转盘状态
    const [state, setState] = useState({
        awardIndex: -1,
        wheeling: false,
        index: -1
    })
    const sudoku = useRef({
        index: -1,
        prize: -1,
        count: 9,     //总共有多少个位置
        speed: 0,    //初始转动速度
        times: 0,     //转动次数
        cycle: 50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
    })
    // 渲染data
    const [renderData, setRenderData] = useState<Array<renderDataProps>>(new Array(9).fill({}))
    // 奖品keyMap
    const keyMap = useRef({
        0: '0',
        1: '1',
        2: '2',
        3: '7',
        5: '3',
        6: '6',
        7: '5',
        8: '4'
    })
    
    const {
        size,
        className,
        successFun,
        failedFun,
        data,
        onClick,
        ...restProps
    } = props

    // 设置renderData
    useEffect(() => {
        if (data && data.length == 9) {
            setState(props => ({...props, 
                awardIndex: -1,
                wheeling: false
            }))
            setRenderData(() =>
                data.map((item, index) => {
                    return {
                        title: item.title,
                        img: typeof item.img === 'string' 
                                ? <img src={item.img} alt=""/>
                                : React.cloneElement(item.img, {
                                        className: `prize-${keyMap.current[index]}`,
                                        src: item.img.props.src 
                                    }
                                ),
                    }
                })
            )
        }
        return () => {
        };
    }, [data]);

    // 设置类名
    const classes = classNames('ararin-prizeSudoku', className, {
        [`ararin-sudoku-${size}`]: size,
    })

    const handleLotteryClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.persist()
        if(data.length === 9 && onClick && !state.wheeling) {
            setState(props => ({
                ...props,
                wheeling: true
            }))
            onClick().then(award => {
                if (award.flag) {
                    setState(props => ({...props, awardIndex: award.index, speed: 100}))
                } else {
                    setState(props => ({
                        ...props,
                        awardIndex: -1,
                        wheeling: false
                    }))
                    failedFun && failedFun()
                }
            }, err => {
                console.log(err)
                setState(props => ({
                    ...props,
                    wheeling: false
                }))
            })
        }
    }

    useEffect(() => {
        if(state.awardIndex != -1 && state.wheeling === true) {
            sudoku.current.speed = 100
            roll()
        }
    }, [state.awardIndex])

    const roll = () => {
        sudoku.current.times = sudoku.current.times + 1
        sudoku.current.index += 1
        if(sudoku.current.index > sudoku.current.count - 1) {
            sudoku.current.index = 0
        }
        setState(props => ({
            ...props,
            index: sudoku.current.index
        }))
        
        if(sudoku.current.times > sudoku.current.cycle + 10 && sudoku.current.prize === state.awardIndex) {
            console.log(1111111111111)
            clearTimeout(animateTimer.current)
            sudoku.current.prize = -1
            sudoku.current.times = 0
            setState(props => ({
                ...props,
                wheeling: false
            }))
        }else {
            if(sudoku.current.times < sudoku.current.cycle) {
                sudoku.current.speed -= 10
            }else if(sudoku.current.times == sudoku.current.cycle) {
                sudoku.current.prize = state.awardIndex
            }else {
                if(sudoku.current.times > sudoku.current.cycle + 10 && ((sudoku.current.prize == 0 && sudoku.current.index == 8) || sudoku.current.prize == sudoku.current.index)) {
                    sudoku.current.speed += 110
                }else {
                    sudoku.current.speed += 20
                }
            }
            if(sudoku.current.speed < 40) {
                sudoku.current.speed = 40
            }
            animateTimer.current = setTimeout(roll, sudoku.current.speed)
        }
        return false
    }

    return  <div {...restProps} className={`${classes} ararin-prizeSudoku-wrapper`}>
                <div className="ararin-prizeSudoku-box">
                    <div className="ararin-prizeSudoku-zone">
                        <ul className="ararin_clear_fix">
                            {renderData.map((item, index) => 
                                index != 4
                                ?   <li 
                                        className={`
                                            arain-prizeSudoku-prize 
                                            ${index} 
                                            prize-${keyMap.current[index]} 
                                            ${state.index == keyMap.current[index] ? 'active' : ''}`} 
                                        key={`arain-prizeSudoku-prize arain-prizeSudoku-prize${index}`}
                                        >
                                        <span>{item.img}</span>
                                        <p>{item.title}</p>
                                    </li> 
                                :   <li 
                                        onClick={handleLotteryClick}
                                        className={`arain-prizeSudoku-prize`} 
                                        key={`arain-prizeSudoku-prize arain-prizeSudoku-prize${index}`}>
                                        <span>{}</span>
                                        <p>{item.title}</p>
                                        <div className="draw-btn">
                                            {item.img}
                                            <div 
                                                className="draw-btn-txt"
                                            >{item.title}</div>
                                        </div>
                                    </li> 
                            )}
                        </ul>
                    </div>
                </div>
                <div>

                </div>
            </div>
}

PrizeSudoku.defaultProps = {

}

export default PrizeSudoku;