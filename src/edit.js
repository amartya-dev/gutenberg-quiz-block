/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Dependencies for building the UI for the block
 *
 * @see https://wordpress.github.io/gutenberg/?path=/docs/docs-introduction--page
 */
import { Button, TextControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * A utility function to generate a range of numbers with start, stop and step
 */
const range = ( start, stop, step ) =>
	Array.from(
		{ length: ( stop - start ) / step + 1 },
		( _, i ) => start + i * step
	);

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	return (
		<div { ...useBlockProps() }>
			<TextControl
				label={ __( 'Your Question' ) }
				value={ attributes.question }
				onChange={ ( val ) => setAttributes( { question: val } ) }
			/>
			{ range( 0, attributes.numOptions - 1, 1 ).map(
				( optionNumber ) => {
					return (
						<div className="stack">
							<TextControl
								label={ __( 'Answer Option' ) }
								value={
									attributes.options[ optionNumber ].answer
								}
								onChange={ ( val ) => {
									let options = [ ...attributes.options ];
									options[ optionNumber ] = { answer: val };
									setAttributes( {
										options: options,
									} );
								} }
							/>
							<Button
								onClick={ () => {
									let options = [
										...attributes.options,
										{ answer: '' },
									];
									setAttributes( {
										numOptions: attributes.numOptions + 1,
										options: options,
									} );
								} }
								className="stack-button"
							>
								Add new
							</Button>
							<Button
								onClick={ () => {
									setAttributes( {
										answer: attributes.options[
											optionNumber
										].answer,
									} );
								} }
								className="stack-button"
							>
								Set Answer
							</Button>
							{ optionNumber !== 0 && (
								<Button
									onClick={ () => {
										let options = [ ...attributes.options ];
										options.splice(
											optionNumber,
											optionNumber
										);
										setAttributes( {
											numOptions:
												attributes.numOptions - 1,
											options: options,
										} );
									} }
									className="stack-button"
								>
									Delete Option
								</Button>
							) }
						</div>
					);
				}
			) }
		</div>
	);
}
