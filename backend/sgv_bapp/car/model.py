from sqlalchemy import Column, Integer, DateTime, UniqueConstraint, String, Numeric, Text, func

from sgv_bapp.base import Base


class Car(Base):
    __tablename__ = 'car'
    __table_args__ = (UniqueConstraint('name', 'price', 'year', 'mileage', 'engine', 'transmission'),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    price = Column(Numeric(32, 2), nullable=False)
    year = Column(Integer, nullable=False)
    mileage = Column(String, nullable=False)
    engine = Column(String, nullable=False)
    transmission = Column(String, nullable=False)
    description = Column(Text, nullable=False)

    main_image = Column(String, nullable=True)

    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)
