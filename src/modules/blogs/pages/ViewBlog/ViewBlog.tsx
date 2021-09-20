import { Button } from '@adobe/react-spectrum'
import { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { UserContext } from 'src/App'
import Container from 'src/components/Container'
import Navbar from 'src/components/Navbar'
import BlogContent from '../../components/BlogContent'
import { Blog, deleteBlogById, getBlogById } from '../../services/blogs.service'

import './ViewBlog.scss'

const ViewBlog = () => {
	const { id } = useParams<{ id: string }>()
	const history = useHistory()

	const userContext = useContext(UserContext)
	const user = userContext.user

	const [blog, setBlog] = useState<(Blog & { id: string }) | undefined>()

	useEffect(() => {
		async function startGetBlog() {
			try {
				const response = await getBlogById(id)

				setBlog(response)
			} catch (error) {
				console.log(error)
			}
		}

		startGetBlog()
	}, [id])

	const handleDelete = async () => {
		try {
			await deleteBlogById(id)
			history.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='view-blog-page'>
			<Navbar>
				{blog?.authorId === user?.id && (
					<Button onPress={handleDelete} variant='negative' isQuiet>
						Delete
					</Button>
				)}
				<Button
					onPress={() => {
						if (blog?.authorId === user?.id) {
							history.push(`/blogs/edit/${id}`)
						} else {
							history.push('/blogs')
						}
					}}
					marginX='size-150'
					variant='primary'>
					{blog?.authorId === user?.id ? 'Edit blog' : 'Create blog'}
				</Button>
			</Navbar>
			<Container size='small'>
				<div className='view-blog-page__wrapper'>
					{blog && <BlogContent {...blog} />}
				</div>
			</Container>
		</div>
	)
}

export default ViewBlog
