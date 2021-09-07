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
import { isPc } from '../../util/util'

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
    disabled?: boolean
}

type ScratchCardProps = BaseScratchCardProps & CanvasHTMLAttributes<HTMLCanvasElement>

export const ScratchCard = forwardRef<any, ScratchCardProps>((props, ref) => {

    const prizeWrapperRef = useRef<HTMLDivElement>(null)
    const prizeHideRef = useRef<HTMLCanvasElement>(null)
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
        style,
        disabled
    } = props

    useImperativeHandle(ref, () => ({
        reset: () => {
            setShowPrize(() => false)
            setTimeout(() => {
                onLoad()
            }, 0);
        },
    }))

    useEffect(() => {
        onLoad()
    }, [])

    const onLoad = () => {
        const prizeWrapperEle = prizeWrapperRef.current
        setCanvasView(() => ({
            width: prizeWrapperEle.offsetWidth,
            height: prizeWrapperEle.offsetHeight
        }))

        if(prizeRef.current) {
            const prizeCanvas = prizeRef.current
            prizeCanvas.style.width = `${prizeWrapperEle.offsetWidth}px`
            prizeCanvas.style.height = `${prizeWrapperEle.offsetHeight}px`    
        }

        if(prizeHideRef.current) {
            const prizeHidecanvas = prizeHideRef.current
            prizeHidecanvas.style.width = `${prizeWrapperEle.offsetWidth}px`
            prizeHidecanvas.style.height = `${prizeWrapperEle.offsetHeight}px`    
        }
        
        loadPrizeImg(prizeWrapperEle.offsetWidth, prizeWrapperEle.offsetHeight)
    }
    
    const loadPrizeImg = (offsetWidth, offsetHeight) => {

        let hideImgCtx = new Image()

        // hideImgCtx.setAttribute('crossOrigin', '')
        
        if(hideImg) {
            if (typeof hideImg === 'string') {
                hideImgCtx.src = hideImg + `?timeSign=${new Date().getTime()}`
            } else {
                hideImgCtx.src = hideImg.props.src
            }

            const hideCanvas = prizeHideRef.current.getContext("2d")

            hideImgCtx.onload = () => {

                hideCanvas.beginPath();
                hideCanvas.clearRect(0, 0, offsetWidth * devicePixelRatio, offsetHeight * devicePixelRatio);
                
                prizeHideRef.current.width = prizeHideRef.current.width

                hideCanvas.drawImage(hideImgCtx, 0, 0, offsetWidth * devicePixelRatio, offsetHeight * devicePixelRatio);
                hideCanvas.closePath();
                
                let prizeImgCtx = new Image()
                prizeImgCtx.crossOrigin = 'Anonymous'

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
                    prizeCanvas.clearRect(0, 0, offsetWidth * devicePixelRatio, offsetHeight * devicePixelRatio);

                    prizeRef.current.width = prizeRef.current.width

                    prizeCanvas.drawImage(prizeImgCtx, 0, 0, offsetWidth * devicePixelRatio, offsetHeight * devicePixelRatio);
                    prizeCanvas.closePath();
                    if(!disabled) {
                        if(isPc()) {
                            // prizeHideRef.current.
                        }else {
                            prizeHideRef.current.ontouchmove = e => drawHandleMove(e, offsetWidth, offsetHeight)
                            prizeHideRef.current.ontouchend = e => drawMoveEnd(e, offsetWidth, offsetHeight)
                        }
                    }
                }
            }
        }
    }

    const drawMoveEnd = (e, offsetWidth, offsetHeight) => {
        if(asyncRequesting) return
        if(!prizeHideRef.current) return

        const hideCanvas = prizeHideRef.current.getContext("2d")

        let imageData = hideCanvas.getImageData(0, 0, offsetWidth * devicePixelRatio, offsetHeight * devicePixelRatio);

        let allPX = imageData.width * imageData.height;

        let iNum = 0;//记录刮开的像素点个数

        for (let i = 0; i < allPX; i++) {
            if (imageData.data[i * 4 + 3] == 0) {
                iNum++;
            }
        }
        if (iNum >= allPX * 1 / 3) {
            setShowPrize(() => true)
            if(async) {
                loadRequest().then(data => {
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
        prizeImg.crossOrigin = 'Anonymous'

        if(typeof data.img == 'string') {
            prizeImg.src = data.img
        }else {
            prizeImg.src = data.img.props.src
        }
        const prizeCanvas = prizeRef.current.getContext("2d")
        prizeImg.onload = () => {
            prizeCanvas.beginPath();
            prizeCanvas.drawImage(prizeImg, 0, 0, view.offsetWidth * devicePixelRatio, view.offsetHeight * devicePixelRatio);
            prizeCanvas.closePath();
            callBack && callBack()
        }
    }
    
    // 手指滑动开奖
    const drawHandleMove = (e, offsetWidth, offsetHeight) => {
        if(!prizeHideRef.current) return
        e.preventDefault()

        const hideCanvas = prizeHideRef.current.getContext("2d")
        // console.log(prizeHideRef.current.getBoundingClientRect() )
        // console.log(e.touches[0].clientX, e.touches[0].clientY, document.body.offsetTop || document.documentElement.offsetTop)

        let x = e.touches[0].clientX - prizeHideRef.current.getBoundingClientRect().x
        let y = e.touches[0].clientY - prizeHideRef.current.getBoundingClientRect().y
        hideCanvas.beginPath();
        hideCanvas.globalCompositeOperation = "destination-out";
        hideCanvas.arc(x * devicePixelRatio, y * devicePixelRatio, 20 * devicePixelRatio, 0, Math.PI * 2, false);
        hideCanvas.fill();
        hideCanvas.closePath();
    }
    
    return  <div ref={prizeWrapperRef} className={`ararin_sc_wrapper ${className || ''}`} style={{ ...style, width, height }}>
                <div className="ararin_sc_zone">
                    {!showPrize &&
                        <canvas 
                            ref={prizeHideRef}
                            className="ararin_sc_prize_hide" 
                            width={canvasView.width * devicePixelRatio}
                            height={canvasView.height * devicePixelRatio}
                        />
                    }
                    <canvas 
                        ref={prizeRef}
                        className="ararin_sc_prize" 
                        width={canvasView.width * devicePixelRatio}
                        height={canvasView.height * devicePixelRatio}
                    />                        
                </div>
            </div>
})

ScratchCard.defaultProps = {
    async: false
}

export default ScratchCard