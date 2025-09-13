/**
 * UI management functions for Google Docs add-on
 */

/**
 * Opens the sidebar in the Google Docs editor.
 */
function showSidebar() {
	const html = HtmlService.createHtmlOutputFromFile("sidebar")
		.setTitle("Search & Replace")
		.setWidth(350);

	DocumentApp.getUi().showSidebar(html);
}
