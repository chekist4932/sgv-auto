import uuid
from sqlalchemy import select

from wtforms.fields import MultipleFileField
from wtforms.validators import Optional

from sgv_bapp.database import session_manager
from sgv_bapp.car.car_image.model import CarImage
from sgv_bapp.car.model import Car

from sgv_bapp.base.s3_storage import get_s3_storage
from sgv_bapp.base.view import PageView


class CarAdmin(PageView, model=Car):

    async def scaffold_form(self, *args, **kwargs):
        form_class = await super().scaffold_form(*args, **kwargs)
        form_class.upload_image = MultipleFileField(
            "Загрузить фото",
            validators=[Optional()]
        )
        return form_class

    async def on_model_change(self, data, model, is_created, request):

        files = data.get("upload_image")
        valid_files = [
            file for file in files
            if file.filename and file.filename.strip() and file.size > 0
        ]
        if not valid_files:
            return

        s3_storage = await get_s3_storage()
        async with session_manager.session() as session:
            result = await session.execute(
                select(CarImage).where(
                    CarImage.car_id == model.id,
                    CarImage.is_main == True
                )
            )
            existing_main = result.scalar_one_or_none()
            for index, file in enumerate(files):
                image_uuid = uuid.uuid4()
                binary_image = await file.read()

                s3_file_name = f"car/{model.id}/{image_uuid}"

                image_url = await s3_storage.upload_file(
                    s3_file_name,
                    binary_image
                )

                new_image = CarImage(
                    car_id=model.id,
                    image_uuid=image_uuid,
                    image_url=image_url,
                    is_main=False if existing_main else (index == 0)
                )

                session.add(new_image)
            await session.commit()

    async def on_model_delete(self, model, request):

        s3_storage = await get_s3_storage()
        async with session_manager.session() as session:
            result = await session.execute(
                select(CarImage).where(CarImage.car_id == model.id)
            )
            images = result.scalars().all()

        if images:
            for image in images:
                try:
                    s3_file_name = f"car/{model.id}/{image.image_uuid}"
                    await s3_storage.delete_file(s3_file_name)
                    print(f"Удален файл из S3: {s3_file_name}")
                except Exception as e:
                    print(f"Ошибка при удалении файла из S3: {e}")

    name = 'Авто'
    name_plural = 'Авто'

    column_list = [Car.id,
                   Car.name,
                   Car.power,
                   Car.year,
                   Car.price,
                   Car.status,
                   Car.updated_at,
                   Car.created_at,
                   Car.car_image]

    column_sortable_list = [col for col in column_list if col is not Car.car_image]

    form_edit_rules = [col.name for col in Car.__table__.c if
                       col.name not in ['id', 'created_at', 'updated_at', 'acceleration']] + ['upload_image']
    form_create_rules = form_edit_rules

    column_labels = {
        Car.id: "ID",
        Car.name: "Название",
        Car.price: "Цена",
        Car.year: "Год",
        Car.engine: "Двигатель",
        Car.mileage: "Пробег",
        Car.transmission: "Коробка передач",
        Car.description: "Описание",
        Car.status: "Статус",
        Car.power: "Мощность",
        Car.drivetrain: "Привод",
        Car.steering: "Руль",
        Car.acceleration: "Разгон 0–100",
        Car.created_at: "Создано",
        Car.updated_at: "Обновлено",
    }
