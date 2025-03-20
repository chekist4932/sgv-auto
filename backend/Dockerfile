FROM python:3.12-slim

WORKDIR /code


RUN apt-get update && apt-get install -y \
    gcc \
    libjpeg62-turbo-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*  # Очистка кеша apt

RUN pip install Pillow

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code

EXPOSE 8000

CMD ["sh", "-c", "alembic upgrade head && uvicorn sgv_bapp.main:app --host 0.0.0.0 --port 8000 --reload --proxy-headers"]
