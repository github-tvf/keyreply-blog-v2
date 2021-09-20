import Container from 'src/components/Container'
import Navbar from 'src/components/Navbar'
import { Button } from '@react-spectrum/button'
import { useContext, useMemo, useState } from 'react'
import { useHistory } from 'react-router'

import './PublishBlog.scss'
import { Flex } from '@react-spectrum/layout'
import BlogPreview from '../../components/BlogPreview'
import { UserContext } from 'src/App'
import { publishBlog } from '../../services/blogs.service'
import { CustomElement } from 'src/slate'

const PublishBlog = () => {
	const userContext = useContext(UserContext)
	const user = userContext.user
	const history = useHistory()
	const storageContent = useMemo(() => localStorage.getItem('blog_content'), [])
	if (!storageContent) {
		history.push('/blogs')
	}

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

	const handlePublish = async () => {
		try {
			await publishBlog({
				title: title || '',
				description,
				thumbnail,
				content: storageContent || '',
			})

			localStorage.removeItem('blog_content')
			history.push('/')
		} catch (error: any) {
			const errorResponse = error.response.json()

			console.log(errorResponse)
		}
	}

	return (
		<div className='publish-blog-page'>
			<Navbar>
				<Button
					onPress={() => {
						history.push('/blogs')
					}}
					marginX='size-150'
					variant='primary'>
					Edit blog
				</Button>
			</Navbar>
			<Container size='small'>
				<div className='publish-blog-page__inner'>
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
								Publish now
							</Button>
						</div>
					</Flex>
				</div>
			</Container>
		</div>
	)
}

export default PublishBlog
