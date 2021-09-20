import { Switch, useRouteMatch } from 'react-router'
import AppRoute from 'src/components/AppRoute'

import routes from './router'

const Auth: React.FC<any> = () => {
	const { path } = useRouteMatch()

	return (
		<Switch>
			{routes.map((route, index) => (
				<AppRoute key={index} {...route} path={`${path}${route.path}`} />
			))}
		</Switch>
	)
}

export default Auth
