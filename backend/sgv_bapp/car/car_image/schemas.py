from pydantic import BaseModel, Field

from uuid import UUID

from sgv_bapp.base import BaseFilter


class CarImageBase(BaseModel):
    image_url: str
    image_uuid: UUID
    car_id: int
    is_main: bool


class CarImageUpdate(CarImageBase):
    image_url: str | None = None
    image_uuid: UUID | None = None
    car_id: int | None = None
    is_main: bool | None = None


class CarImageCreate(CarImageBase):
    ...


class CarImageSchema(CarImageBase):
    id: int

    class Config:
        from_attributes = True


class CarImageFilter(BaseFilter):
    # car_id: int | None = Field(None)
    is_main: bool | None = Field(None)
    limit: int = Field(100, gt=0, le=100)
    offset: int = Field(0, ge=0)
