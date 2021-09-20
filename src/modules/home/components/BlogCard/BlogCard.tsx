import Avatar from 'react-avatar'
import { Blog } from '../../../blogs/services/blogs.service'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

import './BlogCard.scss'
import { useHistory } from 'react-router'

dayjs.extend(relativeTime)

interface Props {
	id: string
}

const BlogCard: React.FC<Props & Blog> = props => {
	const now = new Date()

	const history = useHistory()

	return (
		<div className='blog-card'>
			<div className='blog-card__left-side'>
				<div className='blog-card__author'>
					<div className='blog-card__author-avatar'>
						<Avatar
							color='black'
							size='20px'
							round='4px'
							name={`${props.author.firstName} ${props.author.lastName}`}
						/>
					</div>
					<div className='blog-card__author-name'>{`${props.author.firstName} ${props.author.lastName}`}</div>
				</div>
				<p
					onClick={() => history.push(`/blogs/${props.id}`)}
					className='blog-card__title'>
					{props.title}
				</p>
				<p className='blog-card__description'>{props.description}</p>
				<p>
					{dayjs().to(
						dayjs(props.createdAt).subtract(now.getTimezoneOffset(), 'minute')
					)}
				</p>
			</div>
			<div className='blog-card__right-side'>
				<img
					onClick={() => history.push(`/blogs/${props.id}`)}
					src={props.thumbnail}
					alt=''
				/>
			</div>
		</div>
	)
}

export default BlogCard
