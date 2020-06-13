import React, {
    FC,
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    useRef,
    useEffect
} from 'react'
import classNames from 'classnames'
import { requestAnimFrame, canCelRequestAnimFrame } from '../../util/refreshRate'
import TouchFeedback from 'rmc-feedback';

const refreshrate = require('refreshrate');

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
    href?: string,
    type?: ButtonType,
    size?: ButtonSize,
    className?: string,
    disabled?: boolean,
    state?: ButtonState,
    children?: React.ReactNode,
    ripple?: boolean;
    style?: React.CSSProperties,
    activeClassName?: string,
    activeStyle?: React.CSSProperties,
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
        type,
        size,
        ripple,
        onClick,
        href,
        activeStyle,
        activeClassName,
        style,
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
        centerX: 0,
        centerY: 0,
        radius: 0,
        radiusSpeed: 10,
        opacitySpeed: 0.015,
        opacity: 0,
        defaultRadiusSpeed: 12,
        defaultOpacity: '0.25',
        bgColor: type === 'default' ? '#999' : '#ffffff'
    })

    //检查屏幕帧率
    useEffect(() => {
        if(ripple) {
            refreshrate((hz: number) => {fixSpeed(hz)}, 10)
        }


        
        return () => { 
        };
    }, []);

    //修复水波纹扩散速度
    const fixSpeed = (hz: number) => {
        console.log()
        if(hz > 300) {
            refreshrate((hz: number) => {fixSpeed(hz)}, 10)
        }else if(hz < 60) {
            hz = 60
        }
        let { radiusSpeed, opacitySpeed } = rippleData.current
        rippleData.current.radiusSpeed = radiusSpeed * (60 / hz)
        rippleData.current.opacitySpeed = opacitySpeed * (60 / hz)
    }

    //水波纹开始，转发点击事件
    const handleRippleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.persist()
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
                console.log(rippleComponent.current.width, rippleComponent.current.height)
                context.clearRect(0, 0, rippleComponent.current.width, rippleComponent.current.height);
                rippleDrawRadius(context)
            }         
        }
    }

    //重置开始
    const resetAnime = () => {
        const canvas = rippleComponent.current
        if(canvas) {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            rippleData.current.radiusSpeed = rippleData.current.defaultRadiusSpeed * Math.max(canvas.width / 375, 1)
        }
        rippleData.current.radius = 0
        rippleData.current.opacity = 0.25
        if(rippleComponent.current) {
            rippleComponent.current.style.opacity = rippleData.current.defaultOpacity
        }
    }

    //圆扩散动画
    const rippleDrawRadius = (context: CanvasRenderingContext2D) => {
        let { centerX, centerY, radius, bgColor, opacity, radiusSpeed } = rippleData.current
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

    //透明度扩散
    const rippleDrawOpacity = () => {
        let { opacity, opacitySpeed } = rippleData.current
        if(rippleComponent.current) {
            rippleComponent.current.style.opacity = opacity + ''
            if (rippleComponent.current &&  rippleData.current.opacity > 0.001) {
                rippleData.current.opacity = Math.max((opacity -= opacitySpeed), 0) 
                animateId.current = requestAnimFrame(() => rippleDrawOpacity())
            }
        }
    }

    //处理图标
    let iconEle
        
    return  <>
                <TouchFeedback
                    activeClassName={
                        activeClassName || (ripple ? undefined : `ararin-button-${type}-active`)
                    }
                    disabled={disabled}
                    activeStyle={activeStyle}
                >
                    <a 
                        style={style}
                        href={disabled ? undefined : href}
                        className={classes}
                        {...restProps}
                        onClick={disabled ? undefined : (ripple? handleRippleClick : onClick)}
                    >
                        {ripple && <canvas 
                                        style={{opacity: rippleData.current.opacity}}
                                        className="ararin-btn-ripple"  
                                        ref={rippleComponent} 
                                    />
                        }
                        <div
                            className="ararin-button-box"
                        >
                            {iconEle}
                            {children}
                        </div>
                    </a>
                </TouchFeedback>
            </>
}

Button.defaultProps = {
    size: "md",
    disabled: false,
    type: 'default'
} 

export default Button;