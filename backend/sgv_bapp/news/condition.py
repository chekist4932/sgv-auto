__all__ = ['get_condition_builder', 'NewsConditionBuilder']

from sgv_bapp.base import ConditionBuilder
from sgv_bapp.news.model import News


class NewsConditionBuilder(ConditionBuilder[News]):
    def __init__(self):
        super().__init__(News)


condition_builder = NewsConditionBuilder()


async def get_condition_builder():
    return condition_builder
