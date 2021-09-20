import { useEffect, useRef } from 'react'
import { Editor, Range, Text, Transforms } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import EditorToolbar from '../EditorToolbar'
import Portal from '../Portal'
import { FaBold, FaItalic } from 'react-icons/fa'
import { AiOutlineFontSize } from 'react-icons/ai'
import ToolbarButton from '../ToolbarButton'

const HoveringToolbar = () => {
	const ref = useRef<HTMLDivElement | null>(null)
	const editor = useSlate()

	useEffect(() => {
		const el = ref.current
		const { selection } = editor

		if (!el) {
			return
		}

		if (
			!selection ||
			!ReactEditor.isFocused(editor) ||
			Range.isCollapsed(selection) ||
			Editor.string(editor, selection) === ''
		) {
			el.removeAttribute('style')
			return
		}

		const domSelection = window.getSelection()
		if (!domSelection) {
			return
		}

		const domRange = domSelection.getRangeAt(0)
		const rect = domRange.getBoundingClientRect()
		el.style.opacity = '1'
		el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
		el.style.left = `${
			rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
		}px`
	})

	return (
		<Portal>
			<EditorToolbar ref={ref} className='editor-toolbar--hidden'>
				<ToolbarButton onClick={e => handleClick(e, 'bold', editor)}>
					<FaBold color='white' />
				</ToolbarButton>
				<ToolbarButton onClick={e => handleClick(e, 'italic', editor)}>
					<FaItalic color='white' />
				</ToolbarButton>
				<ToolbarButton onClick={e => handleClickFontSize(e, 'large', editor)}>
					<AiOutlineFontSize color='white' size='1.5em' />
				</ToolbarButton>
				<ToolbarButton onClick={e => handleClickFontSize(e, 'medium', editor)}>
					<AiOutlineFontSize color='white' />
				</ToolbarButton>
			</EditorToolbar>
		</Portal>
	)
}

const handleClick = (
	e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	format: string,
	editor: ReactEditor
) => {
	e.preventDefault()
	toggleFormat(editor, format)
}

const handleClickFontSize = (
	e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	fontSize: 'small' | 'medium' | 'large',
	editor: ReactEditor
) => {
	e.preventDefault()
	toggleFontSize(editor, fontSize)
}

const toggleFontSize = (
	editor: ReactEditor,
	fontSize: 'small' | 'medium' | 'large'
) => {
	const isActive = isFontSizeActive(editor, fontSize)
	Transforms.setNodes(
		editor,
		{ fontSize: isActive ? 'small' : fontSize },
		{ match: Text.isText, split: true }
	)
}

const isFontSizeActive = (editor: ReactEditor, fontSize: string) => {
	const [match] = Editor.nodes(editor, {
		match: n => (n as any).fontSize === fontSize,
		mode: 'all',
	})

	return !!match
}

const toggleFormat = (editor: ReactEditor, format: string) => {
	const isActive = isFormatActive(editor, format)
	Transforms.setNodes(
		editor,
		{ [format]: isActive ? null : true },
		{ match: Text.isText, split: true }
	)
}

const isFormatActive = (editor: ReactEditor, format: string) => {
	const [match] = Editor.nodes(editor, {
		match: n => (n as any)[format] === true,
		mode: 'all',
	})
	return !!match
}

export default HoveringToolbar
