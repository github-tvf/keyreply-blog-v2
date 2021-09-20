import request, { Endpoint, Methods } from 'src/helpers/endpoints'

export interface User {
	id?: string
	email: string
	firstName: string
	lastName: string
	password: string
}

export const signInUser = (payload: Pick<User, 'email' | 'password'>) => {
	const endpoint: Endpoint = {
		url: 'auth/login',
		method: Methods.POST,
	}

	return request<
		User & { access_token: string },
		Pick<User, 'email' | 'password'>
	>(endpoint, payload)
}

export const signUpUser = (payload: User) => {
	const endpoint: Endpoint = {
		url: 'auth/signup',
		method: Methods.POST,
	}

	return request<User & { access_token: string }, User>(endpoint, payload)
}

export const getProfile = () => {
	const endpoint: Endpoint = {
		url: 'auth/profile',
		method: Methods.GET,
	}

	return request<User, any>(endpoint)
}
