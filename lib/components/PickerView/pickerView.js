import React, { useRef, useEffect, useState, } from 'react';
import PickerCol from './pickerCol';
export var PickerView = function (props) {
    var data = props.data, linkage = props.linkage, dataOnChange = props.dataOnChange, className = props.className, prefixCls = props.prefixCls;
    var _a = useState(0), top = _a[0], setTop = _a[1];
    var _b = useState({
        colDatas: [],
        selectedIndex: []
    }), renderData = _b[0], setRenderData = _b[1];
    var PickerBaseData = useRef({
        HEIGHT: 252,
        BASE_ITEM_HEIGHT: 36,
        CONTENT_CHID: 3,
        ITEM_MIN_NUM: 5,
        ITEM_MAX_NUM: 7 // 一列最大个数
    });
    var dataProps = useRef({
        currentLength: 0,
        currentDepth: 0,
    });
    useEffect(function () {
        var _a = PickerBaseData.current, ITEM_MIN_NUM = _a.ITEM_MIN_NUM, ITEM_MAX_NUM = _a.ITEM_MAX_NUM, BASE_ITEM_HEIGHT = _a.BASE_ITEM_HEIGHT;
        var tmpDataProps = findDepthAndLength(data);
        var baseDataArr = new Array(tmpDataProps.currentDepth).fill(new Array(0));
        var baseSelectArr = new Array(tmpDataProps.currentDepth).fill(-1);
        if (tmpDataProps.currentDepth) {
            baseDataArr[0] = data;
            baseSelectArr[0] = 0;
        }
        var tmpData = getCalRenderData(baseDataArr, baseSelectArr, 0, 0);
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
    }, [data]);
    // 查询数据深度
    var findDepthAndLength = function (data) {
        var currentDepth = 0;
        var currentLength = data.length;
        var depthAndLengthCount = function (item, depth, length) {
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
                depthAndLengthCount(sitem, depth, length);
            });
        };
        data.forEach(function (item) {
            if (!item.children) {
                return;
            }
            depthAndLengthCount(item, 0, 0);
        });
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
        var nextData = getCalRenderData(renderData.colDatas, renderData.selectedIndex, colIndex, index);
        setRenderData(function (prev) {
            dataOnChange(renderData);
            return {
                colDatas: nextData.colDatas,
                selectedIndex: nextData.tmpRSelect
            };
        });
    };
    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: prefixCls + "-data-content", style: { height: PickerBaseData.current.HEIGHT + 'px' } },
            renderData && renderData.colDatas.map(function (item, index) {
                return React.createElement("div", { className: prefixCls + "-data-wrapper", key: index },
                    React.createElement(PickerCol, { onSelected: onSelected, selectIndex: renderData.selectedIndex[index], index: index, colHeight: PickerBaseData.current.HEIGHT, itemHeight: PickerBaseData.current.BASE_ITEM_HEIGHT, prefixCls: prefixCls, colData: item }));
            }),
            React.createElement("div", { style: { backgroundSize: "100% " + top + "px" }, className: prefixCls + "-item-mask" }),
            React.createElement("div", { style: { top: top + "px", height: PickerBaseData.current.BASE_ITEM_HEIGHT + "px" }, className: prefixCls + "-item-focus" })));
};
PickerView.defaultProps = {
    prefixCls: 'apk',
    linkage: true,
    data: [],
};
export default PickerView;
