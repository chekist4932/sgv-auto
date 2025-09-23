from sqlalchemy import Column, Integer, String, ForeignKey, Uuid, UniqueConstraint, Boolean, Index, func, DateTime
from sqlalchemy.orm import relationship

from typing import ClassVar, Optional
from fastapi import UploadFile

from sgv_bapp.base import Base


class CarImage(Base):
    __tablename__ = "car_image"
    __allow_unmapped__ = True

    id = Column(Integer, primary_key=True, autoincrement=True)

    image_uuid = Column(Uuid, nullable=False)
    image_url = Column(String(2083), nullable=False)
    car_id = Column(Integer, ForeignKey("car.id", ondelete="RESTRICT"), nullable=False)

    is_main = Column(Boolean, default=False)

    car = relationship('Car', back_populates='car_image')

    __table_args__ = (
        UniqueConstraint("image_uuid", "car_id", name="uq_image_uuid_car"),
        Index("idx_unique_main_image_per_car", "car_id", unique=True, postgresql_where=is_main.is_(True))
    )

    upload_image: ClassVar[Optional[UploadFile]] = None

    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    def __str__(self):
        return f'ID Фото авто: {self.id}'
