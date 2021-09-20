import Container from 'src/components/Container'
import Navbar from 'src/components/Navbar'
import { Button } from '@react-spectrum/button'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router'

import { Flex } from '@react-spectrum/layout'
import BlogPreview from '../../components/BlogPreview'
import { UserContext } from 'src/App'
import {
	deleteBlogById,
	getBlogById,
	saveBlog,
} from '../../services/blogs.service'
import { useParams } from 'react-router-dom'

import './PublishEditedBlog.scss'
import { CustomElement } from 'src/slate'

const PublishEditedBlog = () => {
	const userContext = useContext(UserContext)
	const { id } = useParams<{ id: string }>()
	const user = userContext.user
	const history = useHistory()
	const storageContent = useMemo(
		() => localStorage.getItem('blog_content_edited'),
		[]
	)

	const jsonContent: CustomElement[] = useMemo(
		() => JSON.parse(storageContent || ''),
		[storageContent]
	)

	const updatedTitle = useMemo(() => {
		const firstNode = jsonContent[0]
		if (firstNode && firstNode.children[0]) {
			return firstNode.children[0].text
		}
	}, [jsonContent])

	const updatedDescription = useMemo(() => {
		const secondNode = jsonContent[1]
		if (secondNode && secondNode.children[0]) {
			return secondNode.children[0].text
		}
	}, [jsonContent])

	const [thumbnail, setThumbnail] = useState<string | undefined>()
	const [title, setTitle] = useState<string | undefined>(updatedTitle)
	const [description, setDescription] = useState<string | undefined>(
		updatedDescription
	)

	useEffect(() => {
		async function fetchBlogById() {
			try {
				const response = await getBlogById(id)
				if (!response || response.authorId !== user?.id) {
					history.push('/')
					return
				}

				setThumbnail(response.thumbnail)
				setTitle(pre => {
					if (!pre) {
						return response.title
					}
					return pre
				})
				setDescription(pre => {
					if (!pre) {
						return response.thumbnail
					}
					return pre
				})
			} catch (error) {
				console.log(error)
			}
		}

		fetchBlogById()
	}, [history, id, user?.id])

	if (!storageContent) {
		history.push('/')
	}

	const handlePublish = async () => {
		try {
			await saveBlog(id, {
				title: title || '',
				description,
				thumbnail,
				content: storageContent || '',
			})

			localStorage.removeItem('blog_content_edited')
			history.push('/')
		} catch (error: any) {
			console.log(error)
		}
	}

	const handleDelete = async () => {
		try {
			await deleteBlogById(id)
			history.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='publish-edited-blog-page'>
			<Navbar>
				<Button onPress={handleDelete} variant='negative' isQuiet>
					Delete
				</Button>
				<Button
					onPress={() => {
						history.push(`/blogs/edit/${id}`)
					}}
					marginX='size-150'
					variant='primary'>
					Edit blog
				</Button>
			</Navbar>
			<Container size='small'>
				<div className='publish-edited-blog-page__inner'>
					<Flex gap='size-1000'>
						<div className='blog-preview-wrapper'>
							<BlogPreview
								title={title}
								setTitle={setTitle}
								description={description}
								setDescription={setDescription}
								thumbnail={thumbnail}
								setThumbnail={setThumbnail}
							/>
						</div>
						<div className='blog-publish-actions-wrapper'>
							<p>Author: {`${user?.firstName} ${user?.lastName}`}</p>
							<Button onPress={handlePublish} variant='cta'>
								Save
							</Button>
						</div>
					</Flex>
				</div>
			</Container>
		</div>
	)
}

export default PublishEditedBlog
