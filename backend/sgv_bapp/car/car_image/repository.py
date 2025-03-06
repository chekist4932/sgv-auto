__all__ = ['get_repository', 'CarImageRepository']

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from sgv_bapp.base import BaseRepository
from sgv_bapp.database import get_async_session

from sgv_bapp.car.car_image.model import CarImage


class CarImageRepository(BaseRepository[CarImage]):

    def __init__(self, session: AsyncSession):
        super().__init__(CarImage, session)


async def get_repository(session: AsyncSession = Depends(get_async_session)) -> CarImageRepository:
    return CarImageRepository(session)
