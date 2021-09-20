import Cookies from 'js-cookie'
import ky from 'ky'

export enum Methods {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
	PUT = 'PUT',
}

export interface Endpoint {
	url: string
	method: Methods
}

export const BACKEND_URL = 'http://localhost:8080'

function request<R, B>(
	endpoint: Endpoint,
	body?: B,
	headers?: Record<string, string>
): Promise<R> {
	const token = Cookies.get('access_token')

	const payload: any = {}

	if (body instanceof FormData) {
		payload.body = body
	} else {
		payload.json = body
	}

	return ky(endpoint.url, {
		method: endpoint.method,
		...payload,
		headers: {
			...headers,
			Authorization: `Bearer ${token}`,
		},
		prefixUrl: BACKEND_URL,
	}).json()
}

export default request
