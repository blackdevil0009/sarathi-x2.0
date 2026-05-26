<<<<<<< HEAD
# Flask MySQL Backend

## Overview

This backend provides:
- User registration with secure Gmail validation and ID upload
- Login with JWT authentication
- Python code execution endpoint
- MySQL database support with SQLAlchemy
- Modular Flask structure using Blueprints

## Setup

1. Create a virtual environment and install dependencies:

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

2. Create a `.env` file from `.env.example` and set your database credentials.

3. Install dependencies if not already installed:

```bash
pip install -r requirements.txt
```

4. Run the app:

```bash
python app.py
```

## Endpoints

### Register

`POST /api/auth/register`

Form fields:
- `full_name`
- `mobile`
- `gmail`
- `course`
- `address`
- `parent_contact` (required for minors)
- `password`
- `confirm_password`
- `terms_accepted`
- `id_file` (file upload)

### Login

`POST /api/auth/login`

JSON body:
- `gmail`
- `password`

Response returns `access_token`.

### Code Execution

`POST /api/compiler/execute`

Headers:
- `Authorization: Bearer <token>`

JSON body:
- `language`: `python`
- `code`: source code string

## Notes

- Uploaded files are stored under `uploads/ids`
- Passwords are hashed using Werkzeug's secure PBKDF2 method
- Code execution is restricted to Python and timed out after 5 seconds
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> b7ecbc6 (Frontend added)
