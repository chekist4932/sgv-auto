__all__ = ['get_condition_builder', 'ReviewConditionBuilder']

from sgv_bapp.base import ConditionBuilder
from sgv_bapp.review.model import Review


class ReviewConditionBuilder(ConditionBuilder[Review]):
    def __init__(self):
        super().__init__(Review)


condition_builder = ReviewConditionBuilder()


async def get_condition_builder():
    return condition_builder
