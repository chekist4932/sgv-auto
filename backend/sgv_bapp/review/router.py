from typing import Annotated

from fastapi import APIRouter, Depends, Query

from sgv_bapp.review.service import ReviewService, GetReviewService
from sgv_bapp.review.mapper import ReviewMapper, GetReviewMapper
from sgv_bapp.review.condition import ReviewConditionBuilder, get_condition_builder

from sgv_bapp.review.schemas import (
    ReviewSchema,
    ReviewCreate,
    ReviewUpdate,
    ReviewFilter
)

from sgv_bapp.base import PaginatedResponse

review_router = APIRouter(prefix='/review', tags=['review'])


@review_router.get('/', response_model=PaginatedResponse[ReviewSchema])
async def get_review_all(filters: Annotated[ReviewFilter, Query()] = None,
                         service: ReviewService = Depends(GetReviewService()),
                         mapper: ReviewMapper = Depends(GetReviewMapper(ReviewSchema)),
                         condition_builder: ReviewConditionBuilder = Depends(get_condition_builder)
                         ) -> PaginatedResponse[ReviewSchema]:
    return await service.get_all(condition_builder, mapper, filters, filters.limit, filters.offset)


@review_router.get('/{review_id}', response_model=ReviewSchema)
async def get_review_by_id(
        review_id: int,
        mapper: ReviewMapper = Depends(GetReviewMapper(ReviewSchema)),
        service: ReviewService = Depends(GetReviewService())
) -> ReviewSchema:
    return await service.get_by_id(review_id, mapper)
