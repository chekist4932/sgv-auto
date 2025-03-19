__all__ = ['get_repository', 'ReviewRepository']

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from sgv_bapp.base import BaseRepository
from sgv_bapp.review.model import Review
from sgv_bapp.database import get_async_session


class ReviewRepository(BaseRepository[Review]):

    def __init__(self, session: AsyncSession):
        super().__init__(Review, session)


async def get_repository(session: AsyncSession = Depends(get_async_session)) -> ReviewRepository:
    return ReviewRepository(session)
