__all__ = ['get_condition_builder', 'CarConditionBuilder']

from sgv_bapp.base import ConditionBuilder
from sgv_bapp.car.model import Car


class CarConditionBuilder(ConditionBuilder[Car]):
    def __init__(self):
        super().__init__(Car)


condition_builder = CarConditionBuilder()


async def get_condition_builder():
    return condition_builder
