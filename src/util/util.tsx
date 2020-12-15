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


export const setCssStyle = (obj, name, val, reactObj = false) => {
	(reactObj ? ReactPrefixBrowser : PrefixBrowser).forEach(item => {
		obj[item+name] = val
	})
}

export const postParentIframeMsg = data => window.parent.postMessage(data, 'http://localhost:7777/ecsc/ui/components#/ecsc-ui/view/*')