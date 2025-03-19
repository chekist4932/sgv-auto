__all__ = ['GetReviewService', 'ReviewService']

from fastapi import Depends

from sgv_bapp.base import BaseService
from sgv_bapp.review.model import Review
from sgv_bapp.review.schemas import ReviewCreate, ReviewUpdate, ReviewSchema, ReviewFilter
from sgv_bapp.review.repository import ReviewRepository, get_repository


class ReviewService(BaseService[Review, ReviewCreate, ReviewUpdate, ReviewSchema, ReviewFilter]):
    def __init__(self,
                 repository: ReviewRepository
                 ):
        super().__init__(repository)


class GetReviewService:
    """Get CategoryService object with entity schema we needed"""

    def __call__(self,
                 repository: ReviewRepository = Depends(get_repository)
                 ) -> ReviewService:
        return ReviewService(repository)
