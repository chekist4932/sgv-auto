"""ref_car_image_uuid

Revision ID: b7811aeef387
Revises: dddc9f7907a1
Create Date: 2025-03-06 22:20:11.892691

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b7811aeef387'
down_revision: Union[str, None] = 'dddc9f7907a1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('car_image', sa.Column('image_uuid', sa.Uuid(), nullable=False))
    op.drop_column('car_image', 'uid')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('car_image', sa.Column('uid', sa.UUID(), autoincrement=False, nullable=False))
    op.drop_column('car_image', 'image_uuid')
    # ### end Alembic commands ###
