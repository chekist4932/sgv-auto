from sqlalchemy import Column, Integer, String, DateTime, func, Boolean

from sgv_bapp.base import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False)

    hashed_password: str = Column(String(length=1024), nullable=False)

    is_superuser: bool = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __str__(self):
        return f'{'Администратор' if self.is_superuser else 'Пользователь'}: {self.username}'
