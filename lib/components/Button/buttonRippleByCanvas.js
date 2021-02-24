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
import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { requestAnimationFrame, canCelRequestAnimFrame } from '../../util/animateJs';
import TouchFeedback from 'rmc-feedback';
import Icon from '../Icon';
import { refreshRate } from '../../util/refreshRate';
export var Button = function (props) {
    var _a;
    var icon = props.icon, iconState = props.iconState, className = props.className, state = props.state, children = props.children, type = props.type, size = props.size, ripple = props.ripple, onClick = props.onClick, href = props.href, activeStyle = props.activeStyle, activeClassName = props.activeClassName, style = props.style, restProps = __rest(props, ["icon", "iconState", "className", "state", "children", "type", "size", "ripple", "onClick", "href", "activeStyle", "activeClassName", "style"]);
    var disabled = props.disabled;
    //开启水波纹动画
    var rippleComponent = useRef(null);
    var animateId = useRef();
    var rippleData = useRef({
        centerX: 0,
        centerY: 0,
        radius: 0,
        radiusSpeed: 10,
        opacitySpeed: 0.015,
        opacity: 0,
        defaultRadiusSpeed: 10,
        defaultOpacity: '0.25',
        bgColor: type === 'default' ? '#999' : '#ffffff'
    });
    //处理图标
    var iconEle;
    if (state === 'loading') {
        disabled = true;
        iconEle = React.createElement(Icon, { iconState: "spin", type: "loading" });
    }
    else if (state === 'disabled') {
        disabled = true;
    }
    else if (state === 'failed') {
        disabled = true;
        iconEle = React.createElement(Icon, { type: "failed" });
    }
    else if (typeof icon === 'string') {
        iconEle = React.createElement(Icon, { iconState: iconState, type: icon });
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
        _a));
    //检查屏幕帧率
    useEffect(function () {
        if (ripple) {
            refreshRate(function (hz) { fixSpeed(hz); }, 30);
        }
        return function () {
        };
    }, []);
    //修复水波纹扩散速度
    var fixSpeed = function (hz) {
        if (hz > 300) {
            refreshRate(function (hz) { fixSpeed(hz); }, 30);
            return;
        }
        else if (hz < 60) {
            hz = 60;
        }
        var _a = rippleData.current, radiusSpeed = _a.radiusSpeed, opacitySpeed = _a.opacitySpeed;
        rippleData.current.radiusSpeed = radiusSpeed * (60 / hz);
        rippleData.current.defaultRadiusSpeed = radiusSpeed * (60 / hz);
        rippleData.current.opacitySpeed = opacitySpeed * (60 / hz);
    };
    //水波纹点击，转发点击事件，开始水波纹计算
    var handleRippleClick = function (e) {
        e.persist();
        if (onClick && !disabled) {
            onClick(e);
        }
        if (rippleComponent.current) {
            var canvas = rippleComponent.current;
            var context = canvas.getContext('2d');
            rippleData.current.centerX = e.nativeEvent.offsetX;
            rippleData.current.centerY = e.nativeEvent.offsetY;
            if (context) {
                resetAnime();
                context.clearRect(0, 0, rippleComponent.current.width, rippleComponent.current.height);
                rippleDrawRadius(context);
            }
        }
    };
    //重置开始
    var resetAnime = function () {
        var canvas = rippleComponent.current;
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            rippleData.current.radiusSpeed = rippleData.current.defaultRadiusSpeed * Math.max(canvas.width / 375, 1);
        }
        rippleData.current.radius = 0;
        rippleData.current.opacity = 0.25;
        if (rippleComponent.current) {
            rippleComponent.current.style.opacity = rippleData.current.defaultOpacity;
        }
    };
    //圆扩散动画
    var rippleDrawRadius = function (context) {
        var _a = rippleData.current, centerX = _a.centerX, centerY = _a.centerY, radius = _a.radius, bgColor = _a.bgColor, opacity = _a.opacity, radiusSpeed = _a.radiusSpeed;
        if (animateId.current) {
            canCelRequestAnimFrame(animateId.current);
        }
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = bgColor;
        context.fill();
        rippleData.current.radius = radius += rippleData.current.radiusSpeed;
        if (rippleComponent.current && radius < rippleComponent.current.width) {
            animateId.current = requestAnimationFrame(function () { return rippleDrawRadius(context); });
        }
        else if (rippleComponent.current && opacity > 0.001) {
            animateId.current = requestAnimationFrame(function () { return rippleDrawOpacity(); });
        }
    };
    //透明度扩散
    var rippleDrawOpacity = function () {
        var _a = rippleData.current, opacity = _a.opacity, opacitySpeed = _a.opacitySpeed;
        if (rippleComponent.current) {
            rippleComponent.current.style.opacity = opacity + '';
            if (rippleComponent.current && rippleData.current.opacity > 0) {
                rippleData.current.opacity = Math.max((opacity -= opacitySpeed), 0);
                animateId.current = requestAnimationFrame(function () { return rippleDrawOpacity(); });
            }
        }
    };
    return React.createElement(React.Fragment, null,
        React.createElement(TouchFeedback, { activeClassName: activeClassName || (ripple ? undefined : "ararin-button-" + type + "-active"), disabled: disabled, activeStyle: activeStyle },
            React.createElement("a", __assign({ style: style, href: disabled ? undefined : href, className: classes }, restProps, { onClick: disabled ? undefined : (ripple ? handleRippleClick : onClick) }),
                ripple && React.createElement("canvas", { style: { opacity: rippleData.current.opacity }, className: "ararin-btn-ripple", ref: rippleComponent }),
                React.createElement("div", { className: "ararin-button-box" },
                    iconEle,
                    children))));
};
Button.defaultProps = {
    size: "md",
    disabled: false,
    type: 'default',
    iconState: 'static'
};
export default Button;
