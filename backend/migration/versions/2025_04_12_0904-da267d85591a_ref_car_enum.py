"""ref_car_enum

Revision ID: da267d85591a
Revises: daf4dbb13150
Create Date: 2025-04-12 09:04:48.471381

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'da267d85591a'
down_revision: Union[str, None] = 'daf4dbb13150'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TYPE car_status_enum ADD VALUE IF NOT EXISTS 'sold'")


def downgrade() -> None:
    # 1. Переименовать старый enum
    op.execute("ALTER TYPE car_status_enum RENAME TO car_status_enum_old")

    # 2. Создать новый enum без 'sold'
    op.execute("CREATE TYPE car_status_enum AS ENUM ('on_order', 'in_stock', 'in_transit')")

    # 3. Привести колонку к text
    op.execute("ALTER TABLE car ALTER COLUMN car_status TYPE text")

    # 4. Привести колонку к новому enum
    op.execute("ALTER TABLE car ALTER COLUMN car_status TYPE car_status_enum USING car_status::car_status_enum")

    # 5. Удалить старый enum
    op.execute("DROP TYPE car_status_enum_old")
