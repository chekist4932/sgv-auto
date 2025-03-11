from sqlalchemy import Column, Integer, String, DateTime, func

from sgv_bapp.base import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    name = Column(String)

    created_at = Column(DateTime, server_default=func.now(), nullable=False)
