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
import classNames from 'classnames';
import { IconRes } from './IconRes';
export var Icon = function (props) {
    var _a;
    var type = props.type, style = props.style, className = props.className, state = props.state, children = props.children, onClick = props.onClick, restProps = __rest(props, ["type", "style", "className", "state", "children", "onClick"]);
    var classes = classNames('ararin-icon', className, (_a = {},
        _a["ararin-icon-" + type] = type && IconRes[type],
        _a['ararin-icon-spin'] = state,
        _a));
    var svgSprite = function (contents) { return "\n        <svg\n            xmlns=\"http://www.w3.org/2000/svg\"\n            xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n            id=\"__ararin_MOBILE_SVG_ICON\"\n            style=\"display:none;overflow:hidden;width:0;height:0\"\n        >\n            <defs>\n                " + contents + "\n            </defs>\n        </svg>\n    "; };
    var renderChildren = function () {
        if (type && IconRes[type]) {
            if (!document) {
                return;
            }
            var existing = document.getElementById('__ararin_MOBILE_SVG_ICON');
            var mountNode = document.body;
            var symbols = Object.keys(IconRes).map(function (iconName) {
                var svgContent = IconRes[iconName].split('svg')[1];
                return "<symbol id=" + iconName + svgContent + "symbol>";
            }).join('');
            if (!existing) {
                mountNode.insertAdjacentHTML('afterbegin', svgSprite(symbols));
            }
            return React.createElement("svg", null,
                React.createElement("use", { xlinkHref: "#" + type }));
        }
        else if (children) {
            React.Children.only(children);
            var Icon_1 = children;
            if (typeof Icon_1.type === 'string') {
                if (Icon_1.type === 'svg' || Icon_1.type === 'img') {
                    return Icon_1;
                }
                console.error('Icon component only expected to receive a svg or imgage HTMLElement');
            }
            console.error('Icon component only expected to receive a React component');
        }
        return '';
    };
    return React.createElement("span", __assign({ style: style, className: classes, onClick: onClick }, restProps), renderChildren());
};
export default Icon;
