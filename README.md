![GitHub stars](https://img.shields.io/github/stars/htlin222/lizard-gdoc-module?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/htlin222/lizard-gdoc-module?style=flat-square)
![License](https://img.shields.io/github/license/htlin222/lizard-gdoc-module?style=flat-square)

# Google Docs Search & Replace Add-on

A powerful Google Docs add-on that provides batch search and replace functionality with TOML-format rules, text highlighting, and an intuitive sidebar interface.

## Features

### Core Functionality

- **Batch Search & Replace**: Process multiple search/replace rules in sequence using TOML syntax
- **Text Highlighting**: Visual feedback with yellow highlighting for search terms
- **Progress Tracking**: Navigate through rules with Previous/Next buttons and completion status
- **Context Display**: 20-character context preview for found text occurrences
- **Error Handling**: Comprehensive error reporting and logging

### User Interface

- **Modern Design**: Clean, shadcn-style components with accordion layout
- **TOML Parser**: Simple `"search" = "replace"` syntax for defining rules
- **Interactive Controls**: Edit/delete individual rules, skip or replace operations
- **Real-time Feedback**: Loading states, success/error messages, and progress indicators
- **Keyboard Support**: Ctrl+Enter to parse rules

### Advanced Features

- **Selective Highlighting**: Toggle highlights on/off for current rule
- **Rule Management**: Edit and delete individual rules after parsing
- **Batch Processing**: Process all rules automatically or step through manually
- **Occurrence Counting**: Shows exact number of matches before replacement

## Installation

1. Open your Google Docs document
2. Go to Extensions → Apps Script
3. Copy the code from this repository into your Apps Script project
4. Save and run the `onOpen` function to create the menu
5. Refresh your Google Docs document

## Usage

### Basic Usage

1. In your Google Docs document, go to Extensions → Add-ons → Search & Replace → Open Sidebar
2. Enter your search and replace rules using TOML format:
   ```toml
   "old text" = "new text"
   "another search" = "another replace"
   "fix typo" = "corrected text"
   ```
3. Click **Parse Rules** to load your rules
4. Use **Previous/Next** to navigate through rules
5. Click **Replace** to apply the current rule or **Skip** to move to the next

### Advanced Features

- **Highlight Toggle**: Enable highlighting to visually see search terms before replacing
- **Rule Editing**: Click the ✏️ icon to edit individual rules
- **Rule Deletion**: Click the 🗑️ icon to remove unwanted rules
- **Batch Processing**: Rules are processed in order with automatic progression

## Development

### Prerequisites

- [clasp](https://github.com/google/clasp) - Command Line Apps Script Projects
- Node.js and pnpm

### Setup

```bash
# Install clasp globally
pnpm add -g @google/clasp

# Login to Google
clasp login

# Clone this project
git clone <repository-url>
cd lizard-doc-module

# Initialize Google Apps Script project
clasp create --type standalone --title "Google Docs Search Replace"

# Push to Google Apps Script
clasp push
```

### Project Structure

```
├── Code.js              # Main entry point and function exports
├── src/
│   ├── menu.js          # Menu creation functions
│   ├── ui.js            # UI management functions
│   ├── search.js        # Search and replace operations
│   ├── highlight.js     # Text highlighting functions
│   └── utils.js         # Utility functions
├── sidebar.html         # Sidebar UI with TOML parser
├── appsscript.json      # Apps Script manifest
├── .clasp.json          # Clasp configuration
├── .gitignore           # Git ignore rules
├── CLAUDE.md            # Development configuration
└── README.md            # This file
```

### API Functions

- `searchAndReplace(searchText, replaceText)` - Performs search and replace
- `highlightText(searchText)` - Highlights all occurrences of search text
- `removeAllHighlights()` - Removes all highlights from document
- `removeHighlightForText(searchText)` - Removes highlights for specific text
- `findOccurrences(searchText)` - Returns detailed occurrence information
- `getDocumentContent()` - Gets document content and word count

## Technologies

- **Google Apps Script** - Server-side JavaScript runtime
- **DocumentApp API** - Google Docs document manipulation
- **HtmlService** - Sidebar UI creation
- **Modern JavaScript** - ES6+ features with V8 runtime
- **TOML Parsing** - Simple configuration syntax
- **CSS Grid/Flexbox** - Responsive layout design

## Configuration

### OAuth Scopes

- `https://www.googleapis.com/auth/documents.currentonly` - Access to current document only
- `https://www.googleapis.com/auth/script.container.ui` - UI creation and management

### Runtime Settings

- **Engine**: V8 for modern JavaScript support
- **Exception Logging**: Stackdriver integration
- **Time Zone**: Configurable (default: America/New_York)

## License

MIT License - see LICENSE file for details
