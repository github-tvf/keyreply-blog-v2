import { Flex } from '@react-spectrum/layout'
import { useRef } from 'react'
import { BACKEND_URL } from 'src/helpers/endpoints'
import { uploadThumbnail } from '../../services/blogs.service'
import './BlogPreview.scss'

interface Props {
	thumbnail?: string
	title?: string
	description?: string
	setTitle?: (value: string) => void
	setDescription?: (value: string) => void
	setThumbnail?: (value: string) => void
}

const BlogPreview: React.FC<Props> = props => {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleInputFileChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const formData = new FormData()
		if (e.target.files) {
			for (const file of e.target.files) {
				formData.append('file', file)
			}
		}

		try {
			const response = await uploadThumbnail(formData)

			if (props.setThumbnail) {
				props.setThumbnail(BACKEND_URL + '/public/' + response.fileName)
			}
		} catch (error: any) {
			const errorResponse = await error.response.json()
			console.log(errorResponse)
		}
	}

	return (
		<div className='blog-preview'>
			<h3 className='blog-preview__title'>Blog Preview</h3>
			<input
				onChange={handleInputFileChange}
				ref={fileInputRef}
				className='blog-preview__input'
				type='file'
				id='blog-preview-input'
			/>
			<div
				onClick={() => fileInputRef.current?.click()}
				className='blog-preview__input-label'>
				{!props.thumbnail ? (
					<Flex
						justifyContent='center'
						alignItems='center'
						width='100%'
						height='100%'>
						<span className='blog-preview__input-label-text'>
							Upload a high-quality image in your story to make it more inviting
							to readers.
						</span>
					</Flex>
				) : (
					<img src={props.thumbnail} alt='' />
				)}
			</div>
			<input
				onChange={e => {
					if (props.setTitle) {
						props.setTitle(e.target.value)
					}
				}}
				value={props.title}
				className='blog-preview__title-input'
				placeholder='Title'
				type='text'
			/>
			<input
				onChange={e => {
					if (props.setDescription) {
						props.setDescription(e.target.value)
					}
				}}
				value={props.description}
				className='blog-preview__description-input'
				placeholder='Description'
				type='text'
			/>
		</div>
	)
}

BlogPreview.defaultProps = {
	setTitle: () => {},
	setDescription: () => {},
	setThumbnail: () => {},
}

export default BlogPreview
