import uuid

from sqladmin import ModelView
from wtforms.fields import FileField

from sgv_bapp.car.car_image.s3_storage import get_s3_storage

from sgv_bapp.admin.model import User
from sgv_bapp.car.model import Car
from sgv_bapp.car.car_image.model import CarImage


class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.name]

    can_delete = False
    name = 'Пользователь'
    name_plural = 'Пользователи'
    icon = "fa-solid fa-user"

    column_sortable_list = [User.id]

    form_create_rules = ['name']
    form_edit_rules = ['name']


class CarAdmin(ModelView, model=Car):
    column_list = [Car.id,
                   Car.name,
                   Car.price,
                   Car.updated_at,
                   Car.created_at,
                   Car.year]

    name = 'Авто'
    name_plural = 'Авто'
    icon = "fa-solid fa-user"

    column_sortable_list = [Car.id, Car.updated_at,
                            Car.created_at,
                            Car.year]


class CarImageAdmin(ModelView, model=CarImage):

    async def on_model_change(self, data, model, is_created, request):
        # Perform some other action
        s3_file_name = f"{data['car']}/{data['image_uuid']}"
        binary_image = await data['image_url'].read()
        s3_storage = await get_s3_storage()

        # Загружаем в MinIO
        image_url = await s3_storage.upload_file(s3_file_name, binary_image)
        data['image_url'] = image_url

    async def on_model_delete(self, model, request):
        s3_file_name = f'{model.car_id}/{model.image_uuid}'
        s3_storage = await get_s3_storage()
        await s3_storage.delete_file(s3_file_name)

    column_list = [CarImage.id,
                   CarImage.car_id,
                   CarImage.image_uuid,
                   CarImage.image_url
                   ] + [CarImage.car]

    name = 'Фото авто'
    name_plural = 'Фото авто'
    icon = "fa-solid fa-user"
    form_include_pk = True
    form_overrides = dict(image_url=FileField)

    form_columns = [CarImage.car, CarImage.image_url, CarImage.image_uuid, CarImage.is_main]
    form_edit_rules = ['is_main']

    form_widget_args = {
        "image_uuid": {"value": uuid.uuid4()}
    }

    column_sortable_list = [CarImage.id,
                            CarImage.car_id,
                            CarImage.is_main,
                            CarImage.image_uuid,
                            CarImage.image_url
                            ]
