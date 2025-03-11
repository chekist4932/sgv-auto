import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, Query, UploadFile

from sgv_bapp.car.car_image.mapper import CarImageMapper, GetCarImageMapper
from sgv_bapp.car.car_image.condition import get_condition_builder, CarImageConditionBuilder
from sgv_bapp.car.car_image.service import CarImageService, GetCarImageService

from sgv_bapp.car.car_image.s3_storage import get_s3_storage, S3Storage

from sgv_bapp.car.car_image.schemas import (
    CarImageSchema,
    CarImageCreate,
    CarImageUpdate,
    CarImageFilter
)

from sgv_bapp.base import PaginatedResponse

car_image_router = APIRouter(prefix='/{car_id}/image', tags=['image'])


@car_image_router.get('/{image_id}', response_model=CarImageSchema)
async def get_car_image_by_id(
        image_id: int,
        mapper: CarImageMapper = Depends(GetCarImageMapper(CarImageSchema)),
        service: CarImageService = Depends(GetCarImageService())
) -> CarImageSchema:
    return await service.get_by_id(image_id, mapper)


@car_image_router.get('/', response_model=PaginatedResponse[CarImageSchema])
async def get_car_image_all(filters: Annotated[CarImageFilter, Query()] = None,
                            service: CarImageService = Depends(GetCarImageService()),
                            mapper: CarImageMapper = Depends(GetCarImageMapper(CarImageSchema)),
                            condition_builder: CarImageConditionBuilder = Depends(get_condition_builder),
                            limit: int = Query(100, ge=0),
                            offset: int = Query(0, ge=0)
                            ) -> PaginatedResponse[CarImageSchema]:
    return await service.get_all(condition_builder, mapper, filters, limit, offset)


@car_image_router.post('/', response_model=CarImageSchema)
async def create_car_image(car_id: int,
                           car_image: UploadFile,
                           image_uuid=str(uuid.uuid4()),
                           s3_storage: S3Storage = Depends(get_s3_storage),
                           mapper: CarImageMapper = Depends(GetCarImageMapper(CarImageSchema)),
                           service: CarImageService = Depends(GetCarImageService())
                           ) -> CarImageSchema:
    # Загрузить фото в MinIO
    binary_image = await car_image.read()
    s3_file_name = f'{car_id}/{image_uuid}'
    image_url = await s3_storage.upload_file(s3_file_name, binary_image)

    # Сделать запись в бд
    car_image_data = CarImageCreate(car_id=car_id,
                                    image_uuid=image_uuid,
                                    image_url=image_url)
    return await service.create(car_image_data, mapper)


@car_image_router.delete('/{image_uuid}', status_code=204)
async def delete_car(car_id: int,
                     image_uuid: str,
                     s3_storage: S3Storage = Depends(get_s3_storage),
                     service: CarImageService = Depends(GetCarImageService())
                     ) -> None:
    # удалить из MinIO
    s3_file_name = f'{car_id}/{image_uuid}'

    await s3_storage.delete_file(s3_file_name)

    return await service.delete(car_id)

# import uuid
# import asyncio
#
# from uvicorn import Config, Server
# from fastapi import FastAPI, UploadFile
#
# from fastapi_storages import S3Storage
#
# app = FastAPI()
#
#
# class PublicAssetS3Storage(S3Storage):
#     AWS_ACCESS_KEY_ID = "minioadmin"
#     AWS_SECRET_ACCESS_KEY = "minioadmin"
#     AWS_S3_BUCKET_NAME = "car-image"
#     AWS_S3_ENDPOINT_URL = "localhost:9000"
#     AWS_S3_USE_SSL = False
#
#
# storage = PublicAssetS3Storage(
# )
#
#
# @app.post("/upload/")
# async def create_upload_file(file: UploadFile,
#                              image_uuid=str(uuid.uuid4())
#                              ):
#     contents = file.file.read()
#     file.file.seek(0)
#     storage.write(file.file, image_uuid)
#
#
# async def run_app():
#     config = Config(
#         app="sgv_bapp.car.car_image.router:app",
#         host='localhost',
#         port=11000,
#         reload=True,
#         proxy_headers=True,
#     )
#     server = Server(config)
#     await server.serve()
#
#
# if __name__ == "__main__":
#     asyncio.run(run_app())
