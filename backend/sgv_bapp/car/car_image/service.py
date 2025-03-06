__all__ = ['GetCarImageService', 'CarImageService']

from fastapi import Depends

from sgv_bapp.base import BaseService
from sgv_bapp.car.car_image.model import CarImage

from sgv_bapp.car.car_image.schemas import (
    CarImageSchema,
    CarImageCreate,
    CarImageUpdate
)

from sgv_bapp.car.car_image.repository import CarImageRepository, get_repository


class CarImageService(BaseService[CarImage, CarImageCreate, CarImageUpdate, CarImageSchema, None]):
    def __init__(self,
                 repository: CarImageRepository
                 ):
        super().__init__(repository)


class GetCarImageService:
    """Get CategoryService object with entity schema we needed"""

    def __call__(self,
                 repository: CarImageRepository = Depends(get_repository)
                 ) -> CarImageService:
        return CarImageService(repository)
