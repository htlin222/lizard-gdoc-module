/**
 * Utility functions for Google Docs add-on
 */

/**
 * Escapes special regex characters in a string.
 * @param {string} str - The string to escape
 * @return {string} The escaped string
 */
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Gets the context around a found text occurrence.
 * @param {Element} element - The element containing the text
 * @param {number} startOffset - Start position of the found text
 * @param {number} endOffset - End position of the found text
 * @return {string} The context string
 */
function getContext(element, startOffset, endOffset) {
	const text = element.asText().getText();
	const contextBefore = Math.max(0, startOffset - 20);
	const contextAfter = Math.min(text.length, endOffset + 20);

	return `...${text.substring(contextBefore, contextAfter)}...`;
}
