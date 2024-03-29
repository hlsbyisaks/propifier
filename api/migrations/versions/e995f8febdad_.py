"""empty message

Revision ID: e995f8febdad
Revises: 
Create Date: 2021-07-20 08:36:36.835901

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e995f8febdad'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('horse', 'startsumma',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('horse', 'häst',
               existing_type=sa.VARCHAR(length=50),
               nullable=True)
    op.alter_column('horse', 'startpoäng',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('horse', 'ålder',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('horse', 'kön',
               existing_type=sa.VARCHAR(length=1),
               nullable=True)
    op.alter_column('horse', 'tränare',
               existing_type=sa.VARCHAR(length=50),
               nullable=True)
    op.alter_column('horse', 'tränarkön',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('horse', 'tjänat_innev_år',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('horse', 'proffs_amatör',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('model1', 'startsum_low',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('model1', 'startsum_high',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('model1', 'age_low',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('model1', 'age_high',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('model1', 'distance',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('model1', 'starttype',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('model1', 'gender',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('model1', 'addition',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('model1', 'applicants',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('model1', 'first_price',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('model1', 'good_prop',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('model1', 'good_prop',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('model1', 'first_price',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('model1', 'applicants',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('model1', 'addition',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('model1', 'gender',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('model1', 'starttype',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('model1', 'distance',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('model1', 'age_high',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('model1', 'age_low',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('model1', 'startsum_high',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('model1', 'startsum_low',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('horse', 'proffs_amatör',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('horse', 'tjänat_innev_år',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('horse', 'tränarkön',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('horse', 'tränare',
               existing_type=sa.VARCHAR(length=50),
               nullable=False)
    op.alter_column('horse', 'kön',
               existing_type=sa.VARCHAR(length=1),
               nullable=False)
    op.alter_column('horse', 'ålder',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('horse', 'startpoäng',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('horse', 'häst',
               existing_type=sa.VARCHAR(length=50),
               nullable=False)
    op.alter_column('horse', 'startsumma',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
