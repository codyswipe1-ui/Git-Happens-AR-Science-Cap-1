from sqlalchemy import String, Text, Boolean, Integer
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class Lesson(Base):
    __tablename__ = "lessons"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True
    )

    title: Mapped[str] = mapped_column(
        String(200), nullable=False
    )

    subject: Mapped[str] = mapped_column(
        String(100), nullable=False
    )

    grade_level: Mapped[int] = mapped_column(
        Integer, nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text, nullable=False
    )

    content: Mapped[str] = mapped_column(
        Text, nullable=False
    )

    model_url: Mapped[str | None] = mapped_column(
        String(500), nullable=True
    )

    is_published: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    ) 