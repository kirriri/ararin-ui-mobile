import React from 'react'
import Notification  from 'rc-notification'
import classnames from 'classnames';

export interface NoticeProps {
    content?: React.ReactNode,
    duration?: number,
    type: string,
    onClose?: () => void,
    mask?: boolean,
    className?: string
}

let instance: any
let needClose: boolean

const iconType: { [propsNames: string]: string } = {
    'info': '',
    'loading': 'loading',
    'failed': 'failed',
    'success': 'success'
}

export class Notify {
    
    public static Info = (
        content: React.ReactNode,
        duration?: number,
        onClose?: () => void,
        mask?: boolean,
        className?: string
    ) => {
        return Notify.notice({content, duration, type: 'info', onClose, mask, className})
    }

    constructor(props) {
        console.log(props)
    }

    private static renderInstance = () => {

    }

    public static Failed = (props: NoticeProps) => {
        
    }

    private static notice(props: NoticeProps) {
        const {
            content,
            duration,
            type,
            onClose,
            mask,
            className
        } = props

        const classes = classnames('ararin-notify', className, {
            [`ararin-notify-mask`]: type,
            [`ararin-notify-no-mask`]: mask
        })
        
        // Notify.renderInstance({
            
        // })
    }

}
