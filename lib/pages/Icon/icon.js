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
import Icon from '../../components/Icon';
import { IconRes } from '../../components/Icon/IconRes';
import './icon.scss';
var IconPage = /** @class */ (function (_super) {
    __extends(IconPage, _super);
    function IconPage(props) {
        var _this = _super.call(this, props) || this;
        _this.getMsg = function (e) {
            var index = e.data.index;
            _this.setState({ active: index });
        };
        _this.getStyle = function () { return "\n    \n    "; };
        _this.state = {
            IconData: Object.keys(IconRes).map(function (item) { return React.createElement(Icon, { type: item }); })
        };
        return _this;
    }
    IconPage.prototype.componentDidMount = function () {
        window.addEventListener('message', this.getMsg);
        if (window.parent) {
            window.parent.postMessage({ load: true }, "*");
        }
    };
    IconPage.prototype.componentWillUnmount = function () {
        window.removeEventListener('message', this.getMsg);
    };
    IconPage.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("style", { dangerouslySetInnerHTML: { __html: this.getStyle() } }),
            React.createElement("div", { className: "pageIcon", style: { padding: '15vw 5vw 10vw', background: '#fff' } },
                React.createElement("ul", { className: "wrapper" }, this.state.IconData.map(function (item, index) {
                    return React.createElement("li", null, item);
                })))));
    };
    return IconPage;
}(React.Component));
export default IconPage;
