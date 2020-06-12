import React, {
    FC,
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    useRef,
    useEffect
} from 'react'
import classNames from 'classnames'
import { requestAnimFrame, canCelRequestAnimFrame } from '../../util/refreshRate'
import omit from 'omit.js'

var refreshrate = require('refreshrate');

/**
 * Button组件的3种状态
 */
type ButtonState = 'loading' | 'static' | 'disabled'

/**
 * Button组件的大小
 */
type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * Button组件的类型
 */
type ButtonType = 'primary' | 'default' | 'warning' | 'danger' | 'link' | 'success'

interface BaseButtonProps {
    type?: ButtonType,
    size?: ButtonSize,
    className?: string,
    disabled?: boolean,
    state?: ButtonState,
    children?: React.ReactNode,
    href?: string,
    ripple?: boolean;
}

type NativeButtonProps = BaseButtonProps & Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>
type AnchorButtonProps = BaseButtonProps & Omit<AnchorHTMLAttributes<HTMLElement>, 'type'>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = props => {
    const {
        className,
        disabled,
        state,
        children,
        href,
        type,
        size,
        ripple,
        onClick,
        ...restProps
    } = props

    const classes = classNames('ararin-button',className , {
        [`ararin-button-${type}`] : type,
        [`ararin-button-${size}`] : size,
        'disabled': disabled
    })
    
    //开启水波纹动画
    
    const rippleComponent = useRef<HTMLCanvasElement>(null)
    const animateId = useRef<number>()
    const rippleData = useRef({
        animating: false,
        centerX: 0,
        centerY: 0,
        radius: 0,
        radiusSpeed: 10,
        opacitySpeed: 0.012,
        opacity: 0,
        bgColor: type === 'default' ? '#dddddd' : '#ffffff'
    })

    useEffect(() => {
        if(ripple) {
            if(rippleComponent.current) {
                let canvas = rippleComponent.current
                canvas.width  = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            }
            refreshrate((hz: number) => {fixSpeed(hz)}, 10)
        }
        return () => { 

        };
    }, []);

    const fixSpeed = (hz: number) => {
        if(hz > 300) {
            refreshrate((hz: number) => {fixSpeed(hz)}, 10)
        }else if(hz < 60) {
            hz = 60
        }
        let { radiusSpeed, opacitySpeed } = rippleData.current
        rippleData.current.radiusSpeed = radiusSpeed * (60 / hz)
        rippleData.current.opacitySpeed = opacitySpeed * (60 / hz)
    }

    const handleRippleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.persist()
        if(disabled) {
            return
        }
        if(onClick) {
            onClick(e)
        }
        if(rippleComponent.current) {
            const canvas = rippleComponent.current
            const context = canvas.getContext('2d');
            rippleData.current.centerX = e.nativeEvent.offsetX
            rippleData.current.centerY = e.nativeEvent.offsetY
            if(context) {
                resetAnime()
                context.clearRect(0, 0, rippleComponent.current.width, rippleComponent.current.height);
                rippleDrawRadius(context)
            }         
        }
    }

    const resetAnime = () => {
        rippleData.current.radius = 0
        rippleData.current.opacity = 0.24
        if(rippleComponent.current) {
            rippleComponent.current.style.opacity = '0.25'
        }
    }

    const rippleDrawRadius = (context: CanvasRenderingContext2D) => {
        let { centerX, centerY, radius, bgColor, opacity, radiusSpeed, animating } = rippleData.current
        if(animateId.current) {
            canCelRequestAnimFrame(animateId.current)
        }
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = bgColor;
        context.fill();
        rippleData.current.radius = radius += radiusSpeed
        if (rippleComponent.current && radius < rippleComponent.current.width) {
            animateId.current = requestAnimFrame(() => rippleDrawRadius(context));
        }else if(rippleComponent.current && opacity > 0.001){
            animateId.current = requestAnimFrame(() => rippleDrawOpacity());
        }
    };

    const rippleDrawOpacity = () => {
        let { opacity, opacitySpeed } = rippleData.current
        if(rippleComponent.current) {
            rippleComponent.current.style.opacity = opacity + ''
            if (rippleComponent.current &&  rippleData.current.opacity > 0.001) {
                rippleData.current.opacity = opacity -= opacitySpeed
                animateId.current = requestAnimFrame(() => rippleDrawOpacity())
            }
        }
    }

    //未开启动画的按钮
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if(disabled) {
            return
        }
        e.persist()
        if(onClick) {
            onClick(e)
        }
    }
    let omitProps = restProps
    if(disabled) {
        omitProps = omit(restProps, ['onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'])
    }
    
    return  <>
                {
                    ripple ?
                        <a 
                            href={href}
                            className={classes}
                            {...omitProps}
                        >
                            <div
                                className="ararin-ripple-bg"
                            >
                                {children}
                            </div>
                             <canvas 
                                style={{opacity: rippleData.current.opacity}}
                                className="ararin-btn-ripple"  
                                ref={rippleComponent} 
                                onClick={handleRippleClick}
                            />
                        </a> :
                        <a 
                            href={href}
                            className={classes}
                            {...omitProps}
                            onClick={handleClick}
                        >
                            <div
                                className="ararin-ripple-bg"
                            >
                                {children}
                            </div>
                        </a>
                }
            </>
}

Button.defaultProps = {
    disabled: false,
    type: 'default'
} 

export default Button;