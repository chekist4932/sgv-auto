from functools import lru_cache

from typing import Optional
from pathlib import Path

from pydantic import PostgresDsn, field_validator, ValidationInfo, IPvAnyAddress, ValidationError, Field
from pydantic_settings import BaseSettings
from pydantic_core import MultiHostUrl

BASE_DIR: Path = Path(__file__).resolve().parent.parent


class BaseConfig(BaseSettings):
    class Config:
        env_file = BASE_DIR.parent / ".env"
        case_sensitive = True
        env_file_encoding = "utf-8"
        extra = 'ignore'


class BotSettings(BaseConfig):
    token: str = Field(alias="TOKEN")
    chat_id: int = Field(alias="CHAT_ID")


class MinioSettings(BaseConfig):
    bucket_name: str = Field(alias="S3_BUCKET_NAME")
    endpoint_url: str = Field(alias="S3_ENDPOINT")
    region_name: str = Field(alias="S3_REGION_NAME")
    aws_access_key_id: str = Field(alias="S3_ACCESS_KEY")
    aws_secret_access_key: str = Field(alias="S3_SECRET_KEY")


# noinspection PyNestedDecorators
class AppSettings(BaseConfig):
    APP_NAME: str = Field(alias="APP_NAME")
    host: str = Field(alias="APP_IP")
    port: int = Field(alias="APP_PORT")
    app: str = Field(alias="APP_PATH")
    reload: bool = Field(alias="RELOAD")
    proxy_headers: bool = Field(alias="PROXY_HEADERS")

    @field_validator('host', mode='before')
    @classmethod
    def assemble_ip(cls, field_value: Optional[str], values: ValidationInfo) -> str:
        if field_value == 'localhost':
            return field_value
        return str(IPvAnyAddress(field_value))

    @field_validator('port', mode='after')
    @classmethod
    def assemble_port(cls, field_value: Optional[int], values: ValidationInfo) -> int:
        assert field_value < pow(2, 16)  # 65536
        return field_value


# noinspection PyNestedDecorators
class DatabaseSettings(BaseConfig):
    DB_HOST: str
    DB_PORT: int
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str

    DATABASE_URI: Optional[PostgresDsn] = None

    @field_validator('DATABASE_URI', mode='before')
    @classmethod
    def assemble_db_url(cls, field_value: Optional[PostgresDsn], values: ValidationInfo) -> PostgresDsn:
        if isinstance(field_value, MultiHostUrl):
            return field_value

        return PostgresDsn.build(
            scheme="postgresql+asyncpg",
            username=values.data.get('POSTGRES_USER'),
            password=values.data.get('POSTGRES_PASSWORD'),
            host=values.data.get('DB_HOST'),
            port=values.data.get('DB_PORT'),
            path=f"{values.data.get('POSTGRES_DB')}",
        )


@lru_cache
def get_db_settings() -> DatabaseSettings:
    return DatabaseSettings()


@lru_cache
def get_app_settings() -> AppSettings:
    return AppSettings()


@lru_cache
def get_minio_settings() -> MinioSettings:
    return MinioSettings()


@lru_cache
def get_bot_settings() -> BotSettings:
    return BotSettings()
