import React from 'react'
import TouchFeedback from 'rmc-feedback';
import Dialog from 'rmc-dialog';
import classnames from 'classnames'
import Icon from '../Icon'

export interface DialogBaseProps {
    wrapClassName?: string,
    animation?: string,
    prefixCls?: string,
    className?: string,
    visible?: boolean,
    title?: React.ReactNode | string,
    maskAnimation?: string
    maskClosable?: boolean,
    onClose?: (e: any) => void
}

export const TDialog: React.FC<DialogBaseProps> = props => {

    const {
        maskClosable,
        prefixCls,
        className,
        maskAnimation,
        children,
        onClose,
        animation,
        ...restProps
    } = props

    return (
        <Dialog
            // closable={false}
            onClose={onClose}
            wrapClassName="test"
            maskClosable={maskClosable}
            animation={animation}
            maskAnimation="fade"
            className={className}
            prefixCls={prefixCls}
            {...restProps}
        >
            {/* <span className="ad-dialog-close"><Icon type="close"/></span> */}
            {children}
        </Dialog>
    )
}

TDialog.defaultProps = {
    prefixCls: 'ad',
    maskAnimation: 'fade',
    maskClosable: false,
    animation: 'zone'
    
}

export default TDialog