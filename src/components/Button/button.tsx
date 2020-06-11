import React, {
    FC,
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    useRef
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

    let canvasData = {
        centerX: 0,
        centerY: 0,
        radius: 0
    }
    
    const rippleComponent = useRef<HTMLCanvasElement>(null)
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if(onClick) {
            onClick(e)
        }
        const canvas = rippleComponent.current
        if(ripple && canvas) {
            canvas.click()
        }
    }

    const requestAnimFrame = function () {
        return (
            window.requestAnimationFrame  || 
            function (callback) {
            window.setTimeout(callback, 1000 / 60);
            }
        );
    } ()

    const handleRippleClick = (e: React.MouseEvent) => {
        let canvas = rippleComponent.current
        if(canvas) {
            let context = canvas.getContext('2d');
            canvasData.radius = 0
            console.log(e)
            // centerX = event.offsetX;
        }
        // centerX = e.offsetX;
        // centerY = e.offsetY;
        // context.clearRect(0, 0, element.width, element.height);
        // draw();
    }
    
    return  <>
                <div className={classes} onClick={handleClick}>
                    <div
                        className="ararin-ripple-box"
                        {...restProps}
                    >
                        {children}
                    </div>
                    {ripple && <canvas 
                                    className="ararin-btn-ripple"  
                                    ref={rippleComponent} 
                                    onClick={handleRippleClick}
                                />
                    }
                </div>
            </>
}

Button.defaultProps = {
    disabled: false,
    type: 'default'
} 

export default Button;