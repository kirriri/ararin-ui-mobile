import React, {
    FC,
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    useRef,
    useEffect
} from 'react'
import classNames from 'classnames'
import TouchFeedback from 'rmc-feedback';
import Icon, { IconType } from '../Icon'

/**
 * 这个Button考虑到Canvas可使用的上限个数，故改为Css实现水波纹
 */

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

    const btn = useRef<HTMLAnchorElement>(null)
    
    let {
        disabled
    } = props


    //处理图标
    let iconEle
    if(state === 'loading') {
        disabled = true
        iconEle =   <Icon
                        iconState="spin"
                        type="loading"
                    ></Icon>
        // iconEle =  <CSSTransition
        //                 in={state === 'loading'} // 如果this.state.show从false变为true，则动画入场，反之out出场
        //                 timeout={500} //动画执行1秒
        //                 classNames='test' //自定义的class名
        //                 unMountOnExit
        //                 appear={true}
        //             >
        //                 <Icon
        //                     iconState="spin"
        //                     type="loading"
        //                 ></Icon>
        //             </CSSTransition>
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
        'disabled': disabled,
        'ararin-button-ripple': ripple
    })
    var duration = 750;

    // 样式string拼凑
    var forStyle = function(position){
        var cssStr = '';
        for( var key in position){
          if(position.hasOwnProperty(key)) cssStr += key+':'+position[key]+';';
        };
        return cssStr;
      }

      // 获取鼠标点击位置
      var forRect = function(target){
        var position = {
          top:0,
          left:0
        }, ele = document.documentElement;
        'undefined' != typeof target.getBoundingClientRect && (position = target.getBoundingClientRect());
        return {
            top: position.top + window.pageYOffset - ele.clientTop,
            left: position.left + window.pageXOffset - ele.clientLeft
        }
      }

    var show = function(event){
        var pDiv = event.target,
          cDiv = document.createElement('div');
        pDiv.appendChild(cDiv);
        var rectObj = forRect(pDiv),
          _height = event.pageY - rectObj.top,
          _left = event.pageX - rectObj.left,
          _scale = 'scale(' + pDiv.clientWidth / 100 * 6 + ')';
        var position = {
          top: _height+'px',
          left: _left+'px',
          transform: '',
          opacity: '0'

        };
        cDiv.className = cDiv.className + "ararin-button-ripple-animation "
        cDiv.setAttribute("style", forStyle(position))
        position["-webkit-transform"] = _scale
        position["-moz-transform"] = _scale
        position["-ms-transform"] = _scale
        position["-o-transform"] = _scale
        position.transform = _scale
        position.opacity = "1"
        position["-webkit-transition-duration"] = duration + "ms"
        position["-moz-transition-duration"] = duration + "ms"
        position["-o-transition-duration"] = duration + "ms"
        position["transition-duration"] = duration + "ms"
        position["-webkit-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)"
        position["-moz-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)"
        position["-o-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)"
        position["transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)"
        cDiv.setAttribute("style", forStyle(position));
        var finishStyle = {
          opacity: 0,
          "-webkit-transition-duration": duration + "ms",
          "-moz-transition-duration": duration + "ms",
          "-o-transition-duration": duration + "ms",
          "transition-duration": duration + "ms",
          "-webkit-transform" : _scale,
          "-moz-transform" : _scale,
          "-ms-transform" : _scale,
          "-o-transform" : _scale,
          top: _height + "px",
          left: _left + "px",
        };
        setTimeout(function(){
          cDiv.setAttribute("style", forStyle(finishStyle));
          setTimeout(function(){
            pDiv.removeChild(cDiv);
          },duration);
        },100)
      }

    const handleClick = e => {
        show(e);
        if(onClick) {
            onClick(e)
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
                        ref={btn}
                        style={style}
                        href={disabled ? undefined : href}
                        className={classes}
                        {...restProps}
                        onClick={handleClick}
                    >
                        
                        {iconEle}
                        {children}
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