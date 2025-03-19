from pydantic import BaseModel, Field

from sgv_bapp.base import BaseFilter
from datetime import datetime


class ReviewBase(BaseModel):
    author: str
    rating: int
    text: str
    source: str
    source_url: str
    image_url: str

    created_at: datetime


class ReviewUpdate(ReviewBase):
    author: str | None = None
    rating: int | None = None
    text: str | None = None
    source: str | None = None
    source_url: str | None = None
    image_url: str | None = None

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
