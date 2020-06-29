import React from 'react'
import TouchFeedback from 'rmc-feedback';
import Dialog from 'rmc-dialog';
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

type dialogAnimation = 'bounce' | 'scale' | ''

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
    footer?: FooterBaseProps[],
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
                                [`${prefixCls}-footer-active-highlight`]: item.higlight,
                            }
                        )
                        return  <TouchFeedback
                                    activeClassName={activeClasses}
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
            
    return (
        <Dialog
            closable={false}
            onClose={onClose}
            wrapClassName=""
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
    animation: 'bounce',
    closeIcon: true
}

export default TDialog