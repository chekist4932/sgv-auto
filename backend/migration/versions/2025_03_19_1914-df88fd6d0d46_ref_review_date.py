"""ref_review_date

Revision ID: df88fd6d0d46
Revises: 712f0f63062b
Create Date: 2025-03-19 19:14:42.235505

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'df88fd6d0d46'
down_revision: Union[str, None] = '712f0f63062b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('review', sa.Column('created_at', sa.DateTime(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('review', 'created_at')
    # ### end Alembic commands ###
