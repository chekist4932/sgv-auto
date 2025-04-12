import uuid

from sqladmin import ModelView
from wtforms.fields import FileField, StringField
from wtforms.validators import Optional
from markupsafe import Markup

from sgv_bapp.config import get_app_settings, get_minio_settings

from sgv_bapp.car.car_image.s3_storage import get_s3_storage

from sgv_bapp.admin.model import User
from sgv_bapp.car.model import Car
from sgv_bapp.car.car_image.model import CarImage
from sgv_bapp.review.model import Review
from sgv_bapp.news.model import News


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

    form_edit_rules = [col.name for col in Car.__table__.c if
                       col.name not in ['id', 'created_at', 'updated_at', 'acceleration']]
    form_create_rules = [col.name for col in Car.__table__.c if
                         col.name not in ['id', 'created_at', 'updated_at', 'acceleration']]


class CarImageAdmin(PageView, model=CarImage):

    async def scaffold_form(self, *args, **kwargs):
        form_class = await super().scaffold_form(*args, **kwargs)
        form_class.upload_image = FileField(validators=[Optional()])

        return form_class

    async def on_model_change(self, data, model, is_created, request):
        self.form_widget_args = {"image_uuid": {"value": uuid.uuid4()}}

        # Perform some other action
        if is_created:
            s3_file_name = f"car/{data['car']}/{data['image_uuid']}"
            binary_image = await data[
                'upload_image'].read()  # В админке был изменен тип поля для записи image_url. В бд - строка, в форме - изображение

            s3_storage = await get_s3_storage()

            # Загружаем в MinIO
            image_url = await s3_storage.upload_file(s3_file_name, binary_image)
            image_url = image_url.replace(get_minio_settings().endpoint_url, get_app_settings().DOMAIN_NAME)
            data['image_url'] = image_url
        else:
            if str(model.image_uuid) not in data['image_url']:
                raise ValueError('Uuid in url different with image_uuid attribute')

            binary_image = await data['upload_image'].read()
            if binary_image:
                s3_file_name = f"car/{model.car_id}/{model.image_uuid}"
                s3_storage = await get_s3_storage()
                # Загружаем в MinIO
                await s3_storage.upload_file(s3_file_name, binary_image)

    async def on_model_delete(self, model, request):
        s3_file_name = f'car/{model.car_id}/{model.image_uuid}'
        s3_storage = await get_s3_storage()
        await s3_storage.delete_file(s3_file_name)

    column_list = [CarImage.id,
                   CarImage.car_id,
                   CarImage.is_main,
                   CarImage.image_uuid,
                   CarImage.image_url
                   ] + [CarImage.car]

    name = 'Фото авто'
    name_plural = 'Фото авто'

    form_include_pk = True
    form_overrides = dict(upload_image=FileField)
    form_widget_args = {
        "image_uuid": {"value": uuid.uuid4()}
    }

    form_columns = [CarImage.car, CarImage.image_url, CarImage.image_uuid, CarImage.is_main]

    form_create_rules = [col.name for col in CarImage.__table__.c if col.name
                         not in ['id', 'image_url']] + ['car', 'upload_image']
    form_edit_rules = [col.name for col in CarImage.__table__.c if col.name
                       not in ['id', 'car_id', 'image_uuid']] + ["upload_image"]

    column_formatters = {
        "image_url": lambda m, a: Markup(
            f'<img src="{m.image_url}" style="max-height: 100px;">') if m.image_url else "-"
    }

    column_sortable_list = [CarImage.id,
                            CarImage.car_id,
                            CarImage.is_main,
                            CarImage.image_uuid,
                            CarImage.image_url]


class ReviewAdmin(PageView, model=Review):

    async def scaffold_form(self, *args, **kwargs):
        form_class = await super().scaffold_form(*args, **kwargs)
        form_class.upload_image = FileField(validators=[Optional()])

        return form_class

    async def on_model_change(self, data, model, is_created, request):
        self.form_widget_args = {"review_uuid": {"value": uuid.uuid4()}}
        if is_created:
            s3_file_name = f"review/{data['review_uuid']}"
            binary_image = await data[
                'upload_image'].read()  # В админке был изменен тип поля для записи image_url. В бд - строка, в форме - изображение
            if binary_image:
                s3_storage = await get_s3_storage()

                # Загружаем в MinIO
                image_url = await s3_storage.upload_file(s3_file_name, binary_image)
                image_url = image_url.replace(get_minio_settings().endpoint_url, get_app_settings().DOMAIN_NAME)
                data['image_url'] = image_url
        else:
            if data['image_url'] and str(model.review_uuid) not in data['image_url']:
                raise ValueError('Uuid in url different with image_uuid attribute')

            binary_image = await data['upload_image'].read()
            if binary_image:
                s3_file_name = f"review/{model.review_uuid}"
                s3_storage = await get_s3_storage()
                # Загружаем в MinIO
                data['image_url'] = await s3_storage.upload_file(s3_file_name, binary_image)

    async def on_model_delete(self, model, request):
        s3_file_name = f'review/{model.review_uuid}'
        s3_storage = await get_s3_storage()
        await s3_storage.delete_file(s3_file_name)

    column_formatters = {
        "image_url": lambda m, a: Markup(
            f'<img src="{m.image_url}" style="max-height: 100px;">') if m.image_url else "-"
    }

    column_list = [col.name for col in Review.__table__.c]

    name = 'Отзыв'
    name_plural = 'Отзывы'

    form_overrides = dict(upload_image=FileField)
    form_widget_args = {
        "review_uuid": {"value": uuid.uuid4()}
    }
    column_sortable_list = [col.name for col in Review.__table__.c]

    form_edit_rules = [col.name for col in Review.__table__.c if col.name not in ['id', 'review_uuid']] + [
        "upload_image"]

    form_create_rules = [col.name for col in Review.__table__.c if col.name not in ['id', 'image_url']]


class NewsAdmin(PageView, model=News):

    async def scaffold_form(self, *args, **kwargs):
        form_class = await super().scaffold_form(*args, **kwargs)
        form_class.upload_image = FileField(validators=[Optional()])

        return form_class

    async def on_model_change(self, data, model, is_created, request):
        self.form_widget_args = {"news_uuid": {"value": uuid.uuid4()}}
        if is_created:
            s3_file_name = f"news/{data['news_uuid']}"
            binary_image = await data[
                'upload_image'].read()  # В админке был изменен тип поля для записи image_url. В бд - строка, в форме - изображение
            if binary_image:
                s3_storage = await get_s3_storage()

                # Загружаем в MinIO
                image_url = await s3_storage.upload_file(s3_file_name, binary_image)
                image_url = image_url.replace(get_minio_settings().endpoint_url, get_app_settings().DOMAIN_NAME)
                data['image_url'] = image_url
        else:
            if data['image_url'] and str(model.news_uuid) not in data['image_url']:
                raise ValueError('Uuid in url different with image_uuid attribute')

            binary_image = await data['upload_image'].read()
            if binary_image:
                s3_file_name = f"news/{model.news_uuid}"
                s3_storage = await get_s3_storage()
                # Загружаем в MinIO
                data['image_url'] = await s3_storage.upload_file(s3_file_name, binary_image)

    async def on_model_delete(self, model, request):
        s3_file_name = f'news/{model.news_uuid}'
        s3_storage = await get_s3_storage()
        await s3_storage.delete_file(s3_file_name)

    column_formatters = {
        "image_url": lambda m, a: Markup(
            f'<img src="{m.image_url}" style="max-height: 100px;">') if m.image_url else "-"
    }

    column_list = [col.name for col in News.__table__.c]
    column_sortable_list = [col.name for col in News.__table__.c]

    name = 'Новость'
    name_plural = 'Новости'

    form_overrides = dict(upload_image=FileField)
    form_widget_args = {
        "news_uuid": {"value": uuid.uuid4()}
    }

    form_edit_rules = [col.name for col in News.__table__.c if col.name not in ['id', 'news_uuid']] + [
        "upload_image"]

    form_create_rules = [col.name for col in News.__table__.c if col.name not in ['id', 'image_url']]
