from uuid import UUID

from pydantic import BaseModel, Field
from datetime import datetime

from sgv_bapp.base import BaseFilter


class NewsBase(BaseModel):
    title: str
    excerpt: str
    content: str
    category: str
    source_url: str | None = None
    image_url: str | None = None

    news_uuid: UUID


class NewsUpdate(NewsBase):
    title: str | None = None
    excerpt: str | None = None
    content: str | None = None
    category: str | None = None
    source_url: str | None = None
    image_url: str | None = None
    news_uuid: UUID | None = None


class NewsCreate(NewsBase):
    ...


class NewsSchema(NewsBase):
    id: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True


class NewsFilter(BaseFilter):
    title: str | None = Field(None)

    limit: int = Field(100, gt=0, le=100)
    offset: int = Field(0, ge=0)
