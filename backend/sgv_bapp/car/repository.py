__all__ = ['get_repository', 'CarRepository']

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from sgv_bapp.base import BaseRepository
from sgv_bapp.car.model import Car
from sgv_bapp.database import get_async_session


class CarRepository(BaseRepository[Car]):

    def __init__(self, session: AsyncSession):
        super().__init__(Car, session)


async def get_repository(session: AsyncSession = Depends(get_async_session)) -> CarRepository:
    return CarRepository(session)
