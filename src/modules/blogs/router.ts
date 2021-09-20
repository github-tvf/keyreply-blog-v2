import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'
import PublishBlog from './pages/PublishBlog'
import PublishEditedBlog from './pages/PublishEditedBlog'
import ViewBlog from './pages/ViewBlog'

const routes: AppRoute[] = [
	{
		path: '/',
		component: CreateBlog,
		requireAuthenticated: true,
		exact: true,
	},
	{
		path: '/edit/:id',
		component: EditBlog,
		requireAuthenticated: true,
		exact: true,
	},
	{
		path: '/edit/:id/publish',
		component: PublishEditedBlog,
		requireAuthenticated: true,
	},
	{
		path: '/publish',
		component: PublishBlog,
		requireAuthenticated: true,
	},
	{
		path: '/:id',
		component: ViewBlog,
	},
]

export default routes
