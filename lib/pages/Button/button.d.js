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
import './button.scss';
import { postParentIframeMsg } from '../../util/util';
var ButtonPage = /** @class */ (function (_super) {
    __extends(ButtonPage, _super);
    function ButtonPage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            markText: '# 这是标题\n' +
                '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
                '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
                '**这是加粗的文字**\n\n' +
                '*这是倾斜的文字*`\n\n' +
                '***这是斜体加粗的文字***\n\n' +
                '~~这是加删除线的文字~~ \n\n' +
                '\`console.log(Hello World)\` \n\n' +
                '```const a=2; ```'
        };
        return _this;
    }
    ButtonPage.prototype.componentDidMount = function () {
        postParentIframeMsg({
            load: true,
            cmp: 'Button'
        });
    };
    ButtonPage.prototype.render = function () {
        var _a = this.state, visible = _a.visible, pickerState = _a.pickerState;
        return (React.createElement("div", { className: "page_button" }));
    };
    return ButtonPage;
}(React.PureComponent));
export default ButtonPage;
