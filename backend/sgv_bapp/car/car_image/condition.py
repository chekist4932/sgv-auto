__all__ = ['get_condition_builder', 'CarImageConditionBuilder']

from sgv_bapp.base import ConditionBuilder
from sgv_bapp.car.car_image.model import CarImage


class CarImageConditionBuilder(ConditionBuilder[CarImage]):
    def __init__(self):
        super().__init__(CarImage)


condition_builder = CarImageConditionBuilder()


async def get_condition_builder():
    return condition_builder
