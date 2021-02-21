import React from 'react';
import './url.scss';
export var Url = function (props) {
    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: "url_wrapper" },
            React.createElement("div", { className: "url_content" },
                React.createElement("div", { className: "url" }, props.url))));
};
