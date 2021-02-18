import React, {
    FC,
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    useRef,
    useEffect
} from 'react'
import classNames from 'classnames'
import { requestAnimationFrame, canCelRequestAnimFrame } from '../../util/animateJs'
import TouchFeedback from 'rmc-feedback';
import Icon, { IconType } from '../Icon'
import { refreshRate }  from '../../util/refreshRate';
import { CSSTransition } from 'react-transition-group'

/**
 * Button组件的3种状态
 */
type ButtonState = 'loading' | 'static' | 'disabled' | 'failed'

/**
 * Button组件的大小
 */
type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * Button组件的类型
 */
type ButtonType = 'primary' | 'default' | 'warning' | 'danger' | 'link' | 'success'

interface BaseButtonProps {
    icon?: React.ReactNode,
    iconState?: IconType,
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
        icon,
        iconState,
        className,
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

    let {
        disabled
    } = props

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
        defaultRadiusSpeed: 10,
        defaultOpacity: '0.25',
        bgColor: type === 'default' ? '#999' : '#ffffff'
    })

    //处理图标
    let iconEle
    if(state === 'loading') {
        disabled = true
        iconEle =   <Icon
                        iconState="spin"
                        type="loading"
                    ></Icon>
        
    }else if (state === 'disabled') {
        disabled = true
    }else if (state === 'failed') {
        disabled = true
        iconEle =   <Icon
                        type="failed"
                    >
                    </Icon>
    }else if(typeof icon === 'string') {
        iconEle =   <Icon
                        iconState={iconState}
                        type={icon}
                    ></Icon>
    }else if(icon) {
        iconEle = icon
    }

    const classes = classNames('ararin-button',className , {
        [`ararin-button-${type}`] : type,
        [`ararin-button-${size}`] : size,
        // loading样式，临时放在这，等后期再次开发
        [`ararin-button-${state}`] : state,
        'disabled': disabled
    })
    //检查屏幕帧率
    useEffect(() => {
        if(ripple) {
            refreshRate((hz: number) => {fixSpeed(hz)}, 30)
        }
        return () => { 
        };
    }, []);

    //修复水波纹扩散速度
    const fixSpeed = (hz: number) => {
        if(hz > 300) {
            refreshRate((hz: number) => {fixSpeed(hz)}, 30)
            return
        }else if(hz < 60) {
            hz = 60
        }
        let { radiusSpeed, opacitySpeed } = rippleData.current
        rippleData.current.radiusSpeed = radiusSpeed * (60 / hz)
        rippleData.current.defaultRadiusSpeed = radiusSpeed * (60 / hz)
        rippleData.current.opacitySpeed = opacitySpeed * (60 / hz)
    }

    //水波纹点击，转发点击事件，开始水波纹计算
    const handleRippleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.persist()
        if(onClick && !disabled) {
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
        rippleData.current.radius = radius += rippleData.current.radiusSpeed
        if (rippleComponent.current && radius < rippleComponent.current.width) {
            animateId.current = requestAnimationFrame(() => rippleDrawRadius(context));
        }else if(rippleComponent.current && opacity > 0.001){
            animateId.current = requestAnimationFrame(() => rippleDrawOpacity());
        }
    };

    //透明度扩散
    const rippleDrawOpacity = () => {
        let { opacity, opacitySpeed } = rippleData.current
        if(rippleComponent.current) {
            rippleComponent.current.style.opacity = opacity + ''
            if (rippleComponent.current &&  rippleData.current.opacity > 0) {
                rippleData.current.opacity = Math.max((opacity -= opacitySpeed), 0) 
                animateId.current = requestAnimationFrame(() => rippleDrawOpacity())
            }
        }
    }
        
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
    type: 'default',
    iconState: 'static'
} 

export default Button;