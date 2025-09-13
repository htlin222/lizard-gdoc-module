# Google Docs Search & Replace Add-on Configuration

## Project Structure

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
└── README.md            # Project documentation
```

## Core Features

### Search & Replace Operations

- **Batch Processing**: TOML-format rules for multiple replacements
- **Context Tracking**: 20-character context display for found text
- **Error Handling**: Comprehensive error reporting and logging
- **Progress Tracking**: Rule-by-rule navigation and completion status

### Text Highlighting

- **Visual Feedback**: Yellow highlighting for search terms
- **Selective Removal**: Remove highlights by specific text or all at once
- **Real-time Updates**: Immediate visual feedback during operations

### User Interface

- **Accordion Design**: Collapsible sections for better space management
- **TOML Parser**: Simple syntax for defining replacement rules
- **Navigation Controls**: Previous/Next buttons for rule management
- **Status Tracking**: Visual indicators for processed vs pending rules

## File Extensions & Conventions

- Use `.js` extension for Google Apps Script files (not `.gs`)
- Modular organization in `src/` directory
- HTML files use `.html` extension
- camelCase for function names
- JSDoc comments for all exported functions

## Google Apps Script Configuration

- **Runtime**: V8 engine for modern JavaScript support
- **OAuth Scopes**:
  - `documents.currentonly` - Access to current document only
  - `script.container.ui` - UI creation and management
- **Exception Logging**: Stackdriver for error tracking
- **Time Zone**: America/New_York (configurable)

## Development Notes

- No ES6 imports (Google Apps Script limitation)
- All functions globally available when included
- Use `HtmlService` for sidebar creation
- `DocumentApp` API for document manipulation
- Regex escaping for special characters in search terms
