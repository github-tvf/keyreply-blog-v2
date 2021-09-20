import Container from 'src/components/Container'
import Navbar from 'src/components/Navbar'

import { Button } from '@react-spectrum/button'
import { useHistory } from 'react-router'

import './ViewBlogs.scss'
import { useEffect, useState } from 'react'
import { Blog, getAllBlogs } from 'src/modules/blogs/services/blogs.service'
import BlogCard from '../../components/BlogCard'

const ViewBlogs = () => {
	const history = useHistory()

	const [blogs, setBlogs] = useState<(Blog & { id: string })[]>([])

	useEffect(() => {
		async function fetchingBlogs() {
			try {
				const response = await getAllBlogs()

				setBlogs(response)
			} catch (error) {
				console.log(error)
			}
		}
		fetchingBlogs()
	}, [])

	return (
		<div className='view-blogs-page'>
			<Navbar>
				<Button
					onPress={() => {
						history.push('/blogs')
					}}
					marginX='size-150'
					variant='primary'>
					Create blog
				</Button>
			</Navbar>
			<Container size='small'>
				<div className='view-blogs-page__wrapper'>
					{blogs.map(blog => (
						<BlogCard key={blog.id} {...blog} />
					))}
				</div>
			</Container>
		</div>
	)
}

export default ViewBlogs
