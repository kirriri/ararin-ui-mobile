const PrefixBrowser = [
	"-webkit-",
	"-moz-",
	"-ms-",
	"-o-",
	""
]

const ReactPrefixBrowser = [
	"Ms",
	"Moz",
	"Webkit",
	"O",
	""
]

export const isPc = () => {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export const setCssStyle = (obj, name, val, reactObj = false) => {
	(reactObj ? ReactPrefixBrowser : PrefixBrowser).forEach(item => {
		obj[item+name] = val
	})
}

export const postParentIframeMsg = data => window.parent.postMessage(data, 'http://localhost:7777/ararin/ui/components#/ararin-cmp/view/*')