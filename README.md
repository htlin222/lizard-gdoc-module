# Google Docs Search Replace

A Google Docs add-on that provides a simple sidebar interface for text input and document manipulation.

## Features

- Clean, modern UI with shadcn-style components
- Sidebar with text input field
- Insert text at cursor position or append to document
- Keyboard support (Enter to submit)
- Loading states and user feedback

## Installation

1. Open your Google Docs document
2. Go to Extensions → Apps Script
3. Copy the code from this repository
4. Save and run the `onOpen` function
5. Refresh your Google Docs document

## Usage

1. In your Google Docs document, go to Extensions → Your Add-on → Open Sidebar
2. Enter text in the input field
3. Click Submit or press Enter
4. The text will be inserted at your cursor position (or appended to the end if no cursor)

## Development

### Prerequisites

- [clasp](https://github.com/google/clasp) - Command Line Apps Script Projects
- Node.js and npm

### Setup

```bash
# Install clasp globally
npm install -g @google/clasp

# Login to Google
clasp login

# Clone this project
git clone https://github.com/yourusername/google-docs-search-replace.git
cd google-docs-search-replace

# Push to Google Apps Script
clasp push
```

### Project Structure

```
├── Code.js          # Main Apps Script file
├── sidebar.html     # Sidebar UI with shadcn styling
├── appsscript.json  # Apps Script manifest
├── .clasp.json      # Clasp configuration
├── CLAUDE.md        # Development notes
└── README.md        # This file
```

## Technologies

- Google Apps Script
- HTML/CSS/JavaScript
- shadcn-style UI components

## License

MIT
