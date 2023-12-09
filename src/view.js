/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

// Add an event listener to make sure we display the correct result when we click on answer
const answers = Array.from( document.getElementsByClassName( 'answer' ) );

answers.forEach( ( answer ) =>
	answer.addEventListener( 'click', function handleAnswerClick( event ) {
		const container = document.getElementById( 'quiz-container' );
		const correctDiv = document.getElementById( 'correct' );
		const wrongDiv = document.getElementById( 'wrong' );
		const correct = document.getElementById( 'answer' );

		if ( correct.innerText === answer.innerText ) {
			container.style.display = 'none';
			correctDiv.style.display = 'block';
		} else {
			container.style.display = 'none';
			wrongDiv.style.display = 'block';
		}

		setTimeout( () => {
			container.style.display = 'block';
			correctDiv.style.display = 'none';
			wrongDiv.style.display = 'none';
		}, 2000 );
	} )
);
