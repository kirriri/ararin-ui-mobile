import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Url } from './components/Url/url';
import ButtonDetail from './pages/Button/button.d';
import ButtonPhone from './pages/Button/button';
import IconPhone from './pages/Icon/icon';
import PrizeWheelPhone from './pages/PrizeWheel/prizeWheel';
var metaType = function (type) {
    var qMeta = document.querySelector('meta[name="viewport"]');
    var meta = '';
    if (type === 'wap') {
        if (qMeta) {
            qMeta['content'] = 'maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0';
            document.querySelector('meta[charset="utf-8"]').insertAdjacentHTML('beforebegin', meta);
        }
        else {
            var meta_1 = '<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>';
            document.querySelector('meta[charset="utf-8"]').insertAdjacentHTML('beforebegin', meta_1);
        }
        document.querySelector('html').style.fontSize = '26.666666vw';
        document.querySelector('html').querySelector('body').style.background = 'rgba(0,0,0, .05)';
    }
    else {
        if (qMeta) {
            qMeta['content'] = 'width=device-width, initial-scale=1';
        }
        else {
            var meta_2 = '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
            document.querySelector('meta[charset="utf-8"]').insertAdjacentHTML('beforebegin', meta_2);
        }
        document.querySelector('html').style.fontSize = '18px';
        document.querySelector('html').querySelector('body').style.background = 'rgba(255,255,255, 1)';
    }
};
export var Content = function () { return (React.createElement(Router, null,
    React.createElement(Route, { path: "/ararin-components-mobile/detail", render: function () {
            return React.createElement(React.Fragment, null,
                metaType('web'),
                React.createElement(Switch, null,
                    React.createElement(Route, { exact: true, path: "/ararin-components-mobile/detail/button", component: ButtonDetail })));
        } }),
    React.createElement(Route, { path: "/ararin-components-mobile/phone", render: function () {
            return React.createElement(React.Fragment, null,
                metaType('wap'),
                React.createElement(Url, { url: window.location.href }),
                React.createElement(Switch, null,
                    React.createElement(Route, { exact: true, path: "/ararin-components-mobile/phone/button", component: ButtonPhone }),
                    React.createElement(Route, { exact: true, path: "/ararin-components-mobile/phone/prizewheel", component: PrizeWheelPhone }),
                    React.createElement(Route, { exact: true, path: "/ararin-components-mobile/phone/icon", component: IconPhone })));
        } }))); };
export default Content;
