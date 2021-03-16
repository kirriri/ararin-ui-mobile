import React, { useState, } from 'react';
import classNames from 'classnames';
export var Input = function (props) {
    var _a;
    var title = props.title, className = props.className, type = props.type, judge = props.judge, onclick = props.onclick, codeTxt = props.codeTxt, times = props.times;
    var _b = useState(''), value = _b[0], setValue = _b[1];
    var classes = classNames('ararin-input', className, (_a = {},
        _a["ararin-input-" + type] = type,
        _a));
    return React.createElement("div", { className: classes },
        title && React.createElement("label", null, title),
        type === 'input' &&
            React.createElement(React.Fragment, null,
                React.createElement("input", { value: value, onChange: function (e) { e.persist(); setValue(function () { return e.target.value; }); } }),
                React.createElement("span", null)),
        judge === 'code' &&
            (times > 0 ?
                React.createElement("span", { className: "ararin-disabled" },
                    times,
                    "s") :
                React.createElement("span", { onClick: onclick }, codeTxt)));
};
Input.defaultProps = {
    type: 'input',
    judge: 'default',
    title: '',
    placeholder: ''
};
export default Input;
