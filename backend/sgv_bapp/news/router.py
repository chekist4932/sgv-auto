from typing import Annotated

from fastapi import APIRouter, Depends, Query

from sgv_bapp.news.service import NewsService, GetNewsService
from sgv_bapp.news.mapper import NewsMapper, GetNewsMapper
from sgv_bapp.news.condition import NewsConditionBuilder, get_condition_builder

from sgv_bapp.news.schemas import (
    NewsSchema,
    NewsCreate,
    NewsUpdate,
    NewsFilter
)

from sgv_bapp.base import PaginatedResponse

news_router = APIRouter(prefix='/news', tags=['news'])


@news_router.get('/', response_model=PaginatedResponse[NewsSchema])
async def get_news_all(filters: Annotated[NewsFilter, Query()] = None,
                       service: NewsService = Depends(GetNewsService()),
                       mapper: NewsMapper = Depends(GetNewsMapper(NewsSchema)),
                       condition_builder: NewsConditionBuilder = Depends(get_condition_builder)
                       ) -> PaginatedResponse[NewsSchema]:
    return await service.get_all(condition_builder, mapper, filters, filters.limit, filters.offset)


@news_router.get('/{news_id}', response_model=NewsSchema)
async def get_news_by_id(
        news_id: int,
        mapper: NewsMapper = Depends(GetNewsMapper(NewsSchema)),
        service: NewsService = Depends(GetNewsService())
) -> NewsSchema:
    return await service.get_by_id(news_id, mapper)
