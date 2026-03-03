# backend/sgv_bapp/user/repository.py

__all__ = ['get_repository', 'UserRepository']

from fastapi import Depends
from pydantic import EmailStr
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from sgv_bapp.base import BaseRepository
from sgv_bapp.user.model import User
from sgv_bapp.database import get_async_session


class UserRepository(BaseRepository[User]):

    def __init__(self, session: AsyncSession):
        super().__init__(User, session)

    async def get_by_username(self, username: str) -> User | None:
        stmt = select(User).where(User.username == username)
        res = await self.session.execute(stmt)
        return res.scalar_one_or_none()

    async def get_by_email(self, email: EmailStr) -> User | None:
        stmt = select(User).where(User.email == email)
        res = await self.session.execute(stmt)
        return res.scalar_one_or_none()


async def get_repository(session: AsyncSession = Depends(get_async_session)) -> UserRepository:
    return UserRepository(session)
