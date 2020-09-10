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