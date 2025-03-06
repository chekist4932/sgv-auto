from typing import Optional

from fastapi import Depends

from sgv_bapp.storage import get_s3_manager, MinIOSessionManager


class S3Storage:
    def __init__(self, minio_manager: MinIOSessionManager):
        self.minio_manager = minio_manager
        self.bucket_name = minio_manager.bucket_name

    async def upload_file(self, file_name: str, file_data: bytes, content_type: str = "image/jpeg") -> Optional[str]:
        """Загрузка файла в S3 и возврат его URL."""
        async with self.minio_manager.client() as client:
            await client.put_object(
                Bucket=self.bucket_name,
                Key=file_name,
                Body=file_data,
                ContentType=content_type
            )
        return f"{self.minio_manager.client_params['endpoint_url']}/{self.bucket_name}/{file_name}"

    async def delete_file(self, file_name: str) -> None:
        """Удаление файла из S3."""
        async with self.minio_manager.client() as client:
            await client.delete_object(Bucket=self.bucket_name, Key=file_name)

    async def generate_presigned_url(self, file_name: str, expires_in: int = 3600) -> Optional[str]:
        """Генерация временной ссылки на скачивание файла."""
        async with self.minio_manager.client() as client:
            url = await client.generate_presigned_url(
                "get_object",
                Params={"Bucket": self.bucket_name, "Key": file_name},
                ExpiresIn=expires_in
            )
        return url


async def get_s3_storage(manager: MinIOSessionManager = Depends(get_s3_manager)):
    return S3Storage(manager)
