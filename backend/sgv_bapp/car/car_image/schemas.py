from pydantic import BaseModel

from uuid import UUID

from sgv_bapp.base import BaseFilter, ConditionsInt


class CarImageBase(BaseModel):
    image_url: str
    image_uuid: UUID
    car_id: int


class CarImageUpdate(CarImageBase):
    image_url: str | None = None
    image_uuid: UUID | None = None
    car_id: int | None = None


class CarImageCreate(CarImageBase):
    ...


class CarImageSchema(CarImageBase):
    id: int

    class Config:
        from_attributes = True


class CarImageFilter(BaseFilter):
    car_id: int | None = None
