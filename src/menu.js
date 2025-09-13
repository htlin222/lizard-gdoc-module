/**
 * Menu management functions for Google Docs add-on
 */

/**
 * Creates a menu entry in the Google Docs Add-on menu.
 * This function runs automatically when the add-on is installed.
 */
function onInstall(e) {
	onOpen(e);
}

/**
 * Creates a menu entry in the Google Docs Add-on menu.
 * This function runs automatically when the document is opened.
 */
function onOpen(e) {
	DocumentApp.getUi()
		.createAddonMenu()
		.addItem("Open Sidebar", "showSidebar")
		.addToUi();
}
