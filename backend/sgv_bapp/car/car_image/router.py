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

car_image_router = APIRouter(tags=['image'],
                             prefix='/{car_id}/image')


@car_image_router.get('/', response_model=PaginatedResponse[CarImageSchema])
async def get_car_image_all(car_id: int,
                            filters: Annotated[CarImageFilter, Query()] = None,
                            service: CarImageService = Depends(GetCarImageService()),
                            mapper: CarImageMapper = Depends(GetCarImageMapper(CarImageSchema)),
                            condition_builder: CarImageConditionBuilder = Depends(get_condition_builder)
                            ) -> PaginatedResponse[CarImageSchema]:
    return await service.get_by_car(car_id,
                                    condition_builder,
                                    mapper,
                                    filters,
                                    filters.limit,
                                    filters.offset)


# @car_image_router.get('/{image_id}', response_model=CarImageSchema)
# async def get_car_image_by_id(
#         car_id: int,
#         image_id: int,
#         mapper: CarImageMapper = Depends(GetCarImageMapper(CarImageSchema)),
#         service: CarImageService = Depends(GetCarImageService())
# ) -> CarImageSchema:
#     return await service.get_by_id(image_id, mapper)
#
# @car_image_router.post('/', response_model=CarImageSchema)
# async def create_car_image(car_id: int,
#                            car_image: UploadFile,
#                            image_uuid=str(uuid.uuid4()),
#                            s3_storage: S3Storage = Depends(get_s3_storage),
#                            mapper: CarImageMapper = Depends(GetCarImageMapper(CarImageSchema)),
#                            service: CarImageService = Depends(GetCarImageService())
#                            ) -> CarImageSchema:
#     # Загрузить фото в MinIO
#     binary_image = await car_image.read()
#     s3_file_name = f'{car_id}/{image_uuid}'
#     image_url = await s3_storage.upload_file(s3_file_name, binary_image)
#
#     # Сделать запись в бд
#     car_image_data = CarImageCreate(car_id=car_id,
#                                     image_uuid=image_uuid,
#                                     image_url=image_url)
#     return await service.create(car_image_data, mapper)
#
#
# @car_image_router.delete('/{car_id}/image/{image_uuid}', status_code=204)
# async def delete_car(car_id: int,
#                      image_uuid: str,
#                      s3_storage: S3Storage = Depends(get_s3_storage),
#                      service: CarImageService = Depends(GetCarImageService())
#                      ) -> None:
#     # удалить из MinIO
#     s3_file_name = f'{car_id}/{image_uuid}'
#
#     await s3_storage.delete_file(s3_file_name)
#
#     return await service.delete(car_id)
