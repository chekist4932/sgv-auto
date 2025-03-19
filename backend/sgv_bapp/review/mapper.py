__all__ = ['ReviewMapper', 'GetReviewMapper']

from sgv_bapp.base import EntityMapper
from sgv_bapp.review.model import Review
from sgv_bapp.review.schemas import ReviewSchema


class ReviewMapper(EntityMapper[Review, ReviewSchema]):
    def __init__(self, entity_schema):
        super().__init__(entity_schema)


class GetReviewMapper:
    def __init__(self, entity_schema):
        self.entity_schema = entity_schema

    def __call__(self):
        return ReviewMapper(entity_schema=self.entity_schema)
