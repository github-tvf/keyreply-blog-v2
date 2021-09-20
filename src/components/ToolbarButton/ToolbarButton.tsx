import './ToolbarButton.scss'

interface Props {
	children: React.ReactNode
	onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const ToolbarButton: React.FC<Props> = ({ children, onClick }) => {
	return (
		<div className='toolbar-button' onMouseDown={onClick}>
			{children}
		</div>
	)
}

ToolbarButton.defaultProps = {
	onClick: () => {},
}

export default ToolbarButton
