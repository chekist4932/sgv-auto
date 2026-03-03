import uuid

from wtforms.fields import FileField
from wtforms.validators import Optional
from markupsafe import Markup

from sgv_bapp.base.s3_storage import get_s3_storage
from sgv_bapp.base.view import PageView

from sgv_bapp.car.car_image.model import CarImage



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
            data['image_url'] = image_url
        else:
            print(f'Замена изображения S3: {model.image_uuid} | Авто: {model.car_id}')
            if str(model.image_uuid) not in data['image_url']:
                raise ValueError('Uuid in url different with image_uuid attribute')

            binary_image = await data['upload_image'].read()
            if binary_image:
                s3_file_name = f"car/{model.car_id}/{model.image_uuid}"
                s3_storage = await get_s3_storage()
                # Загружаем в MinIO
                res = await s3_storage.upload_file(s3_file_name, binary_image)

    async def on_model_delete(self, model, request):
        s3_file_name = f'car/{model.car_id}/{model.image_uuid}'
        s3_storage = await get_s3_storage()
        await s3_storage.delete_file(s3_file_name)

    name = 'Фото авто'
    name_plural = 'Фото авто'

    form_include_pk = True
    form_overrides = dict(upload_image=FileField)
    form_widget_args = {
        "image_uuid": {"value": uuid.uuid4()}
    }

    column_list = [
        CarImage.id,
        CarImage.car_id,
        CarImage.car,
        CarImage.image_uuid,
        CarImage.is_main,
        CarImage.created_at,
        CarImage.image_url,
    ]

    column_sortable_list = [col for col in column_list if col is not CarImage.car]

    form_columns = [CarImage.car, CarImage.image_url, CarImage.image_uuid, CarImage.is_main]

    form_create_rules = [col.name for col in CarImage.__table__.c if col.name
                         not in ['id', 'image_url', 'created_at']] + ['car', 'upload_image']
    form_edit_rules = [col.name for col in CarImage.__table__.c if col.name
                       not in ['id', 'car_id', 'image_uuid', 'created_at']] + ["upload_image"]

    column_formatters = {
        "image_uuid": lambda m, a: Markup(
            f'{str(m.image_uuid)[:10]} ...'),
        "image_url": lambda m, a: Markup(
            f'<img src="{m.image_url}" style="max-height: 100px; max-width: 100px;">') if m.image_url else "-"
    }

    column_labels = {
        CarImage.id: "ID",
        CarImage.image_uuid: "UUID изображения",
        CarImage.image_url: "Ссылка на изображение",
        CarImage.car_id: "ID автомобиля",
        CarImage.is_main: "Главное фото",
        CarImage.created_at: "Дата загрузки",
    }
