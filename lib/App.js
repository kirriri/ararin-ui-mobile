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
import Button from './components/Button/button';
import Dialog from './components/Dialog/dialog';
import Picker from './components/Picker/picker';
import './app.scss';
import { PickerTestData2 } from './util/dataTest';
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            buttonState: 'loading',
            visible: false,
            popupVisible: false,
            pickerState: false,
            data: []
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.setState({
                data: PickerTestData2
            });
        }, 1000);
    };
    App.prototype.render = function () {
        var _this = this;
        var _a = this.state, visible = _a.visible, pickerState = _a.pickerState;
        return (React.createElement("div", { className: "App", style: { padding: '15vw 5vw 0' } },
            React.createElement(Button, { type: "success", size: "sm", onClick: function () { _this.setState({ visible: true }); } }, "\u5F39\u7A97"),
            React.createElement(Button, { type: "danger", ripple: true, style: { marginTop: '.15rem' }, onClick: function () { console.log(22222); } }, "\u5F39\u7A97"),
            React.createElement(Button, { state: "loading", ripple: true, size: "lg", style: { marginTop: '.15rem' }, type: "primary", onClick: function () { _this.setState({ pickerState: !pickerState }); } }, "\u9009\u62E9\u5668"),
            React.createElement(Picker
            // history
            , { 
                // history
                maskClosable: true, cancelPress: function () { _this.setState({ pickerState: !pickerState }); }, okPress: function (val) { console.log(val); _this.setState({ pickerState: !pickerState }); }, data: this.state.data, visible: this.state.pickerState }),
            React.createElement(Dialog, { maskClosable: true, title: React.createElement("h3", null, "\u6807\u9898\u6D4B\u8BD5"), visible: visible, footer: [
                    { text: '取消', onPress: function () { _this.setState({ visible: false }); } },
                    { text: '确定', onPress: function () { _this.setState({ visible: false }); }, higlight: true }
                ] }, "\u6D4B\u8BD5\u6D4B\u8BD5\u6D4B\u8BD5")));
    };
    return App;
}(React.Component));
export default App;
