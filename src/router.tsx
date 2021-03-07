import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Url } from './components/Url/url';
import ButtonDetail from './pages/Button/button.d';
import ButtonPhone from './pages/Button/button';
import IconPhone from './pages/Icon/icon';
import PrizeWheelPhone from './pages/PrizeWheel/prizeWheel';
import PrizeSudokuPhone from './pages/PrizeSudoku/prizeSudoku';
import DialogPhone from './pages/Dialog/dialog';
import Input from './pages/Input/input';

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
		<Route path="/ararin-components-mobile/detail" render={() => 
			<>
				{metaType('web')}
				<Switch>
					<Route exact path="/ararin-components-mobile/detail/button" component={ButtonDetail} />
				</Switch>
			</>
		}/>
		<Route path="/ararin-components-mobile/phone" render={() => 
			<>
				{metaType('wap')}
				<Url url={window.location.href}/>
				<Switch>
					<Route exact path="/ararin-components-mobile/phone/button" component={ButtonPhone} />
					<Route exact path="/ararin-components-mobile/phone/icon" component={IconPhone} />
					<Route exact path="/ararin-components-mobile/phone/prizewheel" component={PrizeWheelPhone} />
					<Route exact path="/ararin-components-mobile/phone/prizeSudoku" component={PrizeSudokuPhone} />
					<Route exact path="/ararin-components-mobile/phone/dialog" component={DialogPhone} />
					<Route exact path="/ararin-components-mobile/Input/input" component={Input} />
				</Switch>
			</>
		}/>
	</Router>
)

export default Content