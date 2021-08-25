import React, {
    FC,
    CanvasHTMLAttributes,
    useEffect,
    useState,
    useRef,
    useImperativeHandle,
    forwardRef,
} from 'react'
import classNames from 'classnames'
import { requestAnimationFrame, canCelRequestAnimFrame } from '../../util/animateJs'
import { wheelBg, arrowBg } from './imgRes'

//底盘图片名称
const arrowImgSrc = arrowBg
//指针图标名称
const bgImgSrc = wheelBg

/**
 * data属性规范
 */
export interface dataProps {
    title: string,
    img?: string | JSX.Element,
    index?: number,
    bgColor?: string,
    txtColor?: string
}

/**
 * 渲染的data属性规范
 */
interface renderDataProps {
    title: string,
    img?: CanvasImageSource,
    index?: number,
    bgColor?: string,
    txtColor?: string
}

export interface BasePrizeWheelProps {
    autoResize?: boolean
    style?: React.CSSProperties
    bgImg?: string | JSX.Element
    bgStyle?: React.CSSProperties
    arrowImg?: string | JSX.Element
    arrowStyle?: React.CSSProperties
    className?: string
    data: Array<dataProps>
    width?: number,
    onClick?: () => void
    successFun?: (award: any) => void
    fontSize?: number
}

type PrizeWheelProps = BasePrizeWheelProps & CanvasHTMLAttributes<HTMLCanvasElement>

export interface prizeWheelRefProps {
    reset: () => void
    setPrize: (awardIndex: number) => void
}

export const PrizeWheel = forwardRef<prizeWheelRefProps, PrizeWheelProps>((props, ref) => {

    const {
        style,
        bgStyle,
        className,
        children,
        onClick,
        data,
        width,
        bgImg,
        arrowImg,
        arrowStyle,
        successFun,
        autoResize,
        fontSize,
        ...restProps
    } = props

    // 用于触发回调刷新加载图片
    const [loadRefresh, setLoadRefresh] = useState(0)
    // canvas对象实例
    const canvasRef = useRef<HTMLCanvasElement>(null)
    // 动画id
    const animateRef = useRef<number>()
    // 外层wrapper
    const prizeWheelWrapperRef = useRef<any>()
    // 设置转盘宽度
    const [renderWidth, setRenderWidth] = useState<number>(0)
    // 设置渲染数据
    const [renderData, setRenderData] = useState<Array<renderDataProps>>()
    // 设置奖品位置
    // const [index, setIndex] = useState<number>(0)
    // 设置类名
    const classes = classNames('ararin-prize-wheel', className, {
        // [`ararin-wheel-${size}`]: size,
    })

    const [state, setState] = useState({
        startRadian: -90 * Math.PI / 180, //抽奖旋转开始角度
        wheeling: false,
        awardIndex: -1,
    })

    useImperativeHandle(ref, () => ({
        reset: () => {onLoad()},
        setPrize: ( awardIndex: number ) => {
            if(!state.wheeling) {
                setPrize(awardIndex)
            }
        }
    }))

    useEffect(() => {
        setRenderWidth(() => prizeWheelWrapperRef.current.offsetWidth)
    }, [])

    window.onresize = () => {
        if(autoResize) {
            setRenderWidth(() => prizeWheelWrapperRef.current.offsetWidth)
            canCelRequestAnimFrame(animateRef.current)
        }
    }

    useEffect(() => {
        if(renderWidth) {
            if(state.wheeling) {
                state.startRadian = 0
                const distance = distanceToStop(state.awardIndex)
                rotatePanel(distance)
            }else {
                onLoad()
            }
            
        }
    },[renderWidth])

    // 如果传入width，size属性，则设置渲染宽度或者渲染倍数
    useEffect(() => {
        if (width) {
            setRenderWidth(() => width)
        }
    }, [width])

    // 检测到传入data变化，开始处理为实际渲染data
    useEffect(() => {
        if (data && data.length) {
            setRenderData(() =>
                data.map((item, index) => {
                    let imgCTX = new Image()
                    if (typeof item.img === 'string') {
                        imgCTX.src = item.img
                    } else {
                        imgCTX.src = item.img.props.src
                    }
                    imgCTX.onload = () => {
                        setLoadRefresh(t => t + 1)
                    }

                    return {
                        ...item,
                        img: imgCTX,
                        index
                    }
                })
            )
        }
        return () => {
        };
    }, [data]);

    // 坚挺到页面大小变化，刷新页面
    useEffect(() => {
        loadRefresh && onLoad()
    }, [loadRefresh])

    // 实际渲染data改变触发初次加载
    useEffect(() => {
        if (renderData && canvasRef) {
            onLoad()
        }
    }, [renderData])

    // 初次加载
    const onLoad = (actualRenderWidth: number = renderWidth) => {

        if (!renderData) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        canvas.style.width = `${actualRenderWidth}px`
        canvas.style.height = `${actualRenderWidth}px`

        const circlepointPos = actualRenderWidth / 2 * devicePixelRatio

        let { startRadian } = state 
        context.save()
        context.beginPath();
        // 设置填充转盘用的颜色,fill是填充而不是绘制
        context.fillStyle = '#fff';
        // 绘制一个圆,有六个参数,分别表示:圆心的x坐标,圆心的y坐标,圆的半径,开始绘制的角度,结束的角度,绘制方向(false表示顺时针)
        context.arc(circlepointPos, circlepointPos, circlepointPos - actualRenderWidth * 0.1 * devicePixelRatio, 0, 2 * Math.PI, false);
        context.fill();
        // 将画布的状态恢复到上一次save()时的状态
        context.restore();
        // 第一个奖品色块开始绘制时开始的弧度及结束的弧度
        let RadianGap = Math.PI * 2 / renderData.length, endRadian = startRadian + RadianGap;
        // 开角两点间直线长度
        const RadianWidth = 2 * Math.PI * circlepointPos / renderData.length

        for (let i = 0; i < renderData.length; i++) {
            context.save();
            context.beginPath();
            // 为了区分不同的色块,使用颜色作为色块的填充色
            context.fillStyle = renderData[i].bgColor;
            // 这里需要使用moveTo方法将初始位置定位在圆点处,这样绘制的圆弧都会以圆点作为闭合点
            context.moveTo(circlepointPos, circlepointPos);
            // 画圆弧时,每次都会自动调用moveTo,将画笔移动到圆弧的起点,半径设置的比转盘稍小一点
            context.arc(circlepointPos, circlepointPos, circlepointPos - actualRenderWidth * 0.1 * devicePixelRatio, startRadian, endRadian, false);
            context.fill();
            context.restore();
            // 开始绘制文字
            context.save();
            //设置文字颜色
            context.fillStyle = renderData[i].txtColor;
            //设置文字样式
            context.font = `${actualRenderWidth / 300 * fontSize * devicePixelRatio}px bold Arial`;
            // 改变canvas原点的位置,translate到哪个坐标点,那么那个坐标点就将变为坐标(0, 0)
            context.translate(
                circlepointPos + Math.cos(startRadian + RadianGap / 2) * circlepointPos,
                circlepointPos + Math.sin(startRadian + RadianGap / 2) * circlepointPos
            );

            // 旋转角度,这个旋转是相对于原点进行旋转的.
            context.rotate(startRadian + RadianGap / 2 + Math.PI / 2);
            // 这里就是根据获取的各行的文字进行绘制,maxLineWidth取140,相当与一行最多展示7个文字

            let tmpLine = 1
            getLineTextList(context, renderData[i].title, RadianWidth).forEach((line, index) => {
                // 绘制文字的方法,三个参数分别带:要绘制的文字,开始绘制的x坐标,开始绘制的y坐标
                context.fillText(line, - context.measureText(line).width / 2, circlepointPos * 0.22 + (++index * circlepointPos * 0.16))
                tmpLine = index
            });

            context.drawImage(
                renderData[i].img, // 渲染图片源
                -RadianWidth * 0.18, // 渲染图片左偏移量（为了保持居中，一般是奖品图片的一半）
                (tmpLine + 2) * circlepointPos * 0.15,  // 渲染图片相对圆边顶部偏移量
                RadianWidth * 0.36,
                RadianWidth * 0.36 / (renderData[i].img.width as number) * (renderData[i].img.height as number) // 图片高度
            )

            context.restore();
            // 每个奖品色块绘制完后,下个奖品的弧度会递增
            startRadian += RadianGap;
            endRadian += RadianGap;
        }
    }

    const setPrize = (awardIndex: number) => {
        if (
            state.wheeling || // 正在出奖
            !renderData.length || // 没有奖品
            awardIndex < 0 || // 出奖index不应该小于0   
            awardIndex > renderData.length - 1 // 出奖index不应该大于 奖品数
        ) return
        state.wheeling = true
        state.awardIndex = awardIndex
        setState(props => ({...props, awardIndex}))
        state.startRadian = 0
        const distance = distanceToStop(awardIndex)
        rotatePanel(distance)
    }

    const rotatePanel = (distance: number) => {
        startWhell(distance)
        function startWhell (distance: number) {
            let changeRadian = (distance - state.startRadian) / 40;
            setState((props) => ({ ...props, startRadian: state.startRadian += changeRadian }));
            // 当最后的目标距离与startRadian之间的差距低于0.001时，就默认奖品抽完了，可以继续抽下一个了。
            if (distance - state.startRadian <= 0.01) {
                successFun && successFun({
                    awardIndex: state.awardIndex,
                    title: renderData[state.awardIndex].title,
                    imgSrc: data[state.awardIndex].img
                })
                setState((props) => ({ ...props, wheeling: false }))
                return
            }
            // 初始角度改变后，需要重新绘制
            onLoad(renderWidth)
            animateRef.current = requestAnimationFrame(() => startWhell(distance));
        }
        // 这里用一个缓动函数来计算每次绘制需要改变的角度，这样可以达到一个转盘从块到慢的渐变的过程
        // 循环调用rotatePanel函数，使得转盘的绘制连续，造成旋转的视觉效果
    }

    // 转盘旋转路径计算
    const distanceToStop = (awardIndex: number) => {
        // middleDegrees为奖品块的中间角度（最终停留都是以中间角度进行计算的）距离初始的startRadian的距离，distance就是当前奖品跑到指针位置要转动的距离。
        let middleDegrees = 0, distance = 0;
        // 映射出每个奖品的middleDegrees
        let awardsToDegreesList = renderData.map((item, index) => {
            let awardRadian = (Math.PI * 2) / renderData.length;
            return awardRadian * index + (awardRadian * (index + 1) - awardRadian * index) / 2
        });
        // 指针停留处
        middleDegrees = awardsToDegreesList[awardIndex];
        // 因为指针是垂直向上的，相当坐标系的Math.PI/2,所以这里要进行判断来移动角度
        distance = Math.PI * 3 / 2 - middleDegrees;
        distance = distance > 0 ? distance : Math.PI * 2 + distance;
        // 这里额外加上后面的值，是为了让转盘多转动几圈，看上去更像是在抽奖
        return distance + Math.PI * 40;
    }

    //绘制文字，文字过长进行换行，防止文字溢出
    const getLineTextList = (context, text, maxLineWidth) => {
        let wordList = text.split(''), tempLine = '', lineList = [];
        for (let i = 0; i < wordList.length; i++) {
            if (context.measureText(tempLine).width >= maxLineWidth) {
                lineList.push(tempLine);
                maxLineWidth -= context.measureText(text[0]).width;
                tempLine = ''
            }
            tempLine += wordList[i]
        }
        lineList.push(tempLine);
        return lineList
    }

    // 获取底部图片，箭头图片
    const getBaseLotteryImg = (
        img: string | JSX.Element,
        className: string,
        style?: React.CSSProperties,
        onClick?: (e: React.MouseEvent<HTMLImageElement>) => void
    ) => {
        if (!img || typeof img === 'string') {
            return <img src={img as string} className={className} style={{ ...style, ...arrowStyle }} onClick={onClick} alt="" />
        }
        return React.cloneElement(img, { className, style, onClick })
    }

    return  <div ref={prizeWheelWrapperRef} className={`${classes} ararin-prizeWheel-wrapper`} style={style}>
                <div style={{ width: renderWidth || '', height: renderWidth || '' }} className="ararin_prizeWheel_box">
                    { getBaseLotteryImg(bgImg, 'ararin-pw-wheel-bg', {...bgStyle}) }
                    <div className="wheel_zone">
                        <canvas
                            height={renderWidth * devicePixelRatio}
                            width={renderWidth * devicePixelRatio}
                            ref={canvasRef}
                            {...restProps}
                        />
                    </div>
                    { getBaseLotteryImg(arrowImg, 'ararin-pw-arrow-bg', {
                        width: renderWidth * 0.33,
                        ...arrowStyle
                    }, onClick)}
                </div>
            </div>
})

PrizeWheel.defaultProps = {
    data: [],
    bgImg: bgImgSrc,
    fontSize: 18,
    autoResize: true,
    arrowImg: arrowImgSrc,
}

export default PrizeWheel