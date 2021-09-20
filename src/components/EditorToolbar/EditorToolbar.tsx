import { Flex } from '@react-spectrum/layout'
import React from 'react'

import './EditorToolbar.scss'

interface Props {
	children: React.ReactNode
	className?: string
}

const EditorToolbar = React.forwardRef<HTMLDivElement, Props>(
	({ children, className }, ref) => {
		return (
			<div className={`editor-toolbar ${className}`} ref={ref}>
				<Flex justifyContent='center' alignItems='center' gap='size-2000'>
					{children}
				</Flex>
			</div>
		)
	}
)
export default EditorToolbar
