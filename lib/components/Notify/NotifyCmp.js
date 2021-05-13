import React, { useImperativeHandle, useEffect } from 'react';
import Icon from '../Icon';
import { iconType } from './notify';
export var NotifyCmp = React.forwardRef(function (props, ref) {
    var prefixCls = props.prefixCls, type = props.type, content = props.content;
    var _a = React.useState('static'), state = _a[0], setState = _a[1];
    var _b = React.useState(''), renderCon = _b[0], setRenderCon = _b[1];
    useEffect(function () {
        setRenderCon(function () { return content; });
    }, [content]);
    useImperativeHandle(ref, function () {
        return {
            setCurrentData: setCurrentData,
            setCurrentState: setCurrentState,
            setCurrentContent: setCurrentContent
        };
    });
    var setCurrentData = function (state, con) {
        setCurrentState(state);
        setCurrentContent(con);
    };
    var setCurrentState = function (v) { return setState(function () { return v; }); };
    var setCurrentContent = function (v) { return setRenderCon(function () { return v; }); };
    return React.createElement("div", { className: prefixCls + "-text " + (iconType[type] ? prefixCls + "-with-icon" : '') },
        iconType[type] && React.createElement("div", { className: prefixCls + "-text-icon" },
            React.createElement(Icon, { type: iconType[type], state: state })),
        React.createElement("div", null, renderCon));
});
