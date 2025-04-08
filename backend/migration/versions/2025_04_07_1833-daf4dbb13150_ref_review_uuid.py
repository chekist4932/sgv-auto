"""ref_review_uuid

Revision ID: daf4dbb13150
Revises: 50f3ac077bf0
Create Date: 2025-04-07 18:33:28.014946

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'daf4dbb13150'
down_revision: Union[str, None] = '50f3ac077bf0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('review', sa.Column('review_uuid', sa.Uuid(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('review', 'review_uuid')
    # ### end Alembic commands ###
