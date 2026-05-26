import os
import subprocess
import sys
import tempfile
import re
from flask import current_app

DANGEROUS_PATTERN = re.compile(
    r"\b(import|from)\s+(os|sys|subprocess|socket|requests|urllib|multiprocessing|threading|ctypes|shlex|pathlib|platform|inspect|pkgutil|importlib)\b"
    r"|(__import__|eval\(|exec\(|compile\(|open\(|input\(|globals\(|locals\(|exit\(|quit\()",
    re.IGNORECASE,
)


def validate_code_request(code, language):
    if not code or not code.strip():
        return "Code is required"
    if len(code) > 10000:
        return "Code length exceeds allowed limit"
    if language != "python":
        return "Only Python language is supported at this time"
    if DANGEROUS_PATTERN.search(code):
        return "Code contains restricted imports or operations"
    return None


def execute_python_code(code):
    timeout = current_app.config["COMPILER_TIMEOUT_SECONDS"]
    max_output = current_app.config["COMPILER_MAX_OUTPUT"]
    with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False, encoding="utf-8") as source_file:
        source_file.write(code)
        source_path = source_file.name

    try:
        process = subprocess.run(
            [sys.executable, "-I", source_path],
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=os.path.dirname(source_path),
        )

        stdout = process.stdout[:max_output]
        stderr = process.stderr[:max_output]
        return {
            "exit_code": process.returncode,
            "stdout": stdout,
            "stderr": stderr,
            "timeout": False,
        }
    except subprocess.TimeoutExpired as exc:
        return {
            "exit_code": None,
            "stdout": exc.stdout or "",
            "stderr": "Execution timed out",
            "timeout": True,
        }
    finally:
        try:
            os.remove(source_path)
        except OSError:
            pass
