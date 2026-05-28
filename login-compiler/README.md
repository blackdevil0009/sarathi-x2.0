# Sarthi-X Login Compiler

Sarthi-X Login Compiler is a Node.js mini compiler that translates a custom login language (`.sx`) into a modern student login HTML page.

## Project Structure

```
login-compiler/
├── compiler/
│   ├── lexer.js
│   ├── parser.js
│   ├── semanticAnalyzer.js
│   ├── generator.js
│   ├── ast.js
│   ├── tokenTypes.js
│   └── compiler.js
├── input/
│   └── login.sx
├── output/
│   └── index.html
├── package.json
└── README.md
```

## Language Syntax

A `.sx` file is built from login commands:

- `PAGE <name>`
- `TITLE "..."`
- `SUBTITLE "..."`
- `STUDENT_ID`
- `PASSWORD`
- `BUTTON "..."`
- `REMEMBER_ME true|false`
- `FORGOT_PASSWORD true|false`
- `THEME <dark|light>`
- `BACKGROUND <gradient|solid>`

## How to Run

```bash
npm install
npm run build
```

Open `output/index.html` in a browser.
