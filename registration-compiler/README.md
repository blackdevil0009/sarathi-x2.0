# Sarthi-X Registration Compiler

Sarthi-X Registration Compiler is a Node.js mini compiler that translates a custom registration language (`.sx`) into a modern student registration HTML page. The project teaches compiler architecture through practical frontend code generation.

## Project Structure

```
Sarthi-X/
│
├── compiler/
│   ├── lexer.js
│   ├── parser.js
│   ├── semanticAnalyzer.js
│   ├── generator.js
│   ├── ast.js
│   ├── tokenTypes.js
│   └── compiler.js
│
├── input/
│   └── registration.sx
│
├── output/
│   └── register.html
│
├── package.json
└── README.md
```

## Language Syntax

A `.sx` file is built from registration commands:

- `PAGE <name>`
- `TITLE "..."`
- `SUBTITLE "..."`
- `FULL_NAME`
- `EMAIL`
- `PHONE`
- `STUDENT_ID`
- `PASSWORD`
- `CONFIRM_PASSWORD`
- `GENDER`
- `DATE_OF_BIRTH`
- `COURSE`
- `YEAR`
- `TERMS_CHECKBOX true|false`
- `BUTTON "..."`
- `THEME <dark|light>`
- `BACKGROUND <gradient|solid>`

Example:

```sx
PAGE StudentRegistration
TITLE "Sarthi-X Registration"
SUBTITLE "Create Your Student Account"
FULL_NAME
EMAIL
PHONE
STUDENT_ID
PASSWORD
CONFIRM_PASSWORD
GENDER
DATE_OF_BIRTH
COURSE
YEAR
TERMS_CHECKBOX true
BUTTON "Register Now"
THEME dark
BACKGROUND gradient
```

## Compiler Phases

### 1. Lexer
The lexer reads `.sx` source text line-by-line, removes whitespace, and produces tokens for:

- `KEYWORD`
- `STRING`
- `BOOLEAN`
- `IDENTIFIER`

The lexer also tracks line numbers for diagnostics and unknown keyword detection.

### 2. Parser
The parser converts tokens into an Abstract Syntax Tree (AST). It validates per-command syntax and ensures commands with arguments receive the right type.

### 3. AST
AST nodes represent semantic program structure. Example:

```js
{ type: "BUTTON_NODE", value: "Register Now", line: 14 }
```

### 4. Semantic Analyzer
The semantic analyzer checks business rules:

- `PAGE` must exist and be first.
- `BUTTON` must exist.
- `TITLE` cannot be duplicated.
- `PASSWORD` and `CONFIRM_PASSWORD` must both exist.
- Required registration fields must appear.
- Field ordering is validated for registration flow.

### 5. Code Generator
The generator converts AST data into a responsive HTML registration form. It uses a glassmorphism dark-blue theme with gradient background and smooth interactions.

## How to Run

Install dependencies (Node.js only) and run the compiler:

```bash
npm install
npm run build
```

Then open `output/register.html` in a browser.

## How to Extend the Language

To extend Sarthi-X Registration:

1. Add a new keyword to `compiler/tokenTypes.js`.
2. Recognize the keyword in `compiler/lexer.js`.
3. Add parse handling in `compiler/parser.js`.
4. Add AST node support in `compiler/ast.js`.
5. Update semantic validations in `compiler/semanticAnalyzer.js`.
6. Generate HTML for the new node in `compiler/generator.js`.
