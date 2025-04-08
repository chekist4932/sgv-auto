from sqlalchemy import Column, Integer, DateTime, UniqueConstraint, String, Numeric, Text, func, CheckConstraint, Uuid

from typing import ClassVar, Optional
from fastapi import UploadFile

from sgv_bapp.base import Base


class Review(Base):
    __tablename__ = 'review'
    __allow_unmapped__ = True

    __table_args__ = (
        CheckConstraint("rating > 0 AND rating < 6",
                        name="chk_rating"),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)
    author = Column(String, nullable=False)
    rating = Column(Integer, nullable=False)
    source = Column(String, nullable=False)
    source_url = Column(String, nullable=False)

    text = Column(Text, nullable=False)
    image_url = Column(String)

    review_uuid = Column(Uuid, nullable=False)

    created_at = Column(DateTime, nullable=False)

    upload_image: ClassVar[Optional[UploadFile]] = None

    def __str__(self):
        return f'ID отзыва: {self.id}'
