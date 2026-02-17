FROM python:3.12-slim@sha256:a866731a6b71c4a194a845d86e06568725e430ed21821d0c52e4efb385cf6c6f

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
