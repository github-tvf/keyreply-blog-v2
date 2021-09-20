import { Switch } from 'react-router'
import { useRouteMatch } from 'react-router-dom'
import AppRoute from 'src/components/AppRoute'
import routes from './router'

const Blogs = () => {
	const { path } = useRouteMatch()
	return (
		<Switch>
			{routes.map((route, index) => (
				<AppRoute key={index} {...route} path={`${path}${route.path}`} />
			))}
		</Switch>
	)
}

export default Blogs
