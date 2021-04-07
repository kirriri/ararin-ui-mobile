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
import React, { useRef, } from 'react';
import classNames from 'classnames';
import TouchFeedback from 'rmc-feedback';
import Icon from '../Icon';
import { setCssStyle } from '../../util/util';
var PrefixBrowser = [
    "-webkit-",
    "-moz-",
    "-ms-",
    "-o-",
    ""
];
export var Button = function (props) {
    var _a;
    var icon = props.icon, iconState = props.iconState, className = props.className, state = props.state, children = props.children, type = props.type, size = props.size, ripple = props.ripple, onClick = props.onClick, href = props.href, activeStyle = props.activeStyle, activeClassName = props.activeClassName, style = props.style, restProps = __rest(props, ["icon", "iconState", "className", "state", "children", "type", "size", "ripple", "onClick", "href", "activeStyle", "activeClassName", "style"]);
    var btn = useRef(null);
    var disabled = props.disabled;
    //处理图标
    var iconEle;
    if (state === 'loading') {
        disabled = true;
        iconEle = React.createElement(Icon, { type: "loading" });
    }
    else if (state === 'disabled') {
        disabled = true;
    }
    else if (state === 'failed') {
        disabled = true;
        iconEle = React.createElement(Icon, { type: "failed" });
    }
    else if (typeof icon === 'string') {
        iconEle = React.createElement(Icon, { state: iconState, type: icon });
    }
    else if (icon) {
        iconEle = icon;
    }
    var classes = classNames('ararin-button', className, (_a = {},
        _a["ararin-button-" + type] = type,
        _a["ararin-button-" + size] = size,
        // loading样式，临时放在这，等后期再次开发
        _a["ararin-button-" + state] = state,
        _a['disabled'] = disabled,
        _a['ararin-button-ripple'] = ripple,
        _a));
    var duration = 750;
    var Radius = 12.5;
    // 样式string拼凑
    var forStyle = function (position) {
        var cssStr = '';
        for (var key in position) {
            if (position.hasOwnProperty(key))
                cssStr += key + ':' + position[key] + ';';
        }
        ;
        return cssStr;
    };
    // 获取鼠标点击位置
    var forRect = function (target) {
        var position = {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
        }, ele = document.documentElement;
        'undefined' != typeof target.getBoundingClientRect && (position = target.getBoundingClientRect());
        return {
            top: position.top + window.pageYOffset - ele.clientTop,
            left: position.left + window.pageXOffset - ele.clientLeft
        };
    };
    var show = function (event) {
        var pDiv = event.target, cDiv = document.createElement('div');
        pDiv.appendChild(cDiv);
        var rectObj = forRect(pDiv), _height = event.pageY - rectObj.top, _left = event.pageX - rectObj.left, _scale = 'scale(' + pDiv.clientWidth / 100 * 4.5 + ')';
        var position = {
            top: _height - Radius + 'px',
            left: _left - Radius + 'px',
            width: '25px',
            height: '25px',
            transform: '',
            opacity: '0'
        };
        var finishStyle = {
            opacity: 0,
            width: '25px',
            height: '25px',
            top: _height - Radius + "px",
            left: _left - Radius + "px",
        };
        cDiv.className = cDiv.className + "ararin-button-ripple-animation";
        cDiv.setAttribute("style", forStyle(position));
        setCssStyle(position, 'transform', _scale);
        setCssStyle(position, 'opacity', 1);
        setCssStyle(position, 'transition-duration', duration + "ms");
        setCssStyle(position, 'transition-timing-function', "cubic-bezier(0.250, 0.460, 0.450, 0.940)");
        cDiv.setAttribute("style", forStyle(position));
        setCssStyle(finishStyle, 'transition-duration', duration + "ms");
        setCssStyle(finishStyle, 'transform', _scale);
        setTimeout(function () {
            cDiv.setAttribute("style", forStyle(finishStyle));
            setTimeout(function () {
                pDiv.removeChild(cDiv);
            }, duration);
        }, 250);
    };
    var handleClick = function (e) {
        ripple && show(e);
        onClick && onClick(e);
    };
    return React.createElement(React.Fragment, null,
        React.createElement(TouchFeedback, { activeClassName: activeClassName || "ararin-button-" + type + "-active", disabled: disabled, activeStyle: activeStyle },
            React.createElement("a", __assign({ ref: btn, style: style, href: disabled ? undefined : href, className: classes }, restProps, { onClick: handleClick }),
                iconEle,
                children)));
};
Button.defaultProps = {
    size: "md",
    disabled: false,
    type: 'default',
    iconState: 'static'
};
export default Button;
