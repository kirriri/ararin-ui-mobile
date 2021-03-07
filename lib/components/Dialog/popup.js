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
import BaseDialog from 'rmc-dialog';
import classnames from 'classnames';
export var Popup = function (props) {
    var _a;
    var maskClosable = props.maskClosable, prefixCls = props.prefixCls, className = props.className, wrapClassName = props.wrapClassName, maskAnimation = props.maskAnimation, activeClassName = props.activeClassName, onClose = props.onClose, animation = props.animation, closeIcon = props.closeIcon, children = props.children, footer = props.footer, restProps = __rest(props, ["maskClosable", "prefixCls", "className", "wrapClassName", "maskAnimation", "activeClassName", "onClose", "animation", "closeIcon", "children", "footer"]);
    var onHandleClose = function (e) {
        e.preventDefault();
        if (onClose) {
            onClose(e);
        }
    };
    var classes = classnames((_a = {},
        _a["" + prefixCls] = prefixCls && !className,
        _a["" + className] = className,
        _a[prefixCls + "-" + animation] = animation,
        _a));
    return (React.createElement(BaseDialog, __assign({ closable: false, onClose: onHandleClose, wrapClassName: wrapClassName, maskClosable: maskClosable, animation: animation, maskAnimation: "fade", className: classes, prefixCls: prefixCls }, restProps), children));
};
Popup.defaultProps = {
    prefixCls: 'aap',
    maskAnimation: 'fade',
    maskClosable: false,
    animation: 'slide-up',
    closeIcon: true
};
export default Popup;
