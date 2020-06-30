import React from 'react'
import TouchFeedback from 'rmc-feedback';
import BaseDialog from 'rmc-dialog';
import classnames from 'classnames'
import Icon from '../Icon'
import omit from 'omit.js'

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

export const Poup: React.FC<DialogBaseProps> = props => {

    let {
        maskClosable,
        prefixCls,
        className,
        maskAnimation,
        activeClassName,
        onClose,
        animation,
        closeIcon,
        children,
        footer,
        ...restProps
    } = props

    const onHandleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault()
        if(onClose) {
            onClose(e)
        }
    }

    // const classes = className('a')
    
    return (
        <BaseDialog
            closable={false}
            onClose={onClose}
            wrapClassName=""
            maskClosable={maskClosable}
            animation={animation}
            maskAnimation="fade"
            className={className}
            prefixCls={prefixCls}
            {...restProps}
        >
            {children}
        </BaseDialog>
    )
}

Poup.defaultProps = {
    prefixCls: 'ad',
    maskAnimation: 'fade',
    maskClosable: false,
    animation: 'slide-up',
    closeIcon: true
}

export default Poup