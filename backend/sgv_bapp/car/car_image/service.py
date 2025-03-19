__all__ = ['GetCarImageService', 'CarImageService']

from typing import override

from fastapi import Depends

from sgv_bapp.base import BaseService
from sgv_bapp.car.car_image.model import CarImage
from sgv_bapp.car.car_image.condition import CarImageConditionBuilder
from sgv_bapp.car.car_image.mapper import CarImageMapper

from sgv_bapp.car.car_image.schemas import (
    CarImageSchema,
    CarImageCreate,
    CarImageUpdate,
    CarImageFilter
)

from sgv_bapp.car.car_image.repository import CarImageRepository, get_repository


class CarImageService(BaseService[CarImage, CarImageCreate, CarImageUpdate, CarImageSchema, CarImageFilter]):
    def __init__(self,
                 repository: CarImageRepository
                 ):
        super().__init__(repository)

    async def get_by_car(self,
                         car_id: int,
                         condition_builder: CarImageConditionBuilder,
                         mapper: CarImageMapper,
                         filters: CarImageFilter | None = None,
                         limit: int = 100,
                         offset: int = 0
                         ):
        conditions = await condition_builder.build_condition(filters) if filters else []
        conditions += [CarImage.car_id == car_id]
        result_objs = await self.repository.get_all(conditions, limit, offset)
        return mapper.to_schemas(result_objs)


class GetCarImageService:
    """Get CategoryService object with entity schema we needed"""

    def __call__(self,
                 repository: CarImageRepository = Depends(get_repository)
                 ) -> CarImageService:
        return CarImageService(repository)
