import React from 'react'
import BaseDialog from 'rmc-dialog';
import classnames from 'classnames'
import { Icon } from '../Icon/icon'

export interface FooterBaseProps {
    text?: string,
    style?: React.CSSProperties,
    activeStyle?: React.CSSProperties,
    higlight?: boolean,
    onPress?: (e: React.MouseEvent) => void,
    className?: string
}

type DialogAnimation = 'slide-up' | 'slide-down'

export interface DialogBaseProps {
    style?: React.CSSProperties,
    afterClose?: () => void,
    activeClassName?: string,
    wrapClassName?: string,
    animation?: DialogAnimation,
    prefixCls?: string,
    className?: string,
    visible?: boolean,
    closeIcon?: boolean,
    title?: React.ReactNode,
    maskAnimation?: string
    maskClosable?: boolean,
    footer?: FooterBaseProps[],
    onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void
}

export const Popup: React.FC<DialogBaseProps> = props => {

    let {
        maskClosable,
        prefixCls,
        className,
        wrapClassName,
        maskAnimation,
        activeClassName,
        onClose,
        animation,
        closeIcon,
        children,
        footer,
        title,
        ...restProps
    } = props

    const onHandleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault()
        if(onClose) {
            onClose(e)
        }
    }

    const classes = classnames({
        [`${prefixCls}`]: prefixCls && !className,
        [`${className}`]: className,
        [`${prefixCls}-${animation}`]: animation
    })

    const head = () =>  closeIcon ? <div className="app-header-zone">{ title }{ closeIcon && <Icon type="close" onClick={onClose}/>}</div> : title
    
    return (
        <BaseDialog
            closable={false}
            onClose={onHandleClose}
            wrapClassName={wrapClassName}
            maskClosable={maskClosable}
            animation={animation}
            maskAnimation="fade"
            className={classes}
            title={head()}
            prefixCls={prefixCls}
            {...restProps}
        >
            {children}
        </BaseDialog>
    )
}

Popup.defaultProps = {
    prefixCls: 'aap',
    maskAnimation: 'fade',
    maskClosable: false,
    animation: 'slide-up',
    closeIcon: true
}

export default Popup