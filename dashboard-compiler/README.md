# Sarthi-X Dashboard Compiler

Sarthi-X Dashboard Compiler is a Node.js educational compiler project that transforms a custom dashboard DSL (`.sx`) into a fully functional student dashboard webpage.

## Project Structure

```
Sarthi-X/
├── compiler/
│   ├── lexer.js
│   ├── parser.js
│   ├── semanticAnalyzer.js
│   ├── ast.js
│   ├── generator.js
│   ├── tokenTypes.js
│   └── compiler.js
├── input/
│   └── dashboard.sx
├── output/
│   ├── dashboard.html
│   ├── style.css
│   └── app.js
├── package.json
└── README.md
```

## Compiler Architecture

The compiler implements the following core phases:

- **Lexical Analysis** (`compiler/lexer.js`)
  - Reads `.sx` input line by line
  - Converts each line into tokens
  - Recognizes keywords, strings, and identifiers
  - Ignores whitespace and empty lines

- **Parsing** (`compiler/parser.js`)
  - Converts tokens into AST nodes
  - Builds a structured dashboard representation
  - Handles block constructs like `SIDEBAR`, `CARDS`, and `PROFILE_SECTION`

- **AST** (`compiler/ast.js`)
  - Defines node types used by parser and generator
  - Produces nested objects for each dashboard component

- **Semantic Analysis** (`compiler/semanticAnalyzer.js`)
  - Validates required elements
  - Ensures correct block structure
  - Emits clear errors with line numbers

- **Code Generation** (`compiler/generator.js`)
  - Generates `dashboard.html`, `style.css`, and `app.js`
  - Produces a modern responsive dashboard UI
  - Includes sidebar toggle, theme switching, and hover animations

## DSL Syntax

The dashboard DSL supports:

- `PAGE <name>`
- `TITLE "..."`
- `WELCOME_MESSAGE "..."`
- `SIDEBAR`
  - `MENU "..."`
- `CARDS`
  - `CARD "..." "..."`
- `PROFILE_SECTION`
  - `PROFILE_NAME "..."`
  - `PROFILE_ID "..."`
- `THEME <dark|light>`
- `LAYOUT <modern|classic>`

### Example

```sx
PAGE StudentDashboard
TITLE "Student Dashboard"
WELCOME_MESSAGE "Welcome, Student"
SIDEBAR
MENU "Home"
MENU "Profile"
MENU "Attendance"
MENU "Results"
MENU "Settings"
CARDS
CARD "Attendance" "85%"
CARD "Assignments" "5 Pending"
CARD "Grades" "A Grade"
PROFILE_SECTION
PROFILE_NAME "John Doe"
PROFILE_ID "STU12345"
THEME dark
LAYOUT modern
```

## AST Structure

The AST is an array of nodes such as:

- `PAGE_NODE`
- `TITLE_NODE`
- `WELCOME_MESSAGE_NODE`
- `SIDEBAR_NODE` with child `MENU_NODE`s
- `CARDS_NODE` with child `CARD_NODE`s
- `PROFILE_SECTION_NODE` with `PROFILE_NAME_NODE` and `PROFILE_ID_NODE`
- `THEME_NODE`
- `LAYOUT_NODE`

Each node contains a `line` number for error reporting.

## How It Works

1. `compiler/compiler.js` reads `input/dashboard.sx`.
2. The lexer tokenizes each line.
3. The parser converts tokens into the AST.
4. The semantic analyzer validates dashboard structure.
5. The generator emits HTML, CSS, and JS files.
6. Output is written to `output/dashboard.html`, `output/style.css`, and `output/app.js`.

## Running the Project

```bash
npm install
npm run build
```

Then open `output/dashboard.html` in a browser.

## Extending the DSL

To add new dashboard components:

1. Add a new keyword to `compiler/tokenTypes.js`.
2. Add parsing logic in `compiler/parser.js`.
3. Add a new AST node type in `compiler/ast.js`.
4. Add validation rules in `compiler/semanticAnalyzer.js`.
5. Add rendering logic in `compiler/generator.js`.

This modular design makes it easy to extend the dashboard compiler with widgets, tables, charts, and new layout patterns.
