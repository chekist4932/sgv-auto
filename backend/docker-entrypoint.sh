set -e

echo "Применение Alembic миграций"
alembic upgrade head

echo "Запуск FastAPI-приложения"
exec uvicorn sgv_auto.main:app --host 0.0.0.0 --port 8000 --reload --proxy-headers