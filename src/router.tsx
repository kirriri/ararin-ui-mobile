import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import ButtonDetail from '@/pages/Button/button.d';
import ButtonPhone from '@/pages/Button/button'

const Content = () => (
	<Router>
		<Route exact path="/ecsc-components-mobile/detail/button" component={ButtonDetail} />
		<Route exact path="/ecsc-components-mobile/phone/button" component={ButtonPhone} />

		{/* <Route path="/ecsc-components-mobile/detail" render={() => 
			<Switch>
				<Route exact path="/ecsc-components-mobile/detail/button" component={ButtonDetail} />
			</Switch>
		}/>
		<Route path="/ecsc-components-mobile/phone" render={() => 
			<Switch>
			</Switch>
		}/> */}
	</Router>
)

export default Content