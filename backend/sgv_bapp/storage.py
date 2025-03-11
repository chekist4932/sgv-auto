from typing import Optional, AsyncIterator
from contextlib import asynccontextmanager

import aioboto3
from botocore.exceptions import BotoCoreError, NoCredentialsError, ClientError

ERROR_MSG = "MinIOSessionManager is not initialized"


class MinIOSessionManager:
    def __init__(self) -> None:
        self.session: Optional[aioboto3.Session] = None
        self.client_params: Optional[dict] = None
        self.bucket_name = None

    async def init(self, client_settings, region_name: str = "us-east-1") -> None:
        """Инициализация с параметрами MinIO."""
        self.session = aioboto3.Session()
        self.client_params = {
            "endpoint_url": client_settings.ENDPOINT,
            "aws_access_key_id": client_settings.ACCESS_KEY,
            "aws_secret_access_key": client_settings.SECRET_KEY,
            "region_name": region_name,
        }
        self.bucket_name = client_settings.BUCKET_NAME

        await self._check_bucket_exist()

    @asynccontextmanager
    async def client(self) -> AsyncIterator:
        """Создает асинхронного клиента для работы с MinIO."""
        if self.session is None or self.client_params is None:
            raise RuntimeError(ERROR_MSG)

        async with self.session.client("s3", **self.client_params) as client:
            try:
                yield client
            except (BotoCoreError, NoCredentialsError) as e:
                raise RuntimeError(f"MinIO client error: {e}")

    async def _check_bucket_exist(self):
        async with self.client() as client:
            try:
                await client.head_bucket(Bucket=self.bucket_name)
            except ClientError as e:
                print(e)  # Logging in future


minio_manager = MinIOSessionManager()


async def get_s3_manager():
    return minio_manager

# Экземпляр менеджера
#
#
# client_settings = get_minio_settings()
#
# region_name: str = "us-east-1"
#
# client_params = {
#     "endpoint_url": client_settings.ENDPOINT,
#     "aws_access_key_id": client_settings.ACCESS_KEY,
#     "aws_secret_access_key": client_settings.SECRET_KEY,
#     "region_name": region_name,
# }
#
#
# async def main():
#     session = aioboto3.Session()
#
#     async with session.resource("s3", **client_params) as client:
#         bucket = await client.Bucket('car-image')  # <----------------
#         print(bucket)
#
#
# async def as_test():
#     session = aioboto3.Session()
#
#     # async with session.client("s3") as s3:
#
#     async with session.client("s3", **client_params) as s3_client:
#         try:
#             response = await s3_client.generate_presigned_url('get_object',
#                                                               Params={'Bucket': 'car-image',
#                                                                       'Key': 'Screenshot_1.png'},
#                                                               ExpiresIn=3600)
#
#             print(response)
#         except ClientError as e:
#             print(e)
#
#
# def test():
#     s3_client = boto3.client("s3", **client_params)
#     try:
#         response = s3_client.generate_presigned_url('get_object',
#                                                     Params={'Bucket': 'car-image',
#                                                             'Key': 'Screenshot_1.png'},
#                                                     ExpiresIn=3600)
#
#         print(response)
#     except ClientError as e:
#         print(e)


# loop = asyncio.get_event_loop()
# loop.run_until_complete(as_test())


#
# minio_manager.init(get_minio_settings())
#
#
# async def tt():
#     async with minio_manager.client() as s3_client:
#         try:
#             response = await s3_client.generate_presigned_url('get_object',
#                                                               Params={'Bucket': 'car-image',
#                                                                       'Key': 'Screenshot_1.png'},
#                                                               ExpiresIn=3600)
#
#             print(response)
#         except ClientError as e:
#             print(e)


# loop = asyncio.get_event_loop()
# loop.run_until_complete(tt())


# async def tt_to():
#     async with minio_manager.client() as client:
#         try:
#             response = await client.generate_presigned_url('get_object',
#                                                                            Params={'Bucket': 'car-image',
#                                                                                    'Key': 'Screenshot_1.png'},
#                                                                            ExpiresIn=3600)
#
#             print(response)
#         except ClientError as e:
#             print(e)
#
#
# loop = asyncio.get_event_loop()
# loop.run_until_complete(tt_to())

# test()

# cl =  minio_manager.client()
# bucket = cl.Bucket('mybucket')
# print(bucket)

# async def get_async_client() -> AsyncGenerator:
#     async with minio_manager.client() as client:
#         yield client
