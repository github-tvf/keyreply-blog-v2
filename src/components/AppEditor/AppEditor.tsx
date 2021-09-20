import { useCallback, useMemo } from 'react'
import {
	BaseRange,
	createEditor,
	Descendant,
	Editor,
	NodeEntry,
	Range,
	Text,
} from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import HoveringToolbar from '../HoveringToolbar'
import Leaf from '../Leaf'
import ParagraphElement from '../ParagraphElement'

const decorate: ((entry: NodeEntry) => BaseRange[]) | undefined = ([
	node,
	path,
]) => {
	const ranges: (Range & { placeholder: boolean; isTitle?: boolean })[] = []
	if (!Editor.isEditor(node) && Text.isText(node)) {
		if ((path[0] === 0 || path[0] === 1) && path[1] === 0 && node.text === '') {
			ranges.push({
				anchor: { path, offset: 0 },
				focus: { path, offset: 0 },
				placeholder: true,
				isTitle: path[0] === 0 ? true : false,
			})
		}
	}
	return ranges
}

interface Props {
	value: Descendant[]
	onChange: (value: Descendant[]) => void
}

const AppEditor: React.FC<Props> = ({ value, onChange }) => {
	const editor = useMemo(() => withReact(createEditor()), [])

	const renderLeaf = useCallback(props => {
		return <Leaf {...props} />
	}, [])

	const renderElement = useCallback(props => {
		switch (props.element.type) {
			default:
				return <ParagraphElement {...props} />
		}
	}, [])

	return (
		<Slate editor={editor} value={value} onChange={onChange}>
			<HoveringToolbar />
			<Editable
				decorate={decorate}
				renderLeaf={renderLeaf}
				renderElement={renderElement}
			/>
		</Slate>
	)
}

export default AppEditor
