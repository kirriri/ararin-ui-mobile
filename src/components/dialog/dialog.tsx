import React from 'react'
import TouchFeedback from 'rmc-feedback';
import Dialog from 'rmc-dialog';
import classnames from 'classnames'

export interface DialogBaseProps {
    prefixCls?: string,
    className?: string,
    visible?: boolean,
    title?: string,
    maskAnimation?: string
    maskClosable?: boolean,
    // onClose?:
}

export const TDialog: React.FC<DialogBaseProps> = props => {

    const {
        maskClosable,
        prefixCls,
        className,
        maskAnimation,
        children,
        ...restProps
    } = props

    return (
        <Dialog
            maskClosable={maskClosable}
            animation="zoom"
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
    prefixCls: 'ararin-dialog',
    maskAnimation: 'fade',
    maskClosable: false,
}

export default TDialog