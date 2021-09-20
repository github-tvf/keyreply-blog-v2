interface AppRoute {
	path: string
	component: import('react').ComponentType<any>
	exact?: boolean
	requireAuthenticated?: boolean
	requireNotAuthenticated?: boolean
	redirectTo?: string
}
