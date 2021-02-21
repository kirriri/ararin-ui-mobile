var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import TouchFeedback from 'rmc-feedback';
import BaseDialog from 'rmc-dialog';
import classnames from 'classnames';
import Icon from '../Icon';
export var Dialog = function (props) {
    var _a;
    var maskClosable = props.maskClosable, prefixCls = props.prefixCls, className = props.className, maskAnimation = props.maskAnimation, activeClassName = props.activeClassName, onClose = props.onClose, animation = props.animation, closeIcon = props.closeIcon, style = props.style, children = props.children, footer = props.footer, visible = props.visible, restProps = __rest(props, ["maskClosable", "prefixCls", "className", "maskAnimation", "activeClassName", "onClose", "animation", "closeIcon", "style", "children", "footer", "visible"]);
    var onHandleClose = function (e) {
        e.preventDefault();
        if (onClose) {
            onClose(e);
        }
    };
    var footerWrap = footer && footer.length ?
        React.createElement("div", { className: prefixCls + "-footer-btn-group" }, footer.map(function (item, index) {
            var _a, _b;
            var classes = classnames((_a = {},
                _a[prefixCls + "-footer-item"] = true,
                _a[prefixCls + "-footer-item-highlight"] = item.higlight,
                _a), item.className);
            var activeClasses = classnames((_b = {},
                _b[prefixCls + "-footer-item-active-highlight"] = item.higlight,
                _b[prefixCls + "-footer-item-active"] = !item.higlight && !activeClassName,
                _b["" + activeClassName] = !item.higlight && activeClassName,
                _b));
            return React.createElement(TouchFeedback, { activeClassName: activeClassName || activeClasses, key: "ad-f-" + index, activeStyle: !item.higlight ? item.activeStyle : '' },
                React.createElement("div", { style: !item.higlight ? item.style : {}, className: classes, onClick: item.onPress }, item.text));
        })) : '';
    var classes = classnames((_a = {},
        _a["" + className] = className,
        _a));
    return (React.createElement(BaseDialog, __assign({ visible: visible, closable: false, onClose: onClose, maskClosable: maskClosable, animation: animation, maskAnimation: "fade", className: classes, prefixCls: prefixCls, footer: footerWrap }, restProps),
        closeIcon && React.createElement("span", { className: prefixCls + "-close" },
            React.createElement(Icon, { onClick: onHandleClose, type: "close" })),
        children));
};
Dialog.defaultProps = {
    prefixCls: 'aad',
    maskAnimation: 'fade',
    maskClosable: false,
    animation: 'bounce',
    closeIcon: true
};
export default Dialog;
