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
