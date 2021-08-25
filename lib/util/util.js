var PrefixBrowser = [
    "-webkit-",
    "-moz-",
    "-ms-",
    "-o-",
    ""
];
var ReactPrefixBrowser = [
    "Ms",
    "Moz",
    "Webkit",
    "O",
    ""
];
export var isPc = function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};
export var setCssStyle = function (obj, name, val, reactObj) {
    if (reactObj === void 0) { reactObj = false; }
    (reactObj ? ReactPrefixBrowser : PrefixBrowser).forEach(function (item) {
        obj[item + name] = val;
    });
};
export var postParentIframeMsg = function (data) { return window.parent.postMessage(data, 'http://localhost:7777/ararin/ui/components#/ararin-cmp/view/*'); };
