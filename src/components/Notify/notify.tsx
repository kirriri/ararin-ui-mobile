import React from 'react'
import Notification  from 'rc-notification'
import classnames from 'classnames';
import Icon, { IconType } from '../Icon';
import { NotifyCmp, NotifyCmpProps } from './NotifyCmp'

export interface NoticeProps {
    content?: React.ReactNode,
    duration?: number,
    type: string,
    onClose?: () => void,
    mask?: boolean,
    className?: string,
}

export const iconType: { [propsNames: string]: string } = {
    'info': '',
    'loading': 'loading',
    'failed': 'failed',
    'success': 'success'
}

type NotifyType = 'loading' | 'success' | 'info' | 'failed'

export class Notify {

    private static instance: Notify
    private constructor() {}
    private notificationInstance: any = null
    private type: NotifyType
    private timer = null
    public static needClose: boolean = false
    private contentRef = React.createRef<any>()

    static getInstance() {
        if(!this.instance) {
            this.instance = new Notify()
        }
        return this.instance
    }
    
    public static info = (
        content: React.ReactNode,
        duration?: number,
        onClose?: () => void,
        mask?: boolean,
        className?: string
    ) => {
        const stance = Notify.getInstance()

        stance.notice({ content, duration, type: 'info', onClose, mask, className })
        stance.type = 'info'
    }

    public static loading = (
        content: React.ReactNode,
        duration?: number,
        onClose?: () => void,
        mask?: boolean,
        className?: string
    ) => {
        const stance = Notify.getInstance()
        
        stance.notice({ content, duration, type: 'loading', onClose, mask, className })
        stance.type = 'loading'
    }

    public static success = (
        content: React.ReactNode,
        duration?: number,
        onClose?: () => void,
        mask?: boolean,
        className?: string
    ) => {
        const stance = Notify.getInstance()
        stance.notice({ content, duration, type: 'success', onClose, mask, className })
        stance.type = 'success'
    }

    public static failed = (
        content: React.ReactNode,
        duration?: number,
        onClose?: () => void,
        mask?: boolean,
        className?: string
    ) => {
        const stance = Notify.getInstance()
        stance.notice({ content, duration, type: 'failed', onClose, mask, className })
        stance.type = 'failed'
    }

    public static animateSuccess = (
        content: React.ReactNode,
        duration?: number,
        onClose?: () => void,
        mask?: boolean,
        className?: string
    ) => {
        const stance = Notify.getInstance()
        if(stance.notificationInstance && stance.type == 'loading') {
            stance.contentRef.current.setCurrentData('success', content)
            stance.timer = setTimeout(
                () => {
                    onClose && onClose()
                    stance.notificationInstance.destroy()
                }
            , !!duration ? duration * 1000 : 3 * 1000)
        }else {
            stance.notice({ content, duration, type: 'success', onClose, mask, className })
        }
        stance.type = 'success'
    }

    public static animateFailed = (
        content: React.ReactNode,
        duration?: number,
        onClose?: () => void,
        mask?: boolean,
        className?: string
    ) => {
        const stance = Notify.getInstance()
        if(stance.notificationInstance && stance.type == 'loading') {
            stance.contentRef.current.setCurrentData('failed', content)
            stance.timer = setTimeout(() => {
                stance.notificationInstance.destroy()
                onClose && onClose()
            }, !!duration ? duration * 1000 : 3 * 1000)
        }else {
            stance.notice({ content, duration, type: 'failed', onClose, mask, className })
        }
        stance.type = 'failed'
    }

    public static hide = () => {
        const stance = Notify.getInstance()
        if(stance.notificationInstance) {
            stance.notificationInstance.destroy()
            stance.notificationInstance = null
        }else {
            Notify.needClose = true
        }
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
        Notify.needClose = false

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

            if(Notify.needClose) {
                this.notificationInstance.destroy()
                this.notificationInstance = null
                return
            }

            this.notificationInstance = notification
            
            notification.notice({
                duration,
                style: {},
                content:  <NotifyCmp 
                            ref={this.contentRef}
                            prefixCls={prefixCls}
                            type={type}
                            content={content}
                          />,
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

export default Notify