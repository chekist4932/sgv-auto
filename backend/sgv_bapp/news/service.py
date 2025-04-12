__all__ = ['GetNewsService', 'NewsService']

from fastapi import Depends

from sgv_bapp.base import BaseService
from sgv_bapp.news.model import News
from sgv_bapp.news.schemas import NewsCreate, NewsUpdate, NewsSchema, NewsFilter
from sgv_bapp.news.repository import NewsRepository, get_repository


class NewsService(BaseService[News, NewsCreate, NewsUpdate, NewsSchema, NewsFilter]):
    def __init__(self,
                 repository: NewsRepository
                 ):
        super().__init__(repository)


class GetNewsService:
    """Get CategoryService object with entity schema we needed"""

    def __call__(self,
                 repository: NewsRepository = Depends(get_repository)
                 ) -> NewsService:
        return NewsService(repository)
