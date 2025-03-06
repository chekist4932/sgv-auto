FROM python:3.12-slim

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code

EXPOSE 8000

# Копируем и даём права на выполнение entrypoint
COPY docker-entrypoint.sh /code/docker-entrypoint.sh
RUN chmod +x /code/docker-entrypoint.sh

# Запускаем через entrypoint
ENTRYPOINT ["/code/docker-entrypoint.sh"]


# CMD ["sh", "-c", "alembic upgrade head && uvicorn src.main:app --host 0.0.0.0 --port 34000 --reload --proxy-headers"]
# CMD ["sh", "-c", "alembic upgrade head && python /code/sgv_auto/main.py"]
