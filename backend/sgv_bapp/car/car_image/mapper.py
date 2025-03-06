__all__ = ['CarImageMapper', 'GetCarImageMapper']

from sgv_bapp.base import EntityMapper
from sgv_bapp.car.car_image.model import CarImage
from sgv_bapp.car.car_image.schemas import CarImageSchema


class CarImageMapper(EntityMapper[CarImage, CarImageSchema]):
    def __init__(self, entity_schema):
        super().__init__(entity_schema)


class GetCarImageMapper:
    def __init__(self, entity_schema):
        self.entity_schema = entity_schema

    def __call__(self):
        return CarImageMapper(entity_schema=self.entity_schema)
