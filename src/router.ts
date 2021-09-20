import Auth from './modules/auth'
import blogs from './modules/blogs'
import Home from './modules/home'

const routes: AppRoute[] = [
	{
		path: '/',
		component: Home,
		exact: true,
	},
	{
		path: '/auth',
		component: Auth,
		requireNotAuthenticated: true,
		redirectTo: '/',
	},
	{
		path: '/blogs',
		component: blogs,
	},
]

export default routes
