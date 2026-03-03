import uuid

from wtforms.fields import FileField
from wtforms.validators import Optional
from markupsafe import Markup

from sgv_bapp.base.s3_storage import get_s3_storage
from sgv_bapp.base.view import PageView

from sgv_bapp.review.model import Review


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
            f'<img src="{m.image_url}" style="max-height: 100px; max-width: 100px;">') if m.image_url else "-",
        "text": lambda m, a: Markup(
            f'{m.text[:10]} ...'),
        "source_url": lambda m, a: Markup(
            f'{m.source_url[:20]} ...'),
        "review_uuid": lambda m, a: Markup(
            f'{str(m.review_uuid)[:20]} ...'),
    }

    name = 'Отзыв'
    name_plural = 'Отзывы'

    form_overrides = dict(upload_image=FileField)
    form_widget_args = {
        "review_uuid": {"value": uuid.uuid4()}
    }

    column_list = [
        Review.id,
        Review.rating,
        Review.author,
        Review.source,
        Review.text,
        Review.created_at,
        Review.image_url,
    ]

    column_sortable_list = column_list

    form_edit_rules = [col.name for col in Review.__table__.c if
                       col.name not in ['id', 'review_uuid', 'created_at']] + [
                          "upload_image"]

    form_create_rules = [col.name for col in Review.__table__.c if col.name not in
                         ['id', 'image_url', 'created_at']]

    column_labels = {
        Review.id: "ID",
        Review.review_uuid: "UUID отзыва",
        Review.author: "Автор",
        Review.rating: "Рейтинг",
        Review.source: "Источник",
        Review.source_url: "Ссылка на источник",
        Review.text: "Текст отзыва",
        Review.image_url: "Ссылка изображения",
        Review.created_at: "Дата создания",
    }
