import Container from 'src/components/Container'
import AppEditor from 'src/components/AppEditor'
import Navbar from 'src/components/Navbar'

import './CreateBlog.scss'
import { Button } from '@react-spectrum/button'
import { useMemo, useState } from 'react'
import { Descendant } from 'slate'
import { CustomElement } from 'src/slate'
import { useHistory } from 'react-router'

const CreateBlog = () => {
	const history = useHistory()
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

	const storageContent = useMemo(() => localStorage.getItem('blog_content'), [])
	if (storageContent) {
		initialValue = JSON.parse(storageContent)
	}

	const [value, setValue] = useState<Descendant[]>(initialValue)

	const handlePublish = () => {
		localStorage.setItem('blog_content', JSON.stringify(value))
		history.push('/blogs/publish')
	}

	return (
		<div className='create-blog-page'>
			<Navbar>
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

export default CreateBlog
