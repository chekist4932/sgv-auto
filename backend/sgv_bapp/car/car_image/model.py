from sqlalchemy import Column, Integer, String, ForeignKey, Uuid

from sgv_bapp.base import Base


class CarImage(Base):
    __tablename__ = "car_image"

    id = Column(Integer, primary_key=True, autoincrement=True)

    image_uuid = Column(Uuid, nullable=False)
    image_url = Column(String(2083), nullable=False)
    car_id = Column(Integer, ForeignKey("car.id", ondelete="RESTRICT"), nullable=False)
