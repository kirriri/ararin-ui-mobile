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
import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
export var PrizeSudoku = function (props) {
    var _a;
    var animateTimer = useRef(null);
    // 当前转盘状态
    var _b = useState({
        awardIndex: -1,
        wheeling: false,
        index: -1
    }), state = _b[0], setState = _b[1];
    var sudoku = useRef({
        awardIndex: -1,
        index: -1,
        prize: -1,
        count: 8,
        speed: 0,
        times: 0,
        cycle: 50,
    });
    // 渲染data
    var _c = useState(new Array(9).fill({})), renderData = _c[0], setRenderData = _c[1];
    // 奖品keyMap
    var keyMap = useRef({
        0: '0',
        1: '1',
        2: '2',
        3: '7',
        5: '3',
        6: '6',
        7: '5',
        8: '4'
    });
    var size = props.size, className = props.className, successFun = props.successFun, failedFun = props.failedFun, data = props.data, onClick = props.onClick, restProps = __rest(props
    // 设置renderData
    , ["size", "className", "successFun", "failedFun", "data", "onClick"]);
    // 设置renderData
    useEffect(function () {
        if (data && data.length == 9) {
            setState(function (props) { return (__assign(__assign({}, props), { awardIndex: -1, wheeling: false })); });
            setRenderData(function () {
                return data.map(function (item, index) {
                    return {
                        title: item.title,
                        img: typeof item.img === 'string'
                            ? React.createElement("img", { src: item.img, alt: "" })
                            : React.cloneElement(item.img, {
                                className: "prize-" + keyMap.current[index],
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
    var handleLotteryClick = function (e) {
        e.persist();
        if (data.length === 9 && onClick && !state.wheeling) {
            setState(function (props) { return (__assign(__assign({}, props), { wheeling: true })); });
            onClick().then(function (award) {
                if (award.flag) {
                    setState(function (props) { return (__assign(__assign({}, props), { awardIndex: award.index > 4 ? award.index - 1 : award.index, speed: 100 })); });
                }
                else {
                    setState(function (props) { return (__assign(__assign({}, props), { awardIndex: -1, wheeling: false })); });
                    failedFun && failedFun();
                }
            }, function (err) {
                console.log(err);
                setState(function (props) { return (__assign(__assign({}, props), { wheeling: false })); });
            });
        }
    };
    useEffect(function () {
        if (state.awardIndex != -1 && state.wheeling === true) {
            sudoku.current.speed = 100;
            roll();
        }
    }, [state.awardIndex]);
    var roll = function () {
        sudoku.current.times = sudoku.current.times + 1;
        sudoku.current.index += 1;
        if (sudoku.current.index > sudoku.current.count - 1) {
            sudoku.current.index = 0;
        }
        setState(function (props) { return (__assign(__assign({}, props), { index: sudoku.current.index })); });
        if (sudoku.current.times > sudoku.current.cycle + 10 && sudoku.current.prize === state.awardIndex) {
            clearTimeout(animateTimer.current);
            sudoku.current.prize = -1;
            sudoku.current.times = 0;
            setState(function (props) { return (__assign(__assign({}, props), { wheeling: false })); });
        }
        else {
            if (sudoku.current.times < sudoku.current.cycle) {
                sudoku.current.speed -= 10;
            }
            else if (sudoku.current.times == sudoku.current.cycle) {
                sudoku.current.prize = state.awardIndex;
            }
            else {
                if (sudoku.current.times > sudoku.current.cycle + 10 && ((sudoku.current.prize == 0 && sudoku.current.index == 7) || sudoku.current.prize == sudoku.current.index + 1)) {
                    sudoku.current.speed = sudoku.current.speed + 110;
                }
                else {
                    sudoku.current.speed = sudoku.current.speed + 20;
                }
            }
            if (sudoku.current.speed < 40) {
                sudoku.current.speed = 40;
            }
            animateTimer.current = setTimeout(roll, sudoku.current.speed);
        }
    };
    console.log(state, sudoku.current);
    return React.createElement("div", __assign({}, restProps, { className: classes + " ararin-prizeSudoku-wrapper" }),
        React.createElement("div", { className: "ararin-prizeSudoku-box" },
            React.createElement("div", { className: "ararin-prizeSudoku-zone" },
                React.createElement("ul", { className: "ararin_clear_fix" }, renderData.map(function (item, index) {
                    return index != 4
                        ? React.createElement("li", { className: "arain-prizeSudoku-prize " + index + " prize-" + keyMap.current[index] + " " + (state.index == keyMap.current[index] ? 'active' : ''), key: "arain-prizeSudoku-prize arain-prizeSudoku-prize" + index },
                            React.createElement("span", null, item.img),
                            React.createElement("p", null, item.title))
                        : React.createElement("li", { onClick: handleLotteryClick, className: "arain-prizeSudoku-prize", key: "arain-prizeSudoku-prize arain-prizeSudoku-prize" + index },
                            React.createElement("span", null),
                            React.createElement("p", null, item.title),
                            React.createElement("div", { className: "draw-btn" },
                                item.img,
                                React.createElement("div", { className: "draw-btn-txt" }, item.title)));
                })))),
        React.createElement("div", null));
};
PrizeSudoku.defaultProps = {};
export default PrizeSudoku;
