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
    // onClose?:
}

export const TDialog: React.FC<DialogBaseProps> = props => {

    const {
        prefixCls,
        className,
        maskAnimation,
        ...restProps
    } = props

    return (
        <Dialog
            animation="zoom"
            maskAnimation="fade"
            className={className}
            prefixCls={prefixCls}
            {...restProps}
        >

        </Dialog>
    )
}

TDialog.defaultProps = {
    prefixCls: 'ararin-dialog',
    maskAnimation: 'fade'
}

export default TDialog