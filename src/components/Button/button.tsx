import React, {
	FC,
	ButtonHTMLAttributes,
	AnchorHTMLAttributes,
	useRef,
} from 'react'
import classNames from 'classnames'
import TouchFeedback from 'rmc-feedback';
import Icon, { IconType } from '../Icon'
import { setCssStyle } from '../../util/util'

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

const PrefixBrowser = [
	"-webkit-",
	"-moz-",
	"-ms-",
	"-o-",
	""
]

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
	if (state === 'loading') {
		disabled = true
		iconEle = <Icon
			
			iconState="spin"
			type="loading"
		></Icon>

	} else if (state === 'disabled') {
		disabled = true
	} else if (state === 'failed') {
		disabled = true
		iconEle = <Icon
			type="failed"
		>
		</Icon>
	} else if (typeof icon === 'string') {
		iconEle = <Icon
			iconState={iconState}
			type={icon}
		></Icon>
	} else if (icon) {
		iconEle = icon
	}

	const classes = classNames('ecsc-button', className, {
		[`ecsc-button-${type}`]: type,
		[`ecsc-button-${size}`]: size,
		// loading样式，临时放在这，等后期再次开发
		[`ecsc-button-${state}`]: state,
		'disabled': disabled,
		'ecsc-button-ripple': ripple
	})
	var duration = 750;
	const Radius = 12.5

	// 样式string拼凑
	var forStyle = function (position) {
		var cssStr = '';
		for (var key in position) {
			if (position.hasOwnProperty(key)) cssStr += key + ':' + position[key] + ';';
		};
		return cssStr;
	}

	// 获取鼠标点击位置
	var forRect = function (target) {
		var position = {
			top: 0,
			left: 0,
			width: 0,
			height: 0,
		}, ele = document.documentElement;
		'undefined' != typeof target.getBoundingClientRect && (position = target.getBoundingClientRect());
		return {
			top: position.top + window.pageYOffset - ele.clientTop,
			left: position.left + window.pageXOffset - ele.clientLeft
		}
	}

	const show = event => {
		let pDiv = event.target,
			cDiv = document.createElement('div');
		pDiv.appendChild(cDiv);
		let rectObj = forRect(pDiv),
			_height = event.pageY - rectObj.top,
			_left = event.pageX - rectObj.left,
			_scale = 'scale(' + pDiv.clientWidth / 100 * 4.5 + ')';
		let position = {
			top: _height - Radius + 'px',
			left: _left - Radius + 'px',
			width: '25px',
			height: '25px',
			transform: '',
			opacity: '0'
		};
		let finishStyle = {
			opacity: 0,
			width: '25px',
			height: '25px',
			top: _height - Radius + "px",
			left: _left - Radius + "px",
		};
		cDiv.className = cDiv.className + "ecsc-button-ripple-animation"
		cDiv.setAttribute("style", forStyle(position))
		setCssStyle(position, 'transform', _scale)
		setCssStyle(position, 'opacity', 1)
		setCssStyle(position, 'transition-duration', duration + "ms")
		setCssStyle(position, 'transition-timing-function', "cubic-bezier(0.250, 0.460, 0.450, 0.940)")
		cDiv.setAttribute("style", forStyle(position));
		setCssStyle(finishStyle, 'transition-duration', duration + "ms")
		setCssStyle(finishStyle, 'transform', _scale)
		setTimeout(function () {
			cDiv.setAttribute("style", forStyle(finishStyle));
			setTimeout(function () {
				pDiv.removeChild(cDiv);
			}, duration);
		}, 250)
	}

	const handleClick = e => {
		ripple && show(e);
		onClick && onClick(e)
	}

	return <>
		<TouchFeedback
			activeClassName={
				activeClassName || (ripple ? undefined : `ecsc-button-${type}-active`)
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