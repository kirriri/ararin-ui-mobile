import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import ButtonDetail from '@/pages/Button/button.d';
import ButtonPhone from '@/pages/Button/button';
import IconDetail from '@/pages/Icon/icon.d';
import IconPhone from '@/pages/Icon/icon';
import { Url } from '@/components/Url/url';

const metaType = type => {
	const qMeta = document.querySelector('meta[name="viewport"]')
	let meta = ''
	if(type === 'wap') {
		if(qMeta) {
			qMeta['content'] = 'maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0'
			document.querySelector('meta[charset="utf-8"]').insertAdjacentHTML('beforebegin', meta)
		}else {
			let meta = '<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>'
			document.querySelector('meta[charset="utf-8"]').insertAdjacentHTML('beforebegin', meta)
		}
		document.querySelector('html').style.fontSize = '26.666666vw'
		document.querySelector('html').querySelector('body').style.background = 'rgba(0,0,0, .05)'
	}else {
		if(qMeta) {
			qMeta['content'] = 'width=device-width, initial-scale=1'
		}else {
			let meta = '<meta name="viewport" content="width=device-width, initial-scale=1"/>'
			document.querySelector('meta[charset="utf-8"]').insertAdjacentHTML('beforebegin', meta)
		}
		document.querySelector('html').style.fontSize = '18px'
		document.querySelector('html').querySelector('body').style.background = 'rgba(255,255,255, 1)'
	}
}

export const Content = () => (
	<Router>
		<Route path="/ecsc-components-mobile/detail" render={() => 
			<>
				{metaType('web')}
				<Switch>
					<Route exact path="/ecsc-components-mobile/detail/button" component={ButtonDetail} />
					<Route exact path="/ecsc-components-mobile/detail/icon" component={IconDetail} />
				</Switch>
			</>
		}/>
		<Route path="/ecsc-components-mobile/phone" render={() => 
			<>
				{metaType('wap')}
				<Url url={window.location.href}/>
				<Switch>
					<Route exact path="/ecsc-components-mobile/phone/button" component={ButtonPhone} />
					<Route exact path="/ecsc-components-mobile/phone/icon" component={IconPhone} />
				</Switch>
			</>
		}/>
	</Router>
)

export default Content