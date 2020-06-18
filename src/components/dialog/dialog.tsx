import React from 'react'
import TouchFeedback from 'rmc-feedback';
import Dialog from 'rmc-dialog';
import classnames from 'classnames'
import Icon from '../Icon'

export interface DialogBaseProps {
    prefixCls?: string,
    className?: string,
    visible?: boolean,
    title?: string,
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
        ...restProps
    } = props

    return (
        <Dialog
            onClose={onClose}
            wrapClassName="test"
            maskClosable={maskClosable}
            // animation="zoom"
            maskAnimation="fade"
            className={className}
            prefixCls={prefixCls}
            {...restProps}
        >
            {children}
        </Dialog>
    )
}

TDialog.defaultProps = {
    prefixCls: 'ad',
    maskAnimation: 'fade',
    maskClosable: false,
    // animation: "ad"
}

export default TDialog