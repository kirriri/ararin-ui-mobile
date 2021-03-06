import React, { useEffect } from 'react'
import TouchFeedback from 'rmc-feedback';
import BaseDialog from 'rmc-dialog';
import classnames from 'classnames'
import Icon from '../Icon'

export interface FooterBaseProps {
    text?: string,
    style?: React.CSSProperties,
    activeStyle?: React.CSSProperties,
    higlight?: boolean,
    onPress?: (e: React.MouseEvent) => void,
    className?: string
}

type DialogAnimation = 'bounce' | 'scale' | 'fall'

export interface DialogBaseProps {
    afterClose?: () => void,
    activeClassName?: string,
    wrapClassName?: string,
    animation?: DialogAnimation,
    prefixCls?: string,
    className?: string,
    visible?: boolean,
    style?: React.CSSProperties,
    closeIcon?: boolean,
    title?: React.ReactNode,
    maskAnimation?: string
    maskClosable?: boolean,
    footer?: FooterBaseProps[],
    onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void
}

export const Dialog: React.FC<DialogBaseProps> = props => {

    const {
        maskClosable,
        prefixCls,
        className,
        maskAnimation,
        activeClassName,
        onClose,
        animation,
        closeIcon,
        style,
        children,
        footer,
        visible,
        ...restProps
    } = props

    const onHandleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault()
        if(onClose) {
            onClose(e)
        }
    }

    const footerWrap = footer && footer.length ?
            <div className={`${prefixCls}-footer-btn-group`}>
                {footer.map((item, index) => {
                        const classes = classnames(
                            {
                                [`${prefixCls}-footer-item`]: true,
                                [`${prefixCls}-footer-item-highlight`]: item.higlight
                            },
                            item.className
                        )
                        const activeClasses = classnames(
                            {
                                [`${prefixCls}-footer-item-active-highlight`]: item.higlight,
                                [`${prefixCls}-footer-item-active`]: !item.higlight && !activeClassName,
                                [`${activeClassName}`]: !item.higlight && activeClassName
                            }
                        )
                        return  <TouchFeedback
                                    activeClassName={activeClassName || activeClasses}
                                    key={`ad-f-${index}`}
                                    activeStyle={!item.higlight ? item.activeStyle : ''}
                                >
                                    <div 
                                        style={!item.higlight ? item.style : {}}
                                        className={classes}
                                        onClick={item.onPress}
                                    >
                                        {item.text}
                                    </div>
                                </TouchFeedback>
                    }
                )}
            </div> : ''
    
    const classes = classnames({
        [`${className}`]: className
    })
    
    return (
        <BaseDialog
            visible={visible}
            closable={false}
            onClose={onClose} 
            maskClosable={maskClosable}
            animation={animation}
            maskAnimation="fade"
            className={classes}
            prefixCls={prefixCls}
            footer={footerWrap}
            {...restProps}
        >
            {closeIcon && <span className={`${prefixCls}-close`}><Icon onClick={onHandleClose} type="close"/></span>}
            {children}
        </BaseDialog>
    )
}

Dialog.defaultProps = {
    prefixCls: 'aad',
    maskAnimation: 'fade',
    maskClosable: false,
    animation: 'bounce',
    closeIcon: true
}

export default Dialog