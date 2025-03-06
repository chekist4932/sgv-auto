__all__ = ['GetCarService', 'CarService']

from fastapi import Depends

from sgv_bapp.base import BaseService
from sgv_bapp.car.model import Car
from sgv_bapp.car.schemas import CarCreate, CarUpdate, CarSchema, CarFilter
from sgv_bapp.car.repository import CarRepository, get_repository


class CarService(BaseService[Car, CarCreate, CarUpdate, CarSchema, CarFilter]):
    def __init__(self,
                 repository: CarRepository
                 ):
        super().__init__(repository)


class GetCarService:
    """Get CategoryService object with entity schema we needed"""

    def __call__(self,
                 repository: CarRepository = Depends(get_repository)
                 ) -> CarService:
        return CarService(repository)
