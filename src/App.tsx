import { defaultTheme } from '@adobe/react-spectrum'
import { Provider } from '@react-spectrum/provider'
import Cookies from 'js-cookie'
import React, { useEffect, useMemo, useState } from 'react'
import { Switch, useHistory } from 'react-router'
import './App.css'
import AppRoute from './components/AppRoute'
import { getProfile, User } from './modules/auth/services/auth.service'

import routes from './router'

export const UserContext = React.createContext<{
	user: User | undefined
	setUser: (user: User) => void
}>({
	user: undefined,
	setUser: () => {},
})

function App() {
	const [user, setUser] = useState<User | undefined>()
	const [loadingProfile, setLoadingProfile] = useState<boolean>(true)

	const access_token = useMemo(() => Cookies.get('access_token'), [])
	const history = useHistory()

	useEffect(() => {
		if (access_token) {
			const startFetchProfile = async () => {
				try {
					const user = await getProfile()
					setUser(user)
					setLoadingProfile(false)
				} catch (error) {
					Cookies.remove('access_token')
					setLoadingProfile(false)
				}
			}
			startFetchProfile()
		} else {
			setLoadingProfile(false)
		}
	}, [access_token, history])

	return (
		<Provider theme={defaultTheme} colorScheme='light'>
			<UserContext.Provider value={{ user, setUser }}>
				<div className='App'>
					{loadingProfile ? (
						<div>Loading</div>
					) : (
						<Switch>
							{routes.map((route, index) => (
								<AppRoute key={index} {...route} />
							))}
						</Switch>
					)}
				</div>
			</UserContext.Provider>
		</Provider>
	)
}

export default App
