__all__ = ['CarMapper', 'GetCarMapper']

from sgv_bapp.base import EntityMapper
from sgv_bapp.car.model import Car
from sgv_bapp.car.schemas import CarSchema


class CarMapper(EntityMapper[Car, CarSchema]):
    def __init__(self, entity_schema):
        super().__init__(entity_schema)


class GetCarMapper:
    def __init__(self, entity_schema):
        self.entity_schema = entity_schema

    def __call__(self):
        return CarMapper(entity_schema=self.entity_schema)
