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
import React, { useRef, useEffect, useState, } from 'react';
import Popup from '../Dialog/popup';
import PickerCol from '../PickerView/pickerCol';
import TouchFeedback from 'rmc-feedback';
export var Picker = function (props) {
    var data = props.data, linkage = props.linkage, className = props.className, style = props.style, title = props.title, cancelText = props.cancelText, cancelPress = props.cancelPress, okText = props.okText, okPress = props.okPress, prefixCls = props.prefixCls, history = props.history, maskClosable = props.maskClosable, restProps = __rest(props
    //picker
    , ["data", "linkage", "className", "style", "title", "cancelText", "cancelPress", "okText", "okPress", "prefixCls", "history", "maskClosable"]);
    //picker
    var _a = useState(props.visible), visible = _a[0], setVisible = _a[1];
    //pickerview
    var _b = useState(0), top = _b[0], setTop = _b[1];
    var _c = useState({
        colDatas: [],
        selectedIndex: []
    }), renderData = _c[0], setRenderData = _c[1];
    var PickerBaseData = useRef({
        HEIGHT: 252,
        BASE_ITEM_HEIGHT: 36,
        CONTENT_CHID: 3,
        ITEM_MIN_NUM: 5,
        ITEM_MAX_NUM: 7 // 一列最大个数
    });
    // 计算数据的属性
    var dataProps = useRef({
        currentLength: 0,
        currentDepth: 0,
    });
    useEffect(function () {
        setVisible(props.visible);
    }, [props.visible]);
    // 取消事件
    var handleCancelClick = function () {
        if (cancelPress) {
            cancelPress();
        }
        else {
            setVisible(function () { return false; });
        }
    };
    // 确认事件
    var handleOkClick = function () {
        var selectData = JSON.parse(JSON.stringify(renderData.colDatas))
            .map(function (item, index) { return renderData.selectedIndex[index] !== -1 ? (delete item[renderData.selectedIndex[index]].children, item[renderData.selectedIndex[index]]) : ''; })
            .filter(function (item) { return Object.prototype.toString.call(item) === '[object Object]'; });
        if (okPress) {
            okPress(selectData);
        }
        else {
            setVisible(function () { return false; });
        }
    };
    //  渲染title
    var reTit;
    if (typeof title === 'string' || !title) {
        reTit =
            React.createElement("h3", { className: prefixCls + "-header" },
                React.createElement(TouchFeedback, { activeClassName: prefixCls + "-header-item-active" },
                    React.createElement("span", { onClick: handleCancelClick, className: prefixCls + "-header-item" }, cancelText)),
                React.createElement("span", null, title),
                React.createElement(TouchFeedback, { activeClassName: prefixCls + "-header-item-active " },
                    React.createElement("span", { onClick: handleOkClick, className: prefixCls + "-header-item " + prefixCls + "-header-item-highlight" }, okText)));
    }
    else {
        reTit = title;
    }
    //数据改变后重新计算picker位置
    var resetBseData = function (linkage) {
        var _a = PickerBaseData.current, ITEM_MIN_NUM = _a.ITEM_MIN_NUM, ITEM_MAX_NUM = _a.ITEM_MAX_NUM, BASE_ITEM_HEIGHT = _a.BASE_ITEM_HEIGHT;
        var flag = data.every(function (item) { return Object.prototype.toString.call(item) === '[object Array]' && !linkage && data.length; });
        var tmpDataProps = findDepthAndLength(data, linkage);
        var baseDataArr = new Array(tmpDataProps.currentDepth).fill(new Array(0));
        var baseSelectArr = new Array(tmpDataProps.currentDepth).fill(-1);
        if (tmpDataProps.currentDepth) {
            if (flag) {
                baseDataArr = data;
                baseSelectArr.fill(0);
                console.log(1);
            }
            else {
                console.log(2, data);
                baseDataArr[0] = data;
                baseSelectArr[0] = 0;
            }
        }
        var tmpData = {
            colDatas: [],
            tmpRSelect: []
        };
        if (flag) {
            tmpData = getCalRenderData(baseDataArr, baseSelectArr, 0, 0);
        }
        else {
            tmpData.colDatas = baseDataArr;
            tmpData.tmpRSelect = baseSelectArr;
        }
        setRenderData(function () { return ({
            colDatas: tmpData.colDatas,
            selectedIndex: tmpData.tmpRSelect
        }); });
        dataProps.current = tmpDataProps;
        if (dataProps.current.currentLength < ITEM_MIN_NUM) {
            PickerBaseData.current.CONTENT_CHID = ITEM_MIN_NUM;
            PickerBaseData.current.HEIGHT = PickerBaseData.current.CONTENT_CHID * BASE_ITEM_HEIGHT;
        }
        else if (dataProps.current.currentLength > ITEM_MAX_NUM) {
            PickerBaseData.current.CONTENT_CHID = ITEM_MAX_NUM;
            PickerBaseData.current.HEIGHT = PickerBaseData.current.CONTENT_CHID * BASE_ITEM_HEIGHT;
        }
        else {
            dataProps.current.currentLength % 2 === 0 ?
                PickerBaseData.current.CONTENT_CHID = dataProps.current.currentLength - 1 :
                PickerBaseData.current.CONTENT_CHID = dataProps.current.currentLength;
            PickerBaseData.current.HEIGHT = PickerBaseData.current.CONTENT_CHID * BASE_ITEM_HEIGHT;
        }
        setTop(function (prev) { return PickerBaseData.current.HEIGHT / 2 - BASE_ITEM_HEIGHT / 2; });
    };
    useEffect(function () {
        if (linkage && !data.every(function (item) { return Object.prototype.toString.call(item) === '[object Object]'; })) {
            console.error('ararin Picker error: linkage type must need all type of Object item');
            return;
        }
        resetBseData(linkage);
    }, [data]);
    useEffect(function () {
        if (!history) {
            resetBseData(linkage);
        }
    }, [visible === true]);
    // 查询数据深度
    var findDepthAndLength = function (data, linkage) {
        var currentDepth = 0;
        var currentLength = data.length;
        if (linkage) {
            var depthAndLengthCount_1 = function (item, depth, length) {
                depth++;
                if (currentDepth <= depth) {
                    currentDepth = depth;
                }
                if (!item.children) {
                    return;
                }
                if (currentLength < item.children.length) {
                    currentLength = item.children.length;
                }
                item.children.forEach(function (sitem) {
                    depthAndLengthCount_1(sitem, depth, length);
                });
            };
            if (!data.every(function (item) { return Object.prototype.toString.call(item) === '[object Object]'; })) {
                console.error('error: data must required all type of dataProps object');
                return;
            }
            data.forEach(function (item) {
                if (!item.children) {
                    return;
                }
                depthAndLengthCount_1(item, 0, 0);
            });
        }
        else {
            currentDepth = 0;
            currentLength = 0;
            if (data.every(function (item) { return Object.prototype.toString.call(item) === '[object Object]'; })) {
                if (data.length) {
                    currentDepth = 1;
                }
                currentLength = data.length;
            }
            else if (data.every(function (item) { return Object.prototype.toString.call(item) === '[object Array]'; })) {
                currentDepth = data.length;
                data.forEach(function (item) {
                    if (item.length > currentLength) {
                        currentLength = item.length;
                    }
                });
            }
        }
        return { currentLength: currentLength, currentDepth: currentDepth };
    };
    // 计算renderData 数据
    var getCalRenderData = function (tmpRData, tmpRSelect, index, currentIndex) {
        tmpRData.forEach(function (ritem, rindex) {
            if (rindex === index) {
                if (ritem[currentIndex].children) {
                    tmpRData[rindex + 1] = ritem[currentIndex].children;
                }
                else if (tmpRData[rindex + 1]) {
                    tmpRData[rindex + 1] = [];
                }
            }
            else if (rindex > index) {
                if (ritem[0] && ritem[0].children) {
                    tmpRData[rindex + 1] = ritem[0].children;
                }
                else if (tmpRData[rindex + 1]) {
                    tmpRData[rindex + 1] = [];
                }
            }
        });
        tmpRSelect[index] = currentIndex;
        tmpRSelect.forEach(function (sitem, sindex) {
            if (sindex <= index) {
                return;
            }
            if (sindex > index && tmpRData[sindex].length) {
                tmpRSelect[sindex] = 0;
            }
            else {
                tmpRSelect[sindex] = -1;
            }
        });
        return { colDatas: tmpRData, tmpRSelect: tmpRSelect };
    };
    // 滑动列选择事件
    var onSelected = function (colIndex, index) {
        if (renderData.selectedIndex[colIndex] === index) {
            return;
        }
        if (linkage) {
            var nextData_1 = getCalRenderData(renderData.colDatas, renderData.selectedIndex, colIndex, index);
            setRenderData(function (prev) {
                return {
                    colDatas: nextData_1.colDatas,
                    selectedIndex: nextData_1.tmpRSelect
                };
            });
        }
        else {
            setRenderData(function (prev) {
                var nextSelectIndex = prev.selectedIndex;
                nextSelectIndex[colIndex] = index;
                return __assign(__assign({}, prev), { selectedIndex: nextSelectIndex });
            });
        }
    };
    return React.createElement(React.Fragment, null,
        React.createElement(Popup, __assign({}, restProps, { maskClosable: maskClosable, onClose: handleCancelClick, visible: visible, title: reTit }),
            React.createElement("div", { className: prefixCls + "-data-content", style: { height: PickerBaseData.current.HEIGHT + 'px' } },
                renderData && renderData.colDatas.map(function (item, index) {
                    return React.createElement("div", { className: prefixCls + "-data-wrapper", key: index },
                        React.createElement(PickerCol, { onSelected: onSelected, selectIndex: renderData.selectedIndex[index], index: index, colHeight: PickerBaseData.current.HEIGHT, itemHeight: PickerBaseData.current.BASE_ITEM_HEIGHT, prefixCls: prefixCls, colData: item }));
                }),
                React.createElement("div", { style: { backgroundSize: "100% " + top + "px" }, className: prefixCls + "-item-mask" }),
                React.createElement("div", { style: { top: top + "px", height: PickerBaseData.current.BASE_ITEM_HEIGHT + "px" }, className: prefixCls + "-item-focus" }))));
};
Picker.defaultProps = {
    prefixCls: 'apk',
    cancelText: '取消',
    okText: '确定',
    maskClosable: false,
    linkage: false,
    data: [],
    history: true
};
export default Picker;
