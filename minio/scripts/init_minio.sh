#!/bin/sh
set -e

echo "🚀 Запуск MinIO"

minio server /data --console-address ":${S3_CONSOLE_PORT}" & 


echo "⏳ Ожидание запуска MinIO"
until mc alias set local http://localhost:${S3_PORT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} > /dev/null 2>&1; do
    echo "Ожидание запуска MinIO"
    sleep 1
done

MINIO_PID=$!

echo "🔑 Настройка MinIO CLI (mc)"
mc alias set local http://localhost:${S3_PORT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}


echo "📦 Проверка существование бакета ${MINIO_DEFAULT_BUCKETS}"
if ! mc ls local/${MINIO_DEFAULT_BUCKETS} > /dev/null 2>&1; then

    mkdir -p /data/${MINIO_DEFAULT_BUCKETS}
    mc anonymous set download local/${MINIO_DEFAULT_BUCKETS}
else
    echo "✅ Бакет ${MINIO_DEFAULT_BUCKETS} уже создан"
fi

echo "✅ Настройка MinIO завершена!"
wait $MINIO_PID