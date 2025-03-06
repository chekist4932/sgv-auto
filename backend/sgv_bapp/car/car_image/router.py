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

car_image_router = APIRouter(prefix='/car/{car_id}/image', tags=['image'])


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
                           s3_storage: S3Storage = Depends(get_s3_storage),
                           mapper: CarImageMapper = Depends(GetCarImageMapper(CarImageSchema)),
                           service: CarImageService = Depends(GetCarImageService())
                           ) -> CarImageSchema:
    # Сгенерировать uuid4 для фото
    image_uuid = str(uuid.uuid4())

    # Загрузить фото в MinIO
    binary_image = await car_image.read()
    image_url = await s3_storage.upload_file(image_uuid, binary_image)

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
    await s3_storage.delete_file(image_uuid)

    return await service.delete(car_id)
