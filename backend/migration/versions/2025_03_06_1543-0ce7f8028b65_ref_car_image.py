"""ref_car_image

Revision ID: 0ce7f8028b65
Revises: 91f431aae0e0
Create Date: 2025-03-06 15:43:25.563026

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0ce7f8028b65'
down_revision: Union[str, None] = '91f431aae0e0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('car_image', sa.Column('uid', sa.Uuid(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('car_image', 'uid')
    # ### end Alembic commands ###
