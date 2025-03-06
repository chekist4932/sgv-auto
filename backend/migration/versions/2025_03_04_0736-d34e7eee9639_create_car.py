"""Create car

Revision ID: d34e7eee9639
Revises: d9aa6a20657f
Create Date: 2025-03-04 07:36:05.466029

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd34e7eee9639'
down_revision: Union[str, None] = 'd9aa6a20657f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('car',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('price', sa.Numeric(precision=32, scale=2), nullable=False),
    sa.Column('year', sa.Integer(), nullable=False),
    sa.Column('mileage', sa.String(), nullable=False),
    sa.Column('engine', sa.String(), nullable=False),
    sa.Column('transmission', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('main_image', sa.String(length=2083), nullable=False),
    sa.Column('create_at', sa.DateTime(), nullable=True),
    sa.Column('update_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name', 'price', 'year', 'mileage', 'engine', 'transmission')
    )
    op.create_table('car_image',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('image_url', sa.String(length=2083), nullable=False),
    sa.Column('car_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['car_id'], ['car.id'], ondelete='RESTRICT'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('car_image')
    op.drop_table('car')
    # ### end Alembic commands ###
