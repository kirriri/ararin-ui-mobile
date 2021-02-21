var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import Button from '../../components/Button/button';
import './button.scss';
import { CSSTransition } from 'react-transition-group';
var ButtonPage = /** @class */ (function (_super) {
    __extends(ButtonPage, _super);
    function ButtonPage(props) {
        var _this = _super.call(this, props) || this;
        _this.getMsg = function (e) {
            var index = e.data.index;
            _this.setState({ active: index });
        };
        _this.getResetStyle = function () { return ""; };
        _this.state = {
            active: -1,
            data: [
                React.createElement("div", null,
                    React.createElement(Button, { type: "default", size: "sm", onClick: function () { _this.setState({ visible: true }); } }, "sm \u6309\u94AE"),
                    React.createElement(Button, { style: { marginTop: '3vw' }, state: "loading", size: "sm", onClick: function () { _this.setState({ visible: true }); } }, "\u6682\u505C \u6309\u94AE"),
                    React.createElement(Button, { type: "danger", style: { marginTop: '3vw' }, onClick: function () { console.log(22222); } }, "md \u6309\u94AE")),
                React.createElement("div", null,
                    React.createElement(Button, { ripple: true, size: "lg", style: { marginTop: '3vw' }, type: "primary" }, "lg \u6C34\u6CE2\u7EB9\u6309\u94AE"))
            ]
        };
        return _this;
    }
    ButtonPage.prototype.componentDidMount = function () {
        window.addEventListener('message', this.getMsg);
        if (window.parent) {
            window.parent.postMessage({ load: true }, "*");
        }
    };
    ButtonPage.prototype.componentWillUnmount = function () {
        window.removeEventListener('message', this.getMsg);
    };
    ButtonPage.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement("style", { dangerouslySetInnerHTML: { __html: this.getResetStyle() } }),
            React.createElement("div", { className: "phone_button", style: { padding: '15vw 5vw 10vw', background: '#fff' } }, this.state.data.map(function (item, index) {
                return React.createElement(CSSTransition, { key: "ele_1" + index, style: { position: 'relative' }, in: index === _this.state.active ? true : false, classNames: "eleFocus", timeout: 1200, onEntered: function () { return _this.setState({ active: -1 }); } },
                    React.createElement("div", null, item));
            }))));
    };
    return ButtonPage;
}(React.Component));
export default ButtonPage;
