import React from 'react'
import Notification  from 'rc-notification'
import classnames from 'classnames';
import Icon from '../Icon';

export interface NoticeProps {
    content?: React.ReactNode,
    duration?: number,
    type: string,
    onClose?: () => void,
    mask?: boolean,
    className?: string,
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

    private static instance: Notify
    private constructor() {}
    private notificationInstance: any = null
    private needClose: boolean = false

    static getInstance() {
        if(!this.instance) {
            this.instance = new Notify()
        }
        return this.instance
    }
    
    public static Info = (
        content: React.ReactNode,
        duration?: number,
        onClose?: () => void,
        mask?: boolean,
        className?: string
    ) => {
        Notify.getInstance()
            .notice({ content, duration, type: 'info', onClose, mask, className })
    }
    

    private notice(props: NoticeProps) {
        const {
            content,
            duration,
            type,
            onClose,
            mask,
            className,
        } = props

        const classes = classnames(className, {
            [`ararin-notify-mask`]: type,
            [`ararin-notify-no-mask`]: mask
        })

        this.renderNotification({ classes, onClose, prefixCls: 'ararin-notify', type, content, duration }) 
    }

    private renderNotification({ classes, onClose, prefixCls, type, content, duration }) {
        this.needClose = false

        Notification.newInstance({
            prefixCls,
            className: classes,
            transitionName: 'an-fade'
        }, notification => {
            
            if(!notification) return

            if(this.notificationInstance) {
                this.notificationInstance.destroy()
                this.notificationInstance = null
            }

            if(this.needClose) {
                this.notificationInstance.destroy()
                this.notificationInstance = null
                return
            }

            this.notificationInstance = notification

            notification.notice({
                duration,
                style: {},
                content:  <div className={`${prefixCls}-text`}>
                                { !!iconType[type] && <div className={`${prefixCls}-text-icon`}>
                                            <Icon type={iconType[type]} />
                                          </div> }
                                <div>{content}</div>
                          </div>,
                closable: true,
                onClose() {
                    if (onClose) {
                      onClose();
                    }
                    notification.destroy();
                    this.notificationInstance = null;
                    notification = null;
                  },
            });
        })
    }
}
