"""car_img_qniq

Revision ID: 9f2a0e50a87d
Revises: 65f8784b506d
Create Date: 2025-03-09 18:29:51.581518

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9f2a0e50a87d'
down_revision: Union[str, None] = '65f8784b506d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'car_image', ['image_uuid', 'image_url', 'car_id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'car_image', type_='unique')
    # ### end Alembic commands ###
