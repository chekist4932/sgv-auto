from sqlalchemy import Column, Integer, DateTime, String, Text, Uuid

from typing import ClassVar, Optional
from fastapi import UploadFile

from sgv_bapp.base import Base


class News(Base):
    __tablename__ = 'news'
    __allow_unmapped__ = True

    id = Column(Integer, primary_key=True, autoincrement=True)
    news_uuid = Column(Uuid, nullable=False)

    title = Column(String, nullable=False)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    source_url = Column(String)

    image_url = Column(String)
    created_at = Column(DateTime, nullable=False)

    upload_image: ClassVar[Optional[UploadFile]] = None

    def __str__(self):
        return f'Новость[{self.id}]: {self.title}'
