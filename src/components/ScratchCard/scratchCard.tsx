import React, {
    FC,
    forwardRef,
    useRef,
    useState,
    CanvasHTMLAttributes,
    useEffect,
    useImperativeHandle
} from 'react'
import classNames from 'classnames'

interface BaseScratchCardProps {
    className?: string,
    async?: boolean,
    width?: string | number,
    height?: string | number,
    hideImg?: string | JSX.Element,
    prizeImg?: string | JSX.Element,
    openingImg?: string | JSX.Element, 
    style?: React.CSSProperties,
    loadRequest?: () => Promise<{img: string | JSX.Element}>,
    successFun?: () => void,
    failedFun?: () => void,
    reset?: () => void
}

type ScratchCardProps = BaseScratchCardProps & CanvasHTMLAttributes<HTMLCanvasElement>

export const ScratchCard = forwardRef<any, ScratchCardProps>((props, ref) => {

    const prizeWrapperRef = useRef<HTMLDivElement>(null)
    const prizeHidRef = useRef<HTMLCanvasElement>(null)
    const prizeRef = useRef<HTMLCanvasElement>(null)

    const [canvasView, setCanvasView] = useState<{ width: number, height: number }>({width: 0, height: 0})
    const [asyncRequesting, setAsyncRequesting] = useState(false)
    const [showPrize, setShowPrize] = useState(false)

    const {
        className,
        width,
        height,
        hideImg,
        prizeImg,
        openingImg,
        async,
        loadRequest,
        successFun,
        failedFun,
        style
    } = props

    useImperativeHandle(ref, () => ({
        reset: () => {
            setShowPrize(() => false)
            setTimeout(() => {
                const prizeWrapperEle = prizeWrapperRef.current
                setCanvasView(() => ({
                    width: prizeWrapperEle.offsetWidth,
                    height: prizeWrapperEle.offsetHeight
                }))
                loadPrizeImg(prizeWrapperEle.offsetWidth, prizeWrapperEle.offsetHeight)
            }, 0);
        },
    }))

    useEffect(() => {
        const prizeWrapperEle = prizeWrapperRef.current
        setCanvasView(() => ({
            width: prizeWrapperEle.offsetWidth,
            height: prizeWrapperEle.offsetHeight
        }))
        loadPrizeImg(prizeWrapperEle.offsetWidth, prizeWrapperEle.offsetHeight)
    }, [])
    
    const loadPrizeImg = (offsetWidth, offsetHeight) => {
        let hideImgCtx = new Image()

        if(hideImg) {
            if (typeof hideImg === 'string') {
                hideImgCtx.src = hideImg
            } else {
                hideImgCtx.src = hideImg.props.src
            }
            const hideCanvas = prizeHidRef.current.getContext("2d")
            hideImgCtx.onload = () => {
                hideCanvas.beginPath();
                hideCanvas.drawImage(hideImgCtx, 0, 0, offsetWidth, offsetHeight);
                hideCanvas.closePath();
                
                let prizeImgCtx = new Image()

                if(async) {
                    if (typeof openingImg === 'string') {
                        prizeImgCtx.src = openingImg
                    } else {
                        prizeImgCtx.src = openingImg.props.src
                    }
                }else {
                    if (typeof prizeImg === 'string') {
                        prizeImgCtx.src = prizeImg
                    } else {
                        prizeImgCtx.src = prizeImg.props.src
                    }
                }
                const prizeCanvas = prizeRef.current.getContext("2d")
                prizeImgCtx.onload = () => {
                    prizeCanvas.beginPath();
                    prizeCanvas.drawImage(prizeImgCtx, 0, 0, offsetWidth, offsetHeight);
                    prizeCanvas.closePath();
                    prizeHidRef.current.ontouchmove = e => drawHandleMove(e, offsetWidth, offsetHeight)
                    prizeHidRef.current.ontouchend = e => drawMoveEnd(e, offsetWidth, offsetHeight)
                }
            }
        }
    }

    const drawMoveEnd = (e, offsetWidth, offsetHeight) => {
        if(asyncRequesting) return
        if(!prizeHidRef.current) return
        const hideCanvas = prizeHidRef.current.getContext("2d")

        let imageDate = hideCanvas.getImageData(0, 0, offsetWidth, offsetHeight);

        let allPX = imageDate.width * imageDate.height;

        let iNum = 0;//记录刮开的像素点个数

        for (let i = 0; i < allPX; i++) {
            if (imageDate.data[i * 4 + 3] == 0) {
                iNum++;
            }
        }
        if (iNum >= allPX * 1 / 3) {
            setShowPrize(() => true)
            if(async) {
                loadRequest().then(data => {
                    console.log(data)
                    setShowPrize(() => true)
                    asyncShowPrize(data, { offsetWidth, offsetHeight }, successFun)
                }).catch(data => {
                    setShowPrize(() => true)
                    asyncShowPrize(data, { offsetWidth, offsetHeight }, failedFun)
                })
            }else {
                asyncShowPrize({img: prizeImg}, { offsetWidth, offsetHeight }, successFun)
            }
            
        }
    }

    const asyncShowPrize = (data: { img: string | JSX.Element }, view: { offsetWidth: number, offsetHeight: number }, callBack) => {
        let prizeImg = new Image()
        if(typeof data.img == 'string') {
            prizeImg.src = data.img
        }else {
            prizeImg.src = data.img.props.src
        }
        const prizeCanvas = prizeRef.current.getContext("2d")
        prizeImg.onload = () => {
            prizeCanvas.beginPath();
            prizeCanvas.drawImage(prizeImg, 0, 0, view.offsetWidth, view.offsetHeight);
            prizeCanvas.closePath();
            callBack && callBack()
        }
    }
    
    // 手指滑动开奖
    const drawHandleMove = (e, offsetWidth, offsetHeight) => {
        if(!prizeHidRef.current) return
        e.preventDefault()
        const hideCanvas = prizeHidRef.current.getContext("2d")
        const windowTop = document.body.scrollTop || document.documentElement.scrollTop
        let x = e.touches[0].clientX - prizeWrapperRef.current.offsetLeft 
        let y = e.touches[0].clientY - prizeWrapperRef.current.offsetTop + windowTop
        hideCanvas.beginPath();
        hideCanvas.globalCompositeOperation = "destination-out";
        hideCanvas.arc(x, y, 20, 0, Math.PI * 2, false);
        hideCanvas.fill();
        hideCanvas.closePath();
    }
    
    return  <div className="ararin_sc_wrapper" style={{ ...style, width, height }}>
                <div ref={prizeWrapperRef} className="ararin_sc_zone">
                    {!showPrize &&
                        <canvas 
                            ref={prizeHidRef}
                            className="ararin_sc_prize_hide" 
                            width={canvasView.width}
                            height={canvasView.height}
                        />
                    }
                    <canvas 
                        ref={prizeRef}
                        className="ararin_sc_prize" 
                        width={canvasView.width}
                        height={canvasView.height}
                    />                        
                </div>
            </div>
})

ScratchCard.defaultProps = {
    async: false
}

export default ScratchCard