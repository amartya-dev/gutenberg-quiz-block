/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<div className="quiz-container" id="quiz-container">
				<div id="question">{ attributes.question }</div>
				<div id="answer" style={ { display: 'none' } }>
					{ attributes.answer }
				</div>
				{ attributes.options.map( ( option ) => {
					return <div className="answer">{ option.answer }</div>;
				} ) }
			</div>
			<div id="correct" style={ { display: 'none' } } className="correct">
				Your answer is correct
			</div>
			<div id="wrong" style={ { display: 'none' } } className="wrong">
				Your answer is wrong
			</div>
		</div>
	);
}
