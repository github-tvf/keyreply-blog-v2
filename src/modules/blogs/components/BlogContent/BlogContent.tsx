import Avatar from 'react-avatar'
import { Blog } from '../../services/blogs.service'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './BlogContent.scss'
import { CustomElement } from 'src/slate'
import { Descendant, Text } from 'slate'

dayjs.extend(relativeTime)

interface Props {
	id: string
}

const serialize = (node: Descendant): string => {
	console.log(node)
	if (Text.isText(node)) {
		let string = node.text
		if (node.isTitle) {
			return ''
		}

		let classes = ''

		if (node.bold) {
			classes += 'bold '
		}

		if (node.italic) {
			classes += 'italic '
		}

		if (node.fontSize) {
			classes += node.fontSize
		}

		string = `<span class="${classes}">${string}</span>`
		return string
	}

	const children = node.children.map(n => serialize(n)).join('')

	switch (node.type) {
		case 'paragraph':
		default:
			return `<p>${children}</p>`
	}
}

const BlogContent: React.FC<Props & Blog> = ({
	title,
	description,
	author,
	createdAt,
	thumbnail,
	content,
}) => {
	const now = new Date()

	const elements: CustomElement[] = JSON.parse(content)

	console.log(elements)

	return (
		<div className='blog-content'>
			<div className='blog-content__title'>{title}</div>
			<div className='blog-content__description'>{description}</div>
			<div className='blog-content__author'>
				<div className='blog-content__author-avatar'>
					<Avatar
						size='55px'
						round
						color='black'
						name={`${author.firstName} ${author.lastName}`}
					/>
				</div>
				<div className='blog-content__author-blog-info'>
					<div className='blog-content__author-name'>
						{`${author.firstName} ${author.lastName}`}
					</div>
					<div className='blog-content__blog-post-date'>
						{dayjs().to(
							dayjs(createdAt).subtract(now.getTimezoneOffset(), 'minute')
						)}
					</div>
				</div>
			</div>
			<div className='blog-content__thumbnail'>
				<img src={thumbnail} alt='' />
			</div>
			<div
				className='blog-content__content'
				dangerouslySetInnerHTML={{
					__html: elements.map(e => serialize(e)).join(''),
				}}></div>
		</div>
	)
}

export default BlogContent
