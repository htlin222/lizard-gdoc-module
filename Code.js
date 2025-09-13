/**
 * Main entry point for Google Docs Search & Replace Add-on
 * This file orchestrates all modules in the src/ directory
 */

// Note: Google Apps Script doesn't support ES6 imports
// All module functions are available globally when included in the project

/**
 * Creates a menu entry in the Google Docs Add-on menu.
 * This function runs automatically when the add-on is installed.
 * @see src/menu.js
 */
function onInstall(e) {
	onOpen(e);
}

/**
 * Creates a menu entry in the Google Docs Add-on menu.
 * This function runs automatically when the document is opened.
 * @see src/menu.js
 */
function onOpen(e) {
	DocumentApp.getUi()
		.createAddonMenu()
		.addItem("Open Sidebar", "showSidebar")
		.addToUi();
}

/**
 * Opens the sidebar in the Google Docs editor.
 * @see src/ui.js
 */
function showSidebar() {
	const html = HtmlService.createHtmlOutputFromFile("sidebar")
		.setTitle("Search & Replace")
		.setWidth(350);

	DocumentApp.getUi().showSidebar(html);
}

/**
 * Performs search and replace operation in the document.
 * @param {string} searchText - The text to search for
 * @param {string} replaceText - The text to replace with
 * @return {Object} Response object with success status, message, and count
 * @see src/search.js
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
 * Escapes special regex characters in a string.
 * @param {string} str - The string to escape
 * @return {string} The escaped string
 * @see src/utils.js
 */
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Gets the current document content (for future features).
 * @return {Object} Response with document content
 * @see src/search.js
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
 * @see src/search.js
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

/**
 * Gets the context around a found text occurrence.
 * @param {Element} element - The element containing the text
 * @param {number} startOffset - Start position of the found text
 * @param {number} endOffset - End position of the found text
 * @return {string} The context string
 * @see src/utils.js
 */
function getContext(element, startOffset, endOffset) {
	const text = element.asText().getText();
	const contextBefore = Math.max(0, startOffset - 20);
	const contextAfter = Math.min(text.length, endOffset + 20);

	return `...${text.substring(contextBefore, contextAfter)}...`;
}

/**
 * Highlights all occurrences of the search text in the document.
 * @param {string} searchText - The text to highlight
 * @return {Object} Response object with success status, message, and count
 * @see src/highlight.js
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
 * @see src/highlight.js
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
 * @see src/highlight.js
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
