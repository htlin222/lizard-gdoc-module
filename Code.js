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
    .addItem('Open Sidebar', 'showSidebar')
    .addToUi();
}

/**
 * Opens the sidebar in the Google Docs editor.
 */
function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('sidebar')
    .setTitle('My Add-on')
    .setWidth(300);
  
  DocumentApp.getUi().showSidebar(html);
}

/**
 * Example function that can be called from the sidebar.
 * @param {string} text - The text from the input field
 * @return {Object} Response object with success status and message
 */
function processText(text) {
  try {
    // Add your text processing logic here
    console.log('Received text:', text);
    
    // Example: Insert text at cursor position
    const doc = DocumentApp.getActiveDocument();
    const cursor = doc.getCursor();
    
    if (cursor) {
      cursor.insertText(text);
    } else {
      // If no cursor, append to the end of the document
      doc.getBody().appendParagraph(text);
    }
    
    return {
      success: true,
      message: 'Text processed successfully'
    };
  } catch (error) {
    console.error('Error processing text:', error);
    return {
      success: false,
      message: 'Error: ' + error.toString()
    };
  }
}