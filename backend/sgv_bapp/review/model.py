from sqlalchemy import Column, Integer, DateTime, UniqueConstraint, String, Numeric, Text, func, CheckConstraint

from sgv_bapp.base import Base


class Review(Base):
    __tablename__ = 'review'

    __table_args__ = (
        CheckConstraint("rating > 0 AND rating < 6",
                        name="chk_rating"),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)
    author = Column(String, nullable=False)
    rating = Column(Integer, nullable=False)
    text = Column(Text, nullable=False)
    source = Column(String, nullable=False)
    source_url = Column(String, nullable=False)
    image_url = Column(String)

    created_at = Column(DateTime, nullable=False)
