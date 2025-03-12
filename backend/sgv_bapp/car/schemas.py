from pydantic import BaseModel, Field
from datetime import datetime

from sgv_bapp.base import BaseFilter, ConditionsInt


class CarBase(BaseModel):
    name: str
    price: float
    year: int
    mileage: str
    engine: str
    transmission: str
    description: str


class CarUpdate(CarBase):
    name: str | None = None
    price: float | None = None
    year: int | None = None
    mileage: str | None = None
    engine: str | None = None
    transmission: str | None = None
    description: str | None = None


class CarCreate(CarBase):
    ...


class CarSchema(CarBase):
    id: int

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True


class CarFilter(BaseFilter):
    name: str | None = Field(None)
    mileage: str | None = Field(None)
    engine: str | None = Field(None)
    transmission: str | None = Field(None)
    # year: ConditionsInt
    limit: int = Field(100, gt=0, le=100)
    offset: int = Field(0, ge=0)

# class ExpenseItem(BaseModel):
#     id: int
#     name: str
#     price: float
#     year: int
#     mileage: str
#     engine: str
#     transmission: str
#     description: str
#     main_image: str
#     create_at: datetime
#     update_at: datetime
