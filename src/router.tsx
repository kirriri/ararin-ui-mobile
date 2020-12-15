import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import ButtonDetail from '@/pages/Button/button.d';
import ButtonPhone from '@/pages/Button/button';
import IconDetail from '@/pages/Icon/icon.d';
import IconPhone from '@/pages/Icon/icon';

const Content = () => (
	<Router>
		{/* <Route exact path="/ecsc-components-mobile/detail/button" component={ButtonDetail} /> */}

		<Route path="/ecsc-components-mobile/detail" render={() => 
			<Switch>
				<Route exact path="/ecsc-components-mobile/detail/button" component={ButtonDetail} />
				<Route exact path="/ecsc-components-mobile/detail/icon" component={IconDetail} />
			</Switch>
		}/>
		<Route path="/ecsc-components-mobile/phone" render={() => 
			<Switch>
				<Route exact path="/ecsc-components-mobile/phone/button" component={ButtonPhone} />
				<Route exact path="/ecsc-components-mobile/phone/icon" component={IconPhone} />
			</Switch>
		}/>
	</Router>
)

export default Content