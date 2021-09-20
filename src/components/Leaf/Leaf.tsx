import { CSSProperties } from 'react'
import { Transforms } from 'slate'
import { useSlate } from 'slate-react'
import './Leaf.scss'

const Leaf: React.FC<any> = props => {
	const style: CSSProperties = {
		position: props.leaf.placeholder ? 'relative' : 'initial',
		fontWeight: props.leaf.bold ? 'bold' : 'initial',
		fontStyle: props.leaf.italic ? 'italic' : 'initial',
	}

	const editor = useSlate()

	function handleClickPlaceholder() {
		if (props.leaf.isTitle) {
			Transforms.select(editor, {
				anchor: { path: [0, 0], offset: 0 },
				focus: { path: [0, 0], offset: 0 },
			})
		} else {
			Transforms.select(editor, {
				anchor: { path: [1, 0], offset: 0 },
				focus: { path: [1, 0], offset: 0 },
			})
		}
	}

	return (
		<span
			{...props.attributes}
			className={`editor-leaf ${props.leaf.fontSize}`}
			style={style}>
			{props.children}
			{props.leaf.placeholder && (
				<div
					onClick={handleClickPlaceholder}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '300px',
						userSelect: 'none',
						cursor: 'text',
						opacity: 0.3,
					}}
					contentEditable='false'>
					{props.leaf.isTitle ? 'Title' : 'Tell your story...'}
				</div>
			)}
		</span>
	)
}

export default Leaf
