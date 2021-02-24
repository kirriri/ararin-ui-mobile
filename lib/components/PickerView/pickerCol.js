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
import React, { useState, useEffect } from 'react';
import { setCssStyle } from '../../util/util';
export var BasePickerColumn = function (props) {
    var index = props.index, selectIndex = props.selectIndex, prefixCls = props.prefixCls, colData = props.colData, colHeight = props.colHeight, itemHeight = props.itemHeight, onSelected = props.onSelected;
    var computeTranslate = function (props) {
        var colHeight = props.colHeight, selectIndex = props.selectIndex, itemHeight = props.itemHeight, colData = props.colData;
        return {
            scrollerTranslate: colHeight / 2 - itemHeight / 2 - selectIndex * itemHeight,
            minTranslate: colHeight / 2 - itemHeight * colData.length + itemHeight / 2,
            maxTranslate: colHeight / 2 - itemHeight / 2
        };
    };
    useEffect(function () {
        setState(function (prev) {
            var _a = JSON.parse(JSON.stringify(props)), colHeight = _a.colHeight, selectIndex = _a.selectIndex, itemHeight = _a.itemHeight, colData = _a.colData;
            return {
                init: true,
                isMoving: false,
                startTouchY: 0,
                startScrollerTranslate: 0,
                scrollerTranslate: colHeight / 2 - itemHeight / 2 - selectIndex * itemHeight,
                minTranslate: colHeight / 2 - itemHeight * colData.length + itemHeight / 2,
                maxTranslate: colHeight / 2 - itemHeight / 2
            };
        });
        return function () { };
    }, [colData]);
    useEffect(function () {
        if (state.isMoving) {
            return;
        }
        setState(function (prev) {
            return __assign(__assign({}, prev), computeTranslate(props));
        });
    }, [selectIndex]);
    var _a = useState(__assign({ init: true, isMoving: false, startTouchY: 0, startScrollerTranslate: 0 }, computeTranslate(props))), state = _a[0], setState = _a[1];
    var handleTouchStart = function (e) {
        if (state.init) {
            setState(function (prev) { return (__assign(__assign({}, prev), { init: false })); });
        }
        var startTouchY = e.targetTouches[0].pageY;
        setState(function (prevState) {
            var data = JSON.parse(JSON.stringify(prevState));
            return __assign(__assign({}, prevState), { startTouchY: startTouchY, startScrollerTranslate: data.scrollerTranslate });
        });
    };
    var handleTouchMove = function (e) {
        e.preventDefault();
        var touchY = e.targetTouches[0].pageY;
        setState(function (prev) {
            var isMoving = prev.isMoving, startTouchY = prev.startTouchY, startScrollerTranslate = prev.startScrollerTranslate, minTranslate = prev.minTranslate, maxTranslate = prev.maxTranslate;
            if (!isMoving) {
                return __assign(__assign({}, prev), { isMoving: true });
            }
            var nextScrollTranslate = startScrollerTranslate + touchY - startTouchY;
            if (nextScrollTranslate < minTranslate) {
                nextScrollTranslate = minTranslate - Math.pow(minTranslate - nextScrollTranslate, 0.8);
            }
            else if (nextScrollTranslate > maxTranslate) {
                nextScrollTranslate = maxTranslate + Math.pow(nextScrollTranslate - maxTranslate, 0.8);
            }
            return __assign(__assign({}, prev), { scrollerTranslate: nextScrollTranslate });
        });
    };
    var handleTouchEnd = function (e) {
        if (!state.isMoving) {
            return;
        }
        setState(function (prev) {
            return __assign(__assign({}, prev), { isMoving: false, startTouchY: 0, startScrollerTranslate: 0 });
        });
        setTimeout(function () {
            var scrollerTranslate = state.scrollerTranslate, minTranslate = state.minTranslate, maxTranslate = state.maxTranslate;
            var activeIndex;
            if (scrollerTranslate > maxTranslate) {
                activeIndex = 0;
            }
            else if (scrollerTranslate < minTranslate) {
                activeIndex = colData.length - 1;
            }
            else {
                activeIndex = -Math.floor((scrollerTranslate - maxTranslate) / itemHeight);
            }
            //   console.log(index, activeIndex)
            onSelected && onSelected(index, activeIndex);
            if (activeIndex === selectIndex) {
                setState(function (prev) {
                    return __assign(__assign({}, prev), computeTranslate(props));
                });
            }
        }, 0);
    };
    var handleTouchCancel = function (event) {
        if (!state.isMoving) {
            return;
        }
        setState(function (prev) { return (__assign(__assign({}, prev), { isMoving: false, startTouchY: 0, startScrollerTranslate: 0, scrollerTranslate: prev.startScrollerTranslate })); });
    };
    var translateString = "translate3d(0, " + state.scrollerTranslate + "px, 0)";
    var style = {
        transitionDuration: ''
    };
    setCssStyle(style, 'transform', translateString, true);
    if (state.isMoving || state.init) {
        style.transitionDuration = '0ms';
    }
    return (React.createElement("ul", { onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, onTouchCancel: handleTouchCancel, className: prefixCls + "-data-item", style: style }, colData.map(function (sitem, sindex) {
        return React.createElement("li", { className: "wheel-item", key: sindex, style: {
                lineHeight: itemHeight + 'px',
                height: itemHeight + 'px'
            } }, sitem.text);
    })));
};
export default BasePickerColumn;
