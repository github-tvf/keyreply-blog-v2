import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const routes: AppRoute[] = [
	{
		path: '/signup',
		component: SignUp,
	},
	{
		path: '/signin',
		component: SignIn,
	},
]

export default routes
