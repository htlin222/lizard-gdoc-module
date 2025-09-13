/**
 * Search and replace functions for Google Docs add-on
 */

/**
 * Performs search and replace operation in the document.
 * @param {string} searchText - The text to search for
 * @param {string} replaceText - The text to replace with
 * @return {Object} Response object with success status, message, and count
 */
function searchAndReplace(searchText, replaceText) {
	try {
		const doc = DocumentApp.getActiveDocument();
		const body = doc.getBody();

		// Count occurrences before replacement
		let count = 0;
		let searchResult = body.findText(searchText);

		while (searchResult) {
			count++;
			searchResult = body.findText(searchText, searchResult);
		}

		if (count === 0) {
			return {
				success: true,
				message: "No occurrences found",
				count: 0,
			};
		}

		// Perform the replacement
		body.replaceText(escapeRegex(searchText), replaceText);

		return {
			success: true,
			message: `Successfully replaced ${count} occurrence(s)`,
			count: count,
		};
	} catch (error) {
		console.error("Error in searchAndReplace:", error);
		return {
			success: false,
			message: `Error: ${error.toString()}`,
			count: 0,
		};
	}
}

/**
 * Gets the current document content (for future features).
 * @return {Object} Response with document content
 */
function getDocumentContent() {
	try {
		const doc = DocumentApp.getActiveDocument();
		const body = doc.getBody();
		const text = body.getText();

		return {
			success: true,
			content: text,
			wordCount: text.split(/\s+/).filter((word) => word.length > 0).length,
		};
	} catch (error) {
		console.error("Error getting document content:", error);
		return {
			success: false,
			message: `Error: ${error.toString()}`,
		};
	}
}

/**
 * Finds all occurrences of a search term (for future features).
 * @param {string} searchText - The text to search for
 * @return {Object} Response with occurrence details
 */
function findOccurrences(searchText) {
	try {
		const doc = DocumentApp.getActiveDocument();
		const body = doc.getBody();
		const occurrences = [];

		let searchResult = body.findText(searchText);

		while (searchResult) {
			const element = searchResult.getElement();
			const startOffset = searchResult.getStartOffset();
			const endOffset = searchResult.getEndOffsetInclusive();

			occurrences.push({
				text: element
					.asText()
					.getText()
					.substring(startOffset, endOffset + 1),
				context: getContext(element, startOffset, endOffset),
			});

			searchResult = body.findText(searchText, searchResult);
		}

		return {
			success: true,
			count: occurrences.length,
			occurrences: occurrences,
		};
	} catch (error) {
		console.error("Error finding occurrences:", error);
		return {
			success: false,
			message: `Error: ${error.toString()}`,
		};
	}
}
