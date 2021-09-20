import Container from 'src/components/Container'
import AppEditor from 'src/components/AppEditor'
import Navbar from 'src/components/Navbar'

import { Button } from '@react-spectrum/button'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Descendant } from 'slate'
import { CustomElement } from 'src/slate'
import { useHistory, useParams } from 'react-router'
import { deleteBlogById, getBlogById } from '../../services/blogs.service'
import { UserContext } from 'src/App'
import './EditBlog.scss'

const EditBlog = () => {
	const history = useHistory()
	const { id } = useParams<{ id: string }>()

	const userContext = useContext(UserContext)
	const user = useMemo(() => userContext.user, [userContext.user])

	let initialValue: CustomElement[] = [
		{
			type: 'paragraph',
			children: [
				{
					text: '',
					isTitle: true,
					fontSize: 'large',
					bold: true,
				},
			],
		},
		{
			type: 'paragraph',
			children: [{ text: '' }],
		},
	]

	const [value, setValue] = useState<Descendant[]>(initialValue)

	useEffect(() => {
		async function fetchBlogById() {
			try {
				const response = await getBlogById(id)
				if (!response || response.authorId !== user?.id) {
					history.push('/')
					return
				}

				const oldContentEdited = localStorage.getItem('blog_content_edited')
				if (oldContentEdited) {
					setValue(JSON.parse(oldContentEdited))
				} else {
					setValue(JSON.parse(response.content))
				}
			} catch (error) {
				console.log(error)
			}
		}

		fetchBlogById()
	}, [history, id, user?.id])

	const handlePublish = () => {
		localStorage.setItem('blog_content_edited', JSON.stringify(value))
		history.push(`/blogs/edit/${id}/publish`)
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
		<div className='edit-blog-page'>
			<Navbar>
				<Button onPress={handleDelete} variant='negative' isQuiet>
					Delete
				</Button>
				<Button onPress={handlePublish} marginX='size-150' variant='primary'>
					Next
				</Button>
			</Navbar>
			<Container size='small'>
				<div className='editor-wrapper'>
					<AppEditor value={value} onChange={setValue} />
				</div>
			</Container>
		</div>
	)
}

export default EditBlog
