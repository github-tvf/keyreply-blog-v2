import './Container.scss'

interface Props {
	size?: 'small' | 'medium' | 'large' | 'full'
	children: React.ReactNode
}

const Container: React.FC<Props> = ({ size, children }) => {
	return (
		<div className='container'>
			<div className={`container-${size}`}>{children}</div>
		</div>
	)
}

Container.defaultProps = {
	size: 'medium',
}

export default Container
