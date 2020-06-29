import React from 'react'
import TouchFeedback from 'rmc-feedback';
import Dialog from 'rmc-dialog';
import classnames from 'classnames'
import Icon from '../Icon'
import omit from 'omit.js'

export interface FooterBaseProps {
    text?: string,
    style?: React.CSSProperties,
    onClick?: (e: React.MouseEvent) => void
}

export interface DialogBaseProps {
    afterClose?: () => void,
    wrapClassName?: string,
    animation?: string,
    prefixCls?: string,
    className?: string,
    visible?: boolean,
    closeIcon?: boolean,
    title?: React.ReactNode,
    maskAnimation?: string
    maskClosable?: boolean,
    footer?: [],
    onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void
}

export const TDialog: React.FC<DialogBaseProps> = props => {

    const {
        maskClosable,
        prefixCls,
        className,
        maskAnimation,
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

    const footerWrap = (footer) => {
        return footer.length > 0 ?
            <div className={`${prefixCls}-footer-btn-group`}>
                {footer.map((item, index) => {
                        const sitem = omit(item, ['text', 'onClick', 'style', 'className'])
                        const classes = classnames(`${prefixCls}-footer-item`, sitem.className)
                        return  <TouchFeedback
                                    activeClassName={`${prefixCls}-footer-item-active`}
                                >
                                    <div className={classes}>
                                        {sitem.text}
                                    </div>
                                </TouchFeedback>
                    }
                )}
            </div> : ''
    }
    
    return (
        <Dialog
            closable={false}
            onClose={onClose}
            wrapClassName="test"
            maskClosable={maskClosable}
            animation={animation}
            maskAnimation="fade"
            className={className}
            prefixCls={prefixCls}
            footer={footerWrap}
            {...restProps}
        >
            {closeIcon && <span className="ad-close"><Icon onClick={onHandleClose} type="close"/></span>}
            {children}
        </Dialog>
    )
}

TDialog.defaultProps = {
    prefixCls: 'ad',
    maskAnimation: 'fade',
    maskClosable: false,
    animation: 'zone',
    closeIcon: true
}

export default TDialog