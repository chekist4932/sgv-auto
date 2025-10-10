from sqlalchemy import Column, Integer, DateTime, UniqueConstraint, String, Numeric, Text, func
from sqlalchemy.dialects.postgresql import ENUM as PgEnum
from sqlalchemy.orm import relationship

from sgv_bapp.base import Base

from enum import Enum as Enum


class CarStatus(Enum):
    on_order = "on_order"
    in_stock = "in_stock"
    in_transit = "in_transit"
    sold = 'sold'


class Car(Base):
    __tablename__ = 'car'
    __table_args__ = (UniqueConstraint('name', 'price', 'year', 'mileage', 'engine', 'transmission'),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    price = Column(Numeric(32, 2), nullable=False)
    year = Column(Integer, nullable=False)
    engine = Column(String, nullable=False)
    mileage = Column(String, nullable=False)
    transmission = Column(String, nullable=False)
    description = Column(Text, nullable=False)

    status = Column(PgEnum(CarStatus, name="car_status_enum", create_type=False), nullable=False,
                    default=CarStatus.in_stock)

    power = Column(Integer)
    drivetrain = Column(String)
    steering = Column(String)
    acceleration = Column(Numeric(precision=3, scale=1))

    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    car_image = relationship('CarImage', back_populates='car')

    def __str__(self):
        return f'Авто[{self.id}]: {self.name} / {self.year}'
