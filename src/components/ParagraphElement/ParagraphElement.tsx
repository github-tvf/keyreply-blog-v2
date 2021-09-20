const ParagraphElement: React.FC<any> = props => {
	return <p {...props.attributes}>{props.children}</p>
}

export default ParagraphElement
