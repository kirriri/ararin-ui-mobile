import React, {
    FC,
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    useRef,
    useEffect
} from 'react'
import classNames from 'classnames'


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
type ButtonType = 'primary' | 'default' | 'warning' | 'danger' | 'link'

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
    
    const rippleComponent = useRef<HTMLCanvasElement>(null)
    const rippleData = useRef({
        centerX: 0,
        centerY: 0,
        radius: 0,
        opacity: 0.18,
        bgColor: '#ffffff'
    })

    useEffect(() => {
        console.warn(rippleComponent)
        if(rippleComponent.current) {
            let canvas = rippleComponent.current
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        return () => {  };
    }, []);

    
    const requestAnimFrame = (function() {
    return  window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            // window.mozRequestAnimationFrame || 
            // window.oRequestAnimationFrame || 
            // window.msRequestAnimationFrame ||
        function(callback: Function, element: FC<HTMLElement>) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })()


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
                context.clearRect(0, 0, rippleComponent.current?.width, rippleComponent.current?.height);
                rippleDrawRadius(context)
            }         
        }
    }

    const resetAnime = () => {
        rippleData.current.radius = 0
        rippleData.current.opacity = 0.18
        if(rippleComponent.current) {
            rippleComponent.current.style.opacity = '0.18'
        }
    }

    const rippleDrawRadius = (context: CanvasRenderingContext2D) => {
        let { centerX, centerY, radius, bgColor, opacity } = rippleData.current
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = bgColor;
        context.fill();
        rippleData.current.radius = radius += 2.2
        if (rippleComponent.current && radius < rippleComponent.current.width) {
            requestAnimFrame(() => rippleDrawRadius(context));
        }else if(rippleComponent.current && opacity > 0.001){
            requestAnimFrame(() => rippleDrawOpacity());
        }
    };

    const rippleDrawOpacity = () => {
        let { opacity } = rippleData.current
        if(rippleComponent.current) {
            rippleComponent.current.style.opacity = opacity + ''
            if (rippleComponent.current &&  rippleData.current.opacity > 0.001) {
                rippleData.current.opacity = opacity -= 0.001
                requestAnimFrame(() => rippleDrawOpacity())
            }
        }
    }

    return  <>
                <a 
                    className={classes}
                    {...restProps}
                >
                    <div
                        className="ararin-ripple-box"
                    >
                        {children}
                    </div>
                    {ripple && <canvas 
                                    style={{opacity: rippleData.current.opacity}}
                                    className="ararin-btn-ripple"  
                                    ref={rippleComponent} 
                                    onClick={handleRippleClick}
                                />
                    }
                </a>
            </>
}

Button.defaultProps = {
    disabled: false,
    type: 'default'
} 

export default Button;