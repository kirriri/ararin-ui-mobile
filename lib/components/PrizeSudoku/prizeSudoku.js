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
import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
export var PrizeSudoku = function (props) {
    var _a;
    // 渲染data
    var _b = useState(new Array(9).fill({})), renderData = _b[0], setRenderData = _b[1];
    // 奖品keyMap
    var keyMap = useRef({
        0: 0,
        1: 1,
        2: 2,
        3: 7,
        5: 3,
        6: 6,
        7: 5,
        8: 4
    });
    var size = props.size, className = props.className, successFun = props.successFun, failedFun = props.failedFun, data = props.data, restProps = __rest(props
    // 设置renderData
    , ["size", "className", "successFun", "failedFun", "data"]);
    // 设置renderData
    useEffect(function () {
        if (data && data.length) {
            setRenderData(function () {
                return data.map(function (item, index) {
                    return {
                        title: '',
                        img: typeof item.img === 'string'
                            ? React.createElement("img", { src: item.img, alt: "" })
                            : React.cloneElement(item.img, {
                                className: "prize-" + keyMap[index],
                                src: item.img.props.src
                            }),
                    };
                });
            });
        }
        return function () {
        };
    }, [data]);
    // 设置类名
    var classes = classNames('ararin-prizeSudoku', className, (_a = {},
        _a["ararin-sudoku-" + size] = size,
        _a));
    return React.createElement("div", { className: classes + " ararin-prizeSudoku-wrapper" },
        React.createElement("div", { className: "ararin-prizeSudoku-box" },
            React.createElement("div", { className: "ararin-prizeSudoku-zone" },
                React.createElement("ul", null, renderData.map(function (item, index) {
                    return React.createElement("li", null);
                })))),
        React.createElement("div", null));
};
PrizeSudoku.defaultProps = {};
