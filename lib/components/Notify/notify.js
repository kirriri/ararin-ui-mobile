import React from 'react';
import Notification from 'rc-notification';
import classnames from 'classnames';
import { NotifyCmp } from './NotifyCmp';
export var iconType = {
    'info': '',
    'loading': 'loading',
    'failed': 'failed',
    'success': 'success'
};
var Notify = /** @class */ (function () {
    function Notify() {
        this.notificationInstance = null;
        this.timer = null;
        this.contentRef = React.createRef();
    }
    Notify.getInstance = function () {
        if (!this.instance) {
            this.instance = new Notify();
        }
        return this.instance;
    };
    Notify.prototype.notice = function (props) {
        var _a;
        var content = props.content, duration = props.duration, type = props.type, onClose = props.onClose, mask = props.mask, className = props.className;
        var classes = classnames(className, (_a = {},
            _a["ararin-notify-mask"] = type,
            _a["ararin-notify-no-mask"] = mask,
            _a));
        this.renderNotification({ classes: classes, onClose: onClose, prefixCls: 'ararin-notify', type: type, content: content, duration: duration });
    };
    Notify.prototype.renderNotification = function (_a) {
        var _this = this;
        var classes = _a.classes, onClose = _a.onClose, prefixCls = _a.prefixCls, type = _a.type, content = _a.content, duration = _a.duration;
        Notify.needClose = false;
        Notification.newInstance({
            prefixCls: prefixCls,
            className: classes,
            transitionName: 'an-fade'
        }, function (notification) {
            if (!notification)
                return;
            if (_this.notificationInstance) {
                _this.notificationInstance.destroy();
                _this.notificationInstance = null;
            }
            if (Notify.needClose) {
                _this.notificationInstance.destroy();
                _this.notificationInstance = null;
                return;
            }
            _this.notificationInstance = notification;
            notification.notice({
                duration: duration,
                style: {},
                content: React.createElement(NotifyCmp, { ref: _this.contentRef, prefixCls: prefixCls, type: type, content: content }),
                closable: true,
                onClose: function () {
                    if (onClose) {
                        onClose();
                    }
                    notification.destroy();
                    this.notificationInstance = null;
                    notification = null;
                },
            });
        });
    };
    Notify.needClose = false;
    Notify.info = function (content, duration, onClose, mask, className) {
        var stance = Notify.getInstance();
        stance.notice({ content: content, duration: duration, type: 'info', onClose: onClose, mask: mask, className: className });
        stance.type = 'info';
    };
    Notify.loading = function (content, duration, onClose, mask, className) {
        var stance = Notify.getInstance();
        stance.notice({ content: content, duration: duration, type: 'loading', onClose: onClose, mask: mask, className: className });
        stance.type = 'loading';
    };
    Notify.success = function (content, duration, onClose, mask, className) {
        var stance = Notify.getInstance();
        stance.notice({ content: content, duration: duration, type: 'success', onClose: onClose, mask: mask, className: className });
        stance.type = 'success';
    };
    Notify.failed = function (content, duration, onClose, mask, className) {
        var stance = Notify.getInstance();
        stance.notice({ content: content, duration: duration, type: 'failed', onClose: onClose, mask: mask, className: className });
        stance.type = 'failed';
    };
    Notify.animateSuccess = function (content, duration, onClose, mask, className) {
        var stance = Notify.getInstance();
        if (stance.notificationInstance && stance.type == 'loading') {
            stance.contentRef.current.setCurrentData('success', content);
            stance.timer = setTimeout(function () {
                onClose && onClose();
                stance.notificationInstance.destroy();
            }, !!duration ? duration * 1000 : 3 * 1000);
        }
        else {
            stance.notice({ content: content, duration: duration, type: 'success', onClose: onClose, mask: mask, className: className });
        }
        stance.type = 'success';
    };
    Notify.animateFailed = function (content, duration, onClose, mask, className) {
        var stance = Notify.getInstance();
        if (stance.notificationInstance && stance.type == 'loading') {
            stance.contentRef.current.setCurrentData('failed', content);
            stance.timer = setTimeout(function () {
                stance.notificationInstance.destroy();
                onClose && onClose();
            }, !!duration ? duration * 1000 : 3 * 1000);
        }
        else {
            stance.notice({ content: content, duration: duration, type: 'failed', onClose: onClose, mask: mask, className: className });
        }
        stance.type = 'failed';
    };
    Notify.hide = function () {
        var stance = Notify.getInstance();
        if (stance.notificationInstance) {
            stance.notificationInstance.destroy();
            stance.notificationInstance = null;
        }
        else {
            Notify.needClose = true;
        }
    };
    return Notify;
}());
export { Notify };
export default Notify;
