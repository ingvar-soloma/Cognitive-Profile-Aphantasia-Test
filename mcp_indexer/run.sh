#!/bin/bash
# Очищаємо змінні середовища Python, щоб інтеграція з IDE не переписувала шляхи до бібліотек
unset PYTHONPATH
unset PYTHONHOME
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$DIR/venv/bin/python" "$DIR/mcp_server.py"
