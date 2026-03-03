# backend/stream_app/auth/security.py
import base64
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import HTTPException, status
from pwdlib import PasswordHash

from sgv_bapp.database import session_manager
from sgv_bapp.config import get_settings
from sgv_bapp.user.repository import UserRepository, get_repository

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

password_hash = PasswordHash.recommended()


def verify_password(plain_password, hashed_password) -> bool:
    return password_hash.verify(plain_password, hashed_password)


def jwt_encode(payload: dict) -> str:
    try:
        jwt_token = jwt.encode(
            payload,
            get_settings().auth.PRIVATE_KEY,
            algorithm=get_settings().auth.JWT_ALGORITHM,
            headers={"kid": "main-key"}
        )
    except Exception as er:
        print(er)
        raise credentials_exception
    return jwt_token


def jwt_decode(token: str) -> dict:
    try:
        payload = jwt.decode(
            token,
            get_settings().auth.PUBLIC_KEY,
            algorithms=[get_settings().auth.JWT_ALGORITHM],
        )
    except Exception as er:
        print(er)
        raise credentials_exception
    return payload


def create_access_token(data: dict) -> str:
    payload = data | {
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(
            seconds=get_settings().auth.ACCESS_TOKEN_EXPIRE_SECONDS
        )
    }
    return jwt_encode(payload)


async def authenticate_user(
        username: str,
        password: str
):
    async with session_manager.session() as session:
        repository: UserRepository = await get_repository(session)
        user = await repository.get_by_username(username)
        if not (user and verify_password(password, user.hashed_password)):
            return None
        return user


async def get_current_user_admin(
        access_token: str,
):
    async with session_manager.session() as session:
        repo: UserRepository = await get_repository(session)
        try:
            payload = jwt_decode(token=access_token)
            if payload.get("type") != "access":
                raise credentials_exception
            user_id = int(payload["sub"])
        except Exception:
            raise credentials_exception

        user = await repo.get_by_id(user_id)
        if not user:
            raise credentials_exception

        return user


def get_password_hash(password) -> str:
    return password_hash.hash(password)

#
# print(get_password_hash(''))
