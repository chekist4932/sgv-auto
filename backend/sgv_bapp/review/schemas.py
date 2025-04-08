from pydantic import BaseModel, Field

from uuid import UUID

from sgv_bapp.base import BaseFilter
from datetime import datetime


class ReviewBase(BaseModel):
    author: str
    rating: int
    source: str
    source_url: str

    text: str | None = None
    image_url: str | None = None

    review_uuid: UUID

    created_at: datetime


class ReviewUpdate(ReviewBase):
    author: str | None = None
    rating: int | None = None
    source: str | None = None
    source_url: str | None = None

    review_uuid: UUID | None = None

    created_at: datetime | None = None


class ReviewCreate(ReviewBase):
    ...


class ReviewSchema(ReviewBase):
    id: int

    class Config:
        from_attributes = True


class ReviewFilter(BaseFilter):
    rating: int | None = Field(None)

    limit: int = Field(100, gt=0, le=100)
    offset: int = Field(0, ge=0)
