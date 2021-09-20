import request, { Endpoint, Methods } from 'src/helpers/endpoints'
import { User } from 'src/modules/auth/services/auth.service'

export interface Blog {
	title: string
	description?: string
	thumbnail?: string
	content: string
	createdAt: Date
	updatedAt: Date
	authorId: string
	author: User
}

export const uploadThumbnail = (payload: FormData) => {
	const endpoint: Endpoint = {
		url: 'blogs/thumbnail',
		method: Methods.POST,
	}

	return request<{ fileName: string }, FormData>(endpoint, payload)
}

export const publishBlog = (
	payload: Omit<Blog, 'createdAt' | 'updatedAt' | 'author' | 'authorId'>
) => {
	const endpoint: Endpoint = {
		url: 'blogs',
		method: Methods.POST,
	}

	return request<
		Blog & { id: string },
		Omit<Blog, 'createdAt' | 'updatedAt' | 'author' | 'authorId'>
	>(endpoint, payload)
}

export const getAllBlogs = () => {
	const endpoint: Endpoint = {
		url: 'blogs',
		method: Methods.GET,
	}

	return request<(Blog & { id: string })[], {}>(endpoint)
}

export const getBlogById = (id: string) => {
	const endpoint: Endpoint = {
		url: `blogs/${id}`,
		method: Methods.GET,
	}

	return request<(Blog & { id: string }) | undefined, {}>(endpoint)
}

export const deleteBlogById = (id: string) => {
	const endpoint: Endpoint = {
		url: `blogs/${id}`,
		method: Methods.DELETE,
	}

	return request<any, {}>(endpoint)
}
export const saveBlog = (
	id: string,
	payload: Omit<Blog, 'createdAt' | 'updatedAt' | 'author' | 'authorId'>
) => {
	const endpoint: Endpoint = {
		url: `blogs/${id}`,
		method: Methods.PUT,
	}

	return request<
		Blog & { id: string },
		Omit<Blog, 'createdAt' | 'updatedAt' | 'author' | 'authorId'>
	>(endpoint, payload)
}
