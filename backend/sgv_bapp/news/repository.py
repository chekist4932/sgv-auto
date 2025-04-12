__all__ = ['get_repository', 'NewsRepository']

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from sgv_bapp.base import BaseRepository
from sgv_bapp.news.model import News
from sgv_bapp.database import get_async_session


class NewsRepository(BaseRepository[News]):

    def __init__(self, session: AsyncSession):
        super().__init__(News, session)


async def get_repository(session: AsyncSession = Depends(get_async_session)) -> NewsRepository:
    return NewsRepository(session)
