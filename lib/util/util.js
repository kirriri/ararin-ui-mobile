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
export var setCssStyle = function (obj, name, val, reactObj) {
    if (reactObj === void 0) { reactObj = false; }
    (reactObj ? ReactPrefixBrowser : PrefixBrowser).forEach(function (item) {
        obj[item + name] = val;
    });
};
export var postParentIframeMsg = function (data) { return window.parent.postMessage(data, 'http://localhost:7777/ararin/ui/components#/ararin-cmp/view/*'); };
