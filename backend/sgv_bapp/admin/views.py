import uuid

from sqladmin import ModelView
from wtforms.fields import FileField

from sgv_bapp.config import get_app_settings, get_minio_settings

from sgv_bapp.car.car_image.s3_storage import get_s3_storage

from sgv_bapp.admin.model import User
from sgv_bapp.car.model import Car
from sgv_bapp.review.model import Review
from sgv_bapp.car.car_image.model import CarImage


class PageView(ModelView):
    icon = "fa-solid fa-user"
    page_size = 100
    page_size_options = [25, 50, 100, 200]
    


class UserAdmin(PageView, model=User):
    column_list = [User.id, User.name]

    can_delete = False
    name = 'Пользователь'
    name_plural = 'Пользователи'

    column_sortable_list = [User.id]

    form_create_rules = ['name']
    form_edit_rules = ['name']


class CarAdmin(PageView, model=Car):
    column_list = [Car.id,
                   Car.name,
                   Car.price,
                   Car.year,
                   Car.updated_at,
                   Car.created_at]

    name = 'Авто'
    name_plural = 'Авто'

    column_sortable_list = [Car.id, Car.updated_at,
                            Car.created_at,
                            Car.year]

    form_edit_rules = [col.name for col in Car.__table__.c if col.name not in ['id', 'created_at', 'updated_at']]
    form_create_rules = [col.name for col in Car.__table__.c if col.name not in ['id', 'created_at', 'updated_at']]


class CarImageAdmin(PageView, model=CarImage):

    async def on_model_change(self, data, model, is_created, request):
        self.form_widget_args = {"image_uuid": {"value": uuid.uuid4()}}
        
        # Perform some other action
        if is_created:
            s3_file_name = f"{data['car']}/{data['image_uuid']}"
            binary_image = await data['image_url'].read() # В админке был изменен тип поля для записи image_url. В бд - строка, в форме - изображение
            s3_storage = await get_s3_storage()

            # Загружаем в MinIO
            image_url = await s3_storage.upload_file(s3_file_name, binary_image)
            image_url = image_url.replace(get_minio_settings().endpoint_url, get_app_settings().DOMAIN_NAME)
            data['image_url'] = image_url
        else:
            model.is_main = data['is_main']

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
                            CarImage.image_url]


class ReviewAdmin(PageView, model=Review):
    column_list = [col.name for col in Review.__table__.c]

    name = 'Отзыв'
    name_plural = 'Отзывы'

    column_sortable_list = [col.name for col in Review.__table__.c]

    form_edit_rules = [col.name for col in Review.__table__.c if col.name not in ['id']]
    form_create_rules = [col.name for col in Review.__table__.c if col.name not in ['id']]
