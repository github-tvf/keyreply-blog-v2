import React, { useCallback, useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { UserContext } from 'src/App'

interface Props {
	path: string
	component: React.ComponentType<any>
	exact?: boolean
	requireAuthenticated?: boolean
	requireNotAuthenticated?: boolean
	redirectTo?: string
}

const AppRoute: React.FC<Props> = props => {
	const userContext = useContext(UserContext)
	const user = userContext.user
	const { requireAuthenticated, requireNotAuthenticated } = props

	const checkAuthorization = useCallback(() => {
		if (requireAuthenticated) {
			if (!user) {
				return false
			}
		}
		if (requireNotAuthenticated) {
			if (user) {
				return false
			}
		}
		return true
	}, [requireAuthenticated, requireNotAuthenticated, user])

	console.log(props.path, checkAuthorization(), props.redirectTo)

	return (
		<>
			{checkAuthorization() ? (
				<Route {...props} />
			) : (
				<Redirect to={props.redirectTo || ''} />
			)}
		</>
	)
}

AppRoute.defaultProps = {
	redirectTo: '/auth/signin',
}

export default AppRoute
