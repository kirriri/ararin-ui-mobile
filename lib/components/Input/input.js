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
import React, { useState, useImperativeHandle, useRef, forwardRef, useEffect } from 'react';
import classNames from 'classnames';
import { JUDGE_STATE } from '../../util/state';
import Icon from '../Icon';
export var Input = forwardRef(function (props, ref) {
    var _a;
    var title = props.title, className = props.className, type = props.type, judge = props.judge, onClick = props.onClick, codeTxt = props.codeTxt, times = props.times, onBlur = props.onBlur, onFocus = props.onFocus, noHide = props.noHide, noJudge = props.noJudge, RegExp = props.RegExp, maxLength = props.maxLength, lengthMode = props.lengthMode, imgCodeSrc = props.imgCodeSrc, initValue = props.initValue, restPros = __rest(props, ["title", "className", "type", "judge", "onClick", "codeTxt", "times", "onBlur", "onFocus", "noHide", "noJudge", "RegExp", "maxLength", "lengthMode", "imgCodeSrc", "initValue"]);
    var _b = useState(true), firstInput = _b[0], setFirstInput = _b[1];
    var _c = useState(''), desc = _c[0], setDesc = _c[1];
    var _d = useState(JUDGE_STATE.STATIC), judgeState = _d[0], setJudgeState = _d[1];
    var _e = useState(''), value = _e[0], setValue = _e[1];
    var _f = useState(true), showHide = _f[0], setShowHide = _f[1];
    var idCity = useRef({ 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" });
    var hideJudge = useRef(['pwd']);
    var imgCodeRef = useRef(null);
    var timeSign = useRef("" + new Date().getTime());
    useImperativeHandle(ref, function () { return ({
        setJudgeState: function (v) {
            setJudgeState(function () { return v; });
            setFirstInput(function () { return false; });
        },
        getJudgeState: function () { return judgeState; },
        getValue: function () { return value; },
        setValue: function (v) { return setValue(function () { return v; }); },
        getDesc: function () { return desc; }
    }); });
    var classes = classNames('ararin-input', className, (_a = {},
        _a["ararin-input-" + type] = type,
        _a['failed'] = (judgeState === JUDGE_STATE.FAILED && !firstInput),
        _a));
    useEffect(function () {
        setTimeout(function () { return setValue(function () { return initValue; }); }, 1000);
    }, []);
    var handleInput = function (e) {
        e.persist();
        var text = e.target.value.replace(/\s+/g, "");
        if (noJudge) {
            setValue(function () { return text; });
            return;
        }
        if (!RegExp) {
            switch (judge) {
                case "mobilePhone":
                    if ((/^1[0-9]{0,}$/.test(text)) || text === "") {
                        if (text.length <= 11) {
                            setValue(function () { return text; });
                            if (text.length === 11) {
                                setJudgeState(function () { return JUDGE_STATE.SUCCESS; });
                            }
                            else {
                                setJudgeState(function () { return JUDGE_STATE.FAILED; });
                            }
                        }
                    }
                    return;
                case "name":
                    if (text.length <= 10) {
                        setValue(function () { return text; });
                        if (text.length <= 6 && /[\u4e00-\u9fa5]+$/.test(text)) {
                            setJudgeState(function () { return JUDGE_STATE.SUCCESS; });
                        }
                        else {
                            setJudgeState(function () { return JUDGE_STATE.FAILED; });
                            setDesc('身份证长度或格式错误');
                            return;
                        }
                    }
                    return;
                case 'pwd':
                    if ((/^[0-9]{0,}$/.test(text)) || text === "") {
                        if (text.length <= 6) {
                            // if()
                            setValue(function () { return text; });
                            if (text.length === 6) {
                                setJudgeState(function () { return JUDGE_STATE.SUCCESS; });
                            }
                            else {
                                setJudgeState(function () { return JUDGE_STATE.FAILED; });
                            }
                        }
                    }
                    return;
                case 'allIdCard':
                    if (/\d+/.test(text) || text === "") {
                        if (text.length <= 18) {
                            setValue(function () { return text; });
                            if (text.length >= 15) {
                                if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(text)) {
                                    setJudgeState(function () { return JUDGE_STATE.FAILED; });
                                    setDesc('身份证长度或格式错误');
                                    return;
                                }
                                if (!idCity.current[parseInt(text.substr(0, 2))]) {
                                    setJudgeState(function () { return JUDGE_STATE.FAILED; });
                                    setDesc('身份证地区非法');
                                    return;
                                }
                                var sum = 0, weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], codes = "10X98765432";
                                for (var i = 0; i < text.length - 1; i++) {
                                    sum += text[i] * weights[i];
                                }
                                var last = codes[sum % 11]; //计算出来的最后一位身份证号码
                                if (text[text.length - 1] != last) {
                                    setJudgeState(function () { return JUDGE_STATE.FAILED; });
                                    setDesc('身份证非法');
                                    return;
                                }
                                setJudgeState(function () { return JUDGE_STATE.SUCCESS; });
                            }
                            else {
                                setJudgeState(function () { return JUDGE_STATE.FAILED; });
                                setDesc(function () { return '身份证长度错误'; });
                            }
                        }
                    }
                    return;
                case 'msgCode':
                    if ((/[0-9a-zA-Z]{0,4}$/.test(text)) || text === "") {
                        if (text.length <= 4) {
                            setValue(function () { return text; });
                            if (text.length == 4) {
                                setJudgeState(function () { return JUDGE_STATE.SUCCESS; });
                            }
                            else {
                                setJudgeState(function () { return JUDGE_STATE.FAILED; });
                            }
                        }
                    }
                    else {
                        setJudgeState(function () { return JUDGE_STATE.FAILED; });
                        setDesc(function () { return '验证码格式错误'; });
                    }
                    return;
                case 'imgCode':
                    if ((/[0-9a-zA-Z]{0,4}$/.test(text)) || text === "") {
                        if (text.length <= 4) {
                            setValue(function () { return text; });
                            if (text.length == 4) {
                                setJudgeState(function () { return JUDGE_STATE.SUCCESS; });
                            }
                            else {
                                setJudgeState(function () { return JUDGE_STATE.FAILED; });
                            }
                        }
                    }
                    else {
                        setJudgeState(function () { return JUDGE_STATE.FAILED; });
                        setDesc(function () { return '验证码格式错误'; });
                    }
                    return;
                case 'default':
                    setValue(function () { return text; });
            }
        }
        else {
            var reg = new window.RegExp(RegExp, "g");
            setValue(function () { return text; });
            if (text.match(reg)) {
                setJudgeState(function () { return JUDGE_STATE.SUCCESS; });
            }
            else {
                setJudgeState(function () { return JUDGE_STATE.FAILED; });
            }
        }
    };
    useEffect(function () {
        if (!lengthMode || value == undefined || value == null)
            return;
        switch (lengthMode[1]) {
            case 'less':
                if (value.length < lengthMode[0])
                    setJudgeState(function () { return JUDGE_STATE.SUCCESS; });
                else
                    setJudgeState(function () { return JUDGE_STATE.FAILED; });
                return;
            case 'equal':
                if (value.length == lengthMode[0])
                    setJudgeState(function () { return JUDGE_STATE.SUCCESS; });
                else
                    setJudgeState(function () { return JUDGE_STATE.FAILED; });
                return;
            case 'more':
                if (value.length > lengthMode[0])
                    setJudgeState(function () { return JUDGE_STATE.SUCCESS; });
                else
                    setJudgeState(function () { return JUDGE_STATE.FAILED; });
                return;
        }
    }, [value]);
    return React.createElement("div", { className: classes },
        title && React.createElement("label", null, title),
        React.createElement("div", { className: "ararin-input-zone" },
            type === 'input' &&
                React.createElement(React.Fragment, null,
                    React.createElement("input", __assign({ type: noHide ? '' : (hideJudge.current.indexOf(judge) !== -1 && showHide) ? 'password' : '', value: value, onChange: function (e) { return handleInput(e); }, onFocus: function (e) {
                            onFocus && onFocus(e);
                            // setFirstInput(() => false)
                        }, maxLength: maxLength, onBlur: function (e) {
                            onBlur && onBlur(e);
                            setFirstInput(function () { return false; });
                        } }, restPros)),
                    React.createElement("span", null)),
            type === 'block' &&
                React.createElement("div", null, value)),
        judge === 'msgCode' &&
            (times > 0 ?
                React.createElement("span", { className: "ararin-disabled ararin-input-code" },
                    times,
                    "s") :
                React.createElement("span", { style: { cursor: 'pointer' }, className: "ararin-input-code", onClick: onClick }, codeTxt)),
        judge === 'imgCode' &&
            React.createElement("span", { style: { cursor: 'pointer', width: '30%' }, className: "ararin-input-code", onClick: function () { return imgCodeRef.current.src = "" + imgCodeSrc + ('?time=' + new Date().getTime()); } },
                React.createElement("img", { ref: imgCodeRef, src: "" + imgCodeSrc + ('?time=' + timeSign.current), alt: "", style: { width: '100%' } })),
        !noHide && hideJudge.current.indexOf(judge) !== -1 &&
            React.createElement(Icon, { type: "showHide", onClick: function () { return setShowHide(function () { return !showHide; }); }, trigger: showHide }));
});
Input.defaultProps = {
    type: 'input',
    judge: 'default',
    title: '',
    placeholder: '',
    noHide: false,
    noJudge: false,
};
export default Input;
