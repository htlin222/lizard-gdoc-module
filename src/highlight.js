/**
 * Highlight functions for Google Docs add-on
 */

/**
 * Highlights all occurrences of the search text in the document.
 * @param {string} searchText - The text to highlight
 * @return {Object} Response object with success status, message, and count
 */
function highlightText(searchText) {
	try {
		const doc = DocumentApp.getActiveDocument();
		const body = doc.getBody();

		// Find and highlight all occurrences
		let count = 0;
		let searchResult = body.findText(searchText);

		while (searchResult) {
			const element = searchResult.getElement();
			const startOffset = searchResult.getStartOffset();
			const endOffset = searchResult.getEndOffsetInclusive();

			// Apply yellow highlight
			if (element.editAsText) {
				element
					.editAsText()
					.setBackgroundColor(startOffset, endOffset, "#ffff00");
			}

			count++;
			searchResult = body.findText(searchText, searchResult);
		}

		if (count === 0) {
			return {
				success: true,
				message: "No occurrences found to highlight",
				count: 0,
			};
		}

		return {
			success: true,
			message: `Highlighted ${count} occurrence(s)`,
			count: count,
		};
	} catch (error) {
		console.error("Error in highlightText:", error);
		return {
			success: false,
			message: `Error: ${error.toString()}`,
			count: 0,
		};
	}
}

/**
 * Removes all highlights (yellow background) from the document.
 * @return {Object} Response object with success status and message
 */
function removeAllHighlights() {
	try {
		const doc = DocumentApp.getActiveDocument();
		const body = doc.getBody();
		const text = body.editAsText();

		// Remove background color from entire document
		text.setBackgroundColor(null);

		return {
			success: true,
			message: "All highlights removed",
		};
	} catch (error) {
		console.error("Error in removeAllHighlights:", error);
		return {
			success: false,
			message: `Error: ${error.toString()}`,
		};
	}
}

/**
 * Removes highlights only for specific text occurrences.
 * @param {string} searchText - The text to remove highlights from
 * @return {Object} Response object with success status, message, and count
 */
function removeHighlightForText(searchText) {
	try {
		const doc = DocumentApp.getActiveDocument();
		const body = doc.getBody();

		let count = 0;
		let searchResult = body.findText(searchText);

		while (searchResult) {
			const element = searchResult.getElement();
			const startOffset = searchResult.getStartOffset();
			const endOffset = searchResult.getEndOffsetInclusive();

			// Remove highlight (set background to null/transparent)
			if (element.editAsText) {
				element.editAsText().setBackgroundColor(startOffset, endOffset, null);
			}

			count++;
			searchResult = body.findText(searchText, searchResult);
		}

		return {
			success: true,
			message: `Removed highlights from ${count} occurrence(s)`,
			count: count,
		};
	} catch (error) {
		console.error("Error in removeHighlightForText:", error);
		return {
			success: false,
			message: `Error: ${error.toString()}`,
			count: 0,
		};
	}
}
