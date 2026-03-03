import uuid

from wtforms.fields import FileField
from wtforms.validators import Optional
from markupsafe import Markup

from sgv_bapp.base.s3_storage import get_s3_storage
from sgv_bapp.base.view import PageView

from sgv_bapp.news.model import News


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
            f'<img src="{m.image_url}" style="max-height: 100px; max-width: 100px;">') if m.image_url else "-",
        "title": lambda m, a: Markup(
            f'{m.title[:20]} ...'),
        "source_url": lambda m, a: Markup(
            f'{m.source_url[:20]} ...'),
        "news_uuid": lambda m, a: Markup(
            f'{str(m.news_uuid)[:20]} ...'),
    }

    column_list = [
        News.id,
        News.title,
        News.category,
        News.source_url,
        News.created_at,
        News.image_url,
    ]
    column_sortable_list = column_list

    name = 'Новость'
    name_plural = 'Новости'

    form_overrides = dict(upload_image=FileField)
    form_widget_args = {
        "news_uuid": {"value": uuid.uuid4()}
    }

    form_edit_rules = [col.name for col in News.__table__.c if col.name not in
                       ['id', 'news_uuid', 'created_at', 'news_uuid']] + [
        "upload_image"]

    form_create_rules = [col.name for col in News.__table__.c if col.name not in
                         ['id', 'image_url', 'created_at']]

    column_labels = {
        News.id: "ID",
        News.news_uuid: "UUID новости",
        News.title: "Заголовок",
        News.excerpt: "Краткое описание",
        News.content: "Содержимое",
        News.category: "Категория",
        News.source_url: "Ссылка на источник",
        News.image_url: "Ссылка изображения",
        News.created_at: "Дата создания"
    }
