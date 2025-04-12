__all__ = ['NewsMapper', 'GetNewsMapper']

from sgv_bapp.base import EntityMapper
from sgv_bapp.news.model import News
from sgv_bapp.news.schemas import NewsSchema


class NewsMapper(EntityMapper[News, NewsSchema]):
    def __init__(self, entity_schema):
        super().__init__(entity_schema)


class GetNewsMapper:
    def __init__(self, entity_schema):
        self.entity_schema = entity_schema

    def __call__(self):
        return NewsMapper(entity_schema=self.entity_schema)
